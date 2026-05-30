import easyocr
import cv2
import re

reader = easyocr.Reader(['en'])

def extract_number_plate(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Improve contrast
    gray = cv2.equalizeHist(gray)

    # Threshold
    _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)

    results = reader.readtext(thresh)

    plate_text = ""

    for (bbox, text, prob) in results:
        print("OCR Raw:", text, prob)

        # 🔥 LOWERED THRESHOLD (IMPORTANT FIX)
        if prob > 0.05:
            plate_text += text + " "

    # 🔥 CLEAN TEXT
    plate_text = re.sub(r'[^A-Z0-9]', '', plate_text.upper())

    return plate_text