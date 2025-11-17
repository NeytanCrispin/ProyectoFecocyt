from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename
import os
from utils.image_editor import aplicar_filtros, rotar_imagen, redimensionar_imagen

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "static/uploads"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/subir", methods=["POST"])
def subir():
    archivo = request.files["imagen"]
    if archivo:
        nombre = secure_filename(archivo.filename)
        ruta = os.path.join(app.config["UPLOAD_FOLDER"], nombre)
        archivo.save(ruta)
        return redirect(url_for("editar", nombre_imagen=nombre))
    return "No se subió ninguna imagen", 400

@app.route("/editar/<nombre_imagen>")
def editar(nombre_imagen):
    return render_template("editar.html", imagen=nombre_imagen)

@app.route("/procesar", methods=["POST"])
def procesar():
    nombre = request.form["nombre"]
    accion = request.form["accion"]
    ruta = os.path.join(app.config["UPLOAD_FOLDER"], nombre)

    if accion == "filtro":
        imagen_final = aplicar_filtros(ruta)
    elif accion == "rotar":
        imagen_final = rotar_imagen(ruta)
    elif accion == "redimensionar":
        w = int(request.form["width"])
        h = int(request.form["height"])
        imagen_final = redimensionar_imagen(ruta, w, h)

    nueva_ruta = ruta.replace(".", "_editado.")
    imagen_final.save(nueva_ruta)

    return render_template("resultado.html", imagen=nueva_ruta.split("/")[-1])

if __name__ == "__main__":
    app.run(debug=True)
