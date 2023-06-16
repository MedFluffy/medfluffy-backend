from fastapi import FastAPI, UploadFile, File
from os import environ as env
import tensorflow_hub as hub
import tensorflow as tf
import numpy as np
import uvicorn
import os
from tensorflow.keras.utils import load_img, img_to_array
from PIL import Image
import shutil
import time
import json
from pathlib import Path
from tempfile import NamedTemporaryFile


os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

port = os.getenv("PORT")
if port is None:
  port = 8080

app = FastAPI()

t = time.time()
export_path = "saved_model_file".format(int(t))
model = tf.keras.models.load_model(
    export_path, custom_objects={"KerasLayer": hub.KerasLayer}
)

class_labels = ['healthy','nuklear']
# Fungsi untuk melakukan prediksi
def predict(img):
    image = img.resize((150, 150))  # Menyesuaikan ukuran gambar jika diperlukan
    image_array = np.array(image) / 255.0  # Mengonversi gambar menjadi array dan normalisasi
    image_array = np.expand_dims(image_array, axis=0)  # Menambahkan dimensi batch
    probabilities = model.predict(image_array)[0]
    class_idx = np.argmax(probabilities)

    return {class_labels[class_idx]: probabilities[class_idx]}

        
@app.get("/")
def index():
    return {"details":f"this is base url of {env['TITLE']}, ( {env['MY_VARIABLE']} page)"}

@app.post("/predict")
def prediction(file: UploadFile = File(...)):
    #specify destination location uploaded file (file path)
    img_loc = r"./images/" + file.filename
    #save uploaded file in specified path
    with open(img_loc, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    img_folder = "./images/"  # Ganti dengan path folder tempat gambar-gambar tersimpan
    class_labels = ['healthy', 'nuklear']

    for filename in os.listdir(img_folder):
        img_path = os.path.join(img_folder, filename)
        # Membaca gambar
        img = Image.open(img_path)
        # Melakukan prediksi
        prediction = predict(img)
        # Menampilkan hasil prediksi
        class_name = list(prediction.keys())[0]
        confidence = list(prediction.values())[0]
        print("Prediksi untuk %s: class: %s, confidence: %.2f%%" % (img_path, class_name, confidence * 100))
        
    if class_name == "nuklear":
        result = {
            "prediction": class_name,
            "accuration": str(round(confidence * 100,2))
        }
    elif class_name == "healthy":
        result = {
            "prediction": class_name,
            "accuration": str(round(confidence * 100,2))
        }
    else:
        result = {
            "prediction": "undefined",
            "accuration": str(round(confidence * 100,2))
        }
    return result
    
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=port, timeout_keep_alive=1200)