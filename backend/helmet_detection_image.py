import cv2
from ultralytics import YOLO
from number_plate_ocr import extract_number_plate

# 🔥 LOAD MODELS
helmet_model = YOLO("Weights/best.pt")
plate_model = YOLO("Weights/plate.pt")

helmet_classes = ['With Helmet', 'Without Helmet']


def detect_helmet_image(image_path):
    img = cv2.imread(image_path)

    if img is None:
        print("Error: Could not read image.")
        return {"result": "Error", "plate": ""}

    print("Running helmet detection...")

    # 🔥 TURN OFF YOLO DEFAULT PRINTS
    helmet_results = helmet_model(img, verbose=False)

    no_helmet_count = 0
    plate_number = ""

    # 🔥 ONLY CARE ABOUT "WITHOUT HELMET"
    for r in helmet_results:
        for box in r.boxes:
            conf = float(box.conf[0])
            cls = int(box.cls[0])

            if conf < 0.6:
                continue

            label = helmet_classes[cls]
            print(f"Detected: {label} | Confidence: {conf:.2f}")

            if label == "Without Helmet":
                no_helmet_count += 1

    print("No Helmet Count:", no_helmet_count)

    # 🔥 IF VIOLATION → DETECT PLATE
    if no_helmet_count > 0:
        print("Running number plate detection...")

        plate_results = plate_model(img, verbose=False)
        plate_found = False

        for r in plate_results:
            boxes = r.boxes

            if boxes is None:
                continue

            print("Plate detections:", len(boxes))

            for box in boxes:
                conf = float(box.conf[0])

                if conf < 0.4:
                    continue

                x1, y1, x2, y2 = map(int, box.xyxy[0])

                print(f"Plate box: {x1},{y1},{x2},{y2}")

                plate_crop = img[y1:y2, x1:x2]

                if plate_crop.size == 0:
                    continue

                print("Running OCR on detected plate...")

                plate_number = extract_number_plate(plate_crop)

                print("Detected Plate:", plate_number)

                if plate_number:
                    plate_found = True
                    break

            if plate_found:
                break

        # 🔥 FALLBACK IF MODEL FAILS
        if not plate_found:
            print("Fallback OCR on full image...")
            plate_number = extract_number_plate(img)

        return {
            "result": "Without Helmet",
            "plate": plate_number
        }

    # 🔥 NO VIOLATION
    else:
        return {
            "result": "With Helmet",
            "plate": ""
        }