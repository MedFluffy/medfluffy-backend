from fastapi import FastAPI, UploadFile, File
from os import environ as env
from PIL import Image
import tensorflow_hub as hub
import tensorflow as tf
import numpy as np
import uvicorn, os, time, shutil

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

port = os.getenv("PORT")
if port is None:
  port = 8000

app = FastAPI()

t = time.time()
export_path = "saved_model_file".format(int(t))
model = tf.keras.models.load_model(
    export_path, custom_objects={"KerasLayer": hub.KerasLayer}
)

class_labels = ['healthy','nuklear']

def predict(img):
    image = img.resize((150, 150))  # Menyesuaikan ukuran gambar jika diperlukan
    image_array = np.array(image) / 255.0  # Mengonversi gambar menjadi array dan normalisasi
    image_array = np.expand_dims(image_array, axis=0)  # Menambahkan dimensi batch
    probabilities = model.predict(image_array)[0]
    class_idx = np.argmax(probabilities)
    return {class_labels[class_idx]: probabilities[class_idx]}

def getresult(img_folder):
    for filename in os.listdir(img_folder):
        img_path = os.path.join(img_folder, filename)
        img = Image.open(img_path) # Membaca gambar 
        prediction = predict(img) # Melakukan prediksi
        class_name = list(prediction.keys())[0] 
        confidence = list(prediction.values())[0]
        accuration =  str(round(confidence * 100,2))
        print("Prediksi untuk %s: class: %s, confidence: %s" % (img_path, class_name, accuration))
    if class_name == "nuklear":
        result = {
            "prediction": "Nuclear Sclerosis",
            "accuration": accuration,
            "description": "Nuclear Sclerosis merupakan penyakit mata yang umumnya menyerang anjing berusia di atas 7 tahun",
            "symptons": "Mata bewarna kebiruan serta kabur",
            "causes": "Lensa mata bertambah padat dan keras seiring dengan bertambahnya usia",
            "treatment": "Tidak pengobatan yang dibutuhkan selain operasi. Namun, penyakit ini dapat dicegah dengan makanan tanpa pearna yang bergizi",
            "more_info": "https://id.thepetlovejournal.com/nuclear-sclerosis-what-causes-eye-haziness-senior-dogs",
            "picture": "https://www.walkervillevet.com.au/wp-content/uploads/2018/05/canine-nuclear-sclerosis.jpg"
        }
    elif class_name == "healthy":
        result = {
            "prediction": "Hewan peliharaanmu sehat!",
            "accuration": accuration,
            "description": "Hewan peliharaan yang sehat merupakan idaman semua orang",
            "symptons": "Ceria dan suka membuat pemiliknya bahagia",
            "treatment": "Yuk tetap jaga kesehatannya",
            "more_info": "https://www.klikdokter.com/info-sehat/kesehatan-hewan/cara-merawat-anjing",
            "picture": "https://healthy-k9.com/wp-content/uploads/2016/01/0e7feb7664664823a7e07cd5bc2de4b6.jpg"
        }
    else:
        result = {
            "prediction": "Tidak terdeteksi penyakit apapun :(",
            "accuration": "undefined",
            "description": "undefined",
            "symptons": "undefined",
            "treatment": "undefined",
            "more_info": "undefined",
            "picture": "undefined"
        }
    return result
        
@app.get("/")
def index():
    response = {
                "status":"success",
                "error":False,
                "details":f"this is base url of {env['TITLE']} in {env['MY_VARIABLE']} page. Access the documentation by adding /docs on the base url."
                }
    return response

@app.post("/predict")
def prediction(file: UploadFile = File(...)):
    img_loc = r"./images/" + file.filename #specify destination location uploaded file (file path)
    #save uploaded file in specified path
    with open(img_loc, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    img_folder = "./images/" 
    result = getresult(img_folder)
    os.remove(img_loc)
    response = {"status":"success",
            "error":False,
            "result":result}
    return response

@app.get("/article")
def article():
    articleList = [
                    {
                        "title": "9 Cara Merawat Anjing agar Tetap Sehat dan Ceria",
                        "publisher": "klikdokter",
                        "description": "Ada beberapa cara merawat anjing yang benar agar kesehatan tubuh dan emosinya terjaga. Simak ulasan lengkapnya berikut ini",
                        "date": "27/11/2022",
                        "picture": "https://lakehouserecoverycenter.com/wp-content/uploads/2016/02/iStock_000010171709_Small-600x399.jpg",
                        "more_info": "https://www.klikdokter.com/info-sehat/kesehatan-hewan/cara-merawat-anjing"
                    },
                    {
                        "title": "Cara Tepat Menjaga Kesehatan Mata Anjing",
                        "publisher": "Halodoc",
                        "description": "Kesehatan mata anjing juga perlu dijaga, supaya hewan kesayangan kamu ini bisa melihat lingkungan di sekitarnya dengan jelas",
                        "date": "21/12/2020",
                        "picture": "https://d1bpj0tv6vfxyp.cloudfront.net/articles/429475_21-12-2020_10-53-45.webp",
                        "more_info": "https://www.halodoc.com/artikel/cara-tepat-menjaga-kesehatan-mata-anjing"
                    },
                    {
                        "title": "6 Masalah Mata yang Bisa Menyerang Anjing",
                        "publisher": "Halodoc",
                        "description": "Merawat anjing memang gampang-gampang susah. Biasanya, orang lebih berfokus untuk merawat bulunya saja, padahal bagian tubuh lainnya juga tidak boleh luput dari perhatian.",
                        "date": "26/11/2020",
                        "picture": "https://th.bing.com/th/id/OIP.BaKcBvsskWhFstMwnu0wYgHaF7?pid=ImgDet&rs=1",
                        "more_info": "https://www.halodoc.com/artikel/6-masalah-mata-yang-bisa-menyerang-anjing"
                    },
                    {
                        "title": "Daftar Makanan yang Tidak Boleh Dikonsumsi Anjing",
                        "publisher": "klikdokter",
                        "description": "Sebagai pemilik yang bertanggung jawab, yuk, ketahui apa saja makanan yang boleh dan tidak boleh dimakan oleh anjing pada ulasan berikut ini!",
                        "date": "03/12/2022",
                        "picture": "https://th.bing.com/th/id/OIP.Fo_fmO0cHZFgYvIVbGc5jQHaFC?pid=ImgDet&rs=1",
                        "more_info": "https://www.klikdokter.com/info-sehat/kesehatan-hewan/makanan-yang-tidak-boleh-dimakan-anjing"
                    },
                    {
                        "title": "12 Perilaku Anjing Ini Punya Arti Penting, Pertanda Masalah Kesehatan",
                        "publisher": "Liputan6",
                        "description": "Anjing merupakan hewan yang dikenal setia terhadap tuannya, dan selalu ingin menunjukkan perasaannya kepada sang majikan. Bahkan mereka akan menunjukkan rasa cinta dengan cara yang unik",
                        "date": "13/07/2022",
                        "picture": "https://cdn0-production-images-kly.akamaized.net/H0pYTzrsrFEXcaWMnMF8Wf2hFLI=/0x0:1920x1082/640x360/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/2831359/original/032308100_1560852876-pug-690566_1920.jpg",
                        "more_info": "https://www.liputan6.com/global/read/4304152/12-perilaku-anjing-ini-punya-arti-penting-pertanda-masalah-kesehatan"
                    },
                    {
                        "title": "10 Kondisi Anjing yang Harus Segera Dibawa ke Klinik",
                        "publisher": "Halodoc",
                        "description": "Saat memutuskan untuk memelihara anjing, kamu harus punya komitmen untuk merawat ia sebaik-baiknya. Bagi pemula yang baru memelihara anjing, mungkin masih belum banyak mengetahui informasi seputar perawatan anjing.",
                        "date": "22/09/2021",
                        "picture": "https://bestinau.com.au/wp-content/uploads/2019/07/Best-Dog-Care-Centers-in-Melbourne.jpg",
                        "more_info": "https://www.halodoc.com/artikel/10-kondisi-anjing-yang-harus-segera-dibawa-ke-klinik"
                    },
                    {
                        "title": "6 Cara Merawat Bulu Anjing agar Bersih dan Tak Mudah Rontok",
                        "publisher": "Kumparan",
                        "description": "Sebagai salah satu favorit para pecinta hewan, tentunya mengetahui cara merawat bulu anjing adalah hal yang perlu diperhatikan. Memperhatikan kebersihan bulu anjing merupakan salah satu aspek yang dapat menjaga kesehatannya.",
                        "date": "01/05/2023",
                        "picture": "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1634025439/01gza5zzvnv46f1gre9a0jpyk5.jpg",
                        "more_info": "https://kumparan.com/seputar-hobi/6-cara-merawat-bulu-anjing-agar-bersih-dan-tak-mudah-rontok-20Jfy4tGRPv/1"
                    },
                    {
                        "title": "Cara Terbaik untuk Memotong Kuku Kuku Anjing",
                        "publisher": "Wikihow",
                        "description": "Pemotongan kuku merupakan tugas penting yang menjaga agar kuku-kuku anjing tetap pendek dan sehat. Pemotongan kuku ini juga melindungi perabot dan lantai Anda dari kerusakan dan goresan!",
                        "date": "-",
                        "picture": "https://www.wikihow.com/images_en/thumb/1/12/Trim-a-Dog%27s-Nails-Step-1-Version-3.jpg/v4-460px-Trim-a-Dog%27s-Nails-Step-1-Version-3.jpg.webp",
                        "more_info": "https://id.wikihow.com/Memotong-Kuku-Kuku-Anjing"
                    },
                    {
                        "title": "Tips Memotong Kuku Anjing",
                        "publisher": "Purina",
                        "description": "Kuku yang tidak dipotong dapat patah, berdarah atau bahkan tumbuh ke dalam kaki, menyebabkan anjing kesayangan Anda tidak merasa nyaman. Kalau Anda sudah mendengar bunyi ‘klik-klik-klik’ saat anjing Anda berjalan di lantai keras",
                        "date": "-",
                        "picture": "https://www.purina.co.id/sites/default/files/2022-01/Desain%20tanpa%20judul%20-%202022-01-27T212047.162.png",
                        "more_info": "https://www.purina.co.id/artikel/anjing/kesehatan/sehari-hari/tips-memotong-kuku"
                    },
                    {
                        "title": "Kenali Gejala dan Penyebab Penyakit Kulit pada Anjing",
                        "publisher": "Royal Canin",
                        "description": "Anjing dapat menderita berbagai gangguan kulit, sehingga menyebabkan rasa sakit, gatal, dan peradangan. Pelajari tentang beberapa gejala umum serta cara untuk mendukung kesehatan rambut dan kulit anjing Anda.",
                        "date": "20/09/2018",
                        "picture": "https://cdn.royalcanin-weshare-online.io/yCJSPmYBaxEApS7LxAam/v1/ed38h-what-are-the-common-skin-conditions-in-dogs-hero-dog?w=1280&fm=jpg&auto=compress",
                        "more_info": "https://www.royalcanin.com/id/dogs/health-and-wellbeing/common-skin-conditions-in-dogs"
                    },
                     ]
    response = {"status":"success",
            "error":False,
            "article":articleList}
    return response

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=port, timeout_keep_alive=1200)