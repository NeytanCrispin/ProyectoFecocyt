from PIL import Image, ImageFilter

def aplicar_filtros(ruta):
    img = Image.open(ruta)
    img = img.filter(ImageFilter.BLUR)  # Ejemplo: desenfoque
    return img

def rotar_imagen(ruta, grados=90):
    img = Image.open(ruta)
    img = img.rotate(grados)
    return img

def redimensionar_imagen(ruta, width, height):
    img = Image.open(ruta)
    img = img.resize((width, height))
    return img
