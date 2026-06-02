import cv2
from ultralytics import YOLO
from number_plate_ocr import extract_number_plate

# 🔥 LOAD MODELS
helmet_model = YOLO("Weights/best.pt")
plate_model = YOLO("Weights/license_plate_detector.pt")
helmet_classes = ['With Helmet', 'Without Helmet']


def detect_helmet_image(image_path):

    img = cv2.imread(image_path)

    if img is None:
        print("Error: Could not read image.")
        return {"result": "Error", "plate": ""}

    print("Running helmet detection...")

    helmet_results = helmet_model(
        img,
        verbose=False
    )

    no_helmet_count = 0
    plate_number = ""

    # HELMET DETECTION
    for r in helmet_results:

        for box in r.boxes:

            conf = float(box.conf[0])
            cls = int(box.cls[0])

            if conf < 0.6:
                continue

            label = helmet_classes[cls]

            print(
                f"Detected: {label} | Confidence: {conf:.2f}"
            )

            if label == "Without Helmet":
                no_helmet_count += 1

    print(
        "No Helmet Count:",
        no_helmet_count
    )

    # VIOLATION FOUND
    if no_helmet_count > 0:

        print(
            "Running number plate detection..."
        )

        plate_results = plate_model(
            img,
            conf=0.10,
            verbose=False
        )

        plate_found = False

        for r in plate_results:

            boxes = r.boxes

            if boxes is None:
                continue

            print(
                "Plate detections:",
                len(boxes)
            )

            for box in boxes:

                conf = float(box.conf[0])

                if conf < 0.10:
                    continue

                x1, y1, x2, y2 = map(
                    int,
                    box.xyxy[0]
                )

                # ADD PADDING AROUND PLATE
                pad = 20

                x1 = max(0, x1 - pad)
                y1 = max(0, y1 - pad)

                x2 = min(img.shape[1], x2 + pad)
                y2 = min(img.shape[0], y2 + pad)

                print(
                    f"Plate box: {x1},{y1},{x2},{y2}"
                )

                plate_crop = img[
                    y1:y2,
                    x1:x2
                ]

                if plate_crop.size == 0:
                    continue

                # SAVE CROP FOR DEBUGGING
                cv2.imwrite(
                    "detected_plate.jpg",
                    plate_crop
                )

                print(
                    "Running OCR on detected plate..."
                )

                plate_number = extract_number_plate(
                    plate_crop
                )

                print(
                    "Detected Plate:",
                    plate_number
                )

                if plate_number:
                    plate_found = True
                    break

            if plate_found:
                break

        # SMART FALLBACK
        if not plate_found:

            print(
                "Trying lower-center fallback region..."
            )

            h, w = img.shape[:2]

            x1 = int(w * 0.25)
            x2 = int(w * 0.75)

            y1 = int(h * 0.45)
            y2 = int(h * 0.95)

            fallback_crop = img[
                y1:y2,
                x1:x2
            ]

            cv2.imwrite(
                "fallback_plate.jpg",
                fallback_crop
            )

            plate_number = extract_number_plate(
                fallback_crop
            )

            print(
                "Fallback Plate:",
                plate_number
            )

        return {
            "result": "Without Helmet",
            "plate": plate_number
        }

    return {
        "result": "With Helmet",
        "plate": ""
    }