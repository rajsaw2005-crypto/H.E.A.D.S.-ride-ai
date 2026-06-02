import easyocr
import cv2
import re

reader = easyocr.Reader(['en'], gpu=False)

def extract_number_plate(image):

    try:

        # Convert to grayscale
        gray = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2GRAY
        )

        # Enlarge image heavily
        gray = cv2.resize(
            gray,
            None,
            fx=10,
            fy=10,
            interpolation=cv2.INTER_CUBIC
        )

        # Simple threshold
        _, thresh = cv2.threshold(
            gray,
            120,
            255,
            cv2.THRESH_BINARY
        )

        # Save OCR debug image
        cv2.imwrite(
            "ocr_debug.jpg",
            thresh
        )

        # OCR
        results = reader.readtext(
            thresh,
            allowlist='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            min_size=5
        )

        plate_text = ""

        for (bbox, text, prob) in results:

            print(
                "OCR Raw:",
                text,
                prob
            )

            text = text.upper()

            text = re.sub(
                r'[^A-Z0-9]',
                '',
                text
            )

            if len(text) > 1:
                plate_text += text

        # Remove spaces/special chars
        plate_text = re.sub(
            r'[^A-Z0-9]',
            '',
            plate_text
        )

        print(
            "Final Plate:",
            plate_text
        )

        return plate_text

    except Exception as e:

        print(
            "OCR Error:",
            e
        )

        return ""