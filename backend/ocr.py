import fitz
import easyocr
import tempfile
import os
from PIL import Image

reader = easyocr.Reader(["en"], gpu=False)


def extract_text(file):

    filename = file.filename.lower()

    if filename.endswith(".pdf"):

        return extract_pdf(file)

    return extract_image(file)


def extract_image(file):

    with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as temp:

        temp.write(file.file.read())

        path = temp.name

    result = reader.readtext(path, detail=0)

    os.remove(path)

    return "\n".join(result)


def extract_pdf(file):

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp:

        temp.write(file.file.read())

        pdf_path = temp.name

    document = fitz.open(pdf_path)

    text = ""

    for page in document:

        pix = page.get_pixmap()

        image_path = pdf_path + ".png"

        pix.save(image_path)

        result = reader.readtext(image_path, detail=0)

        text += "\n".join(result)

        os.remove(image_path)

    document.close()

    os.remove(pdf_path)

    return text