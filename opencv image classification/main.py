import cv2
import base64
import numpy as np
from fastapi import FastAPI
from fastapi import Request
from pydantic import BaseModel
from urllib.parse import unquote
import json
app = FastAPI()

def tob64(image_path):
    with open(image_path, 'rb') as img_file:
        encoded_string = base64.b64encode(img_file.read())
    return encoded_string.decode('utf-8')

def frb64(base64_string):
    decoded_data = base64.b64decode(base64_string)
    np_data = np.fromstring(decoded_data, np.uint8)
    img = cv2.imdecode(np_data, cv2.IMREAD_COLOR)
    return img

def maps(x, in_min, in_max, out_min, out_max):
    # Map x from the input range to the output range
    return (x - in_min) * (out_max - out_min) // (in_max - in_min) + out_min

def rate_hair_fade(base64s):
    
    # Load the image
    image = frb64(base64s)
    image = cv2.GaussianBlur(image,(5,5),0)
    # Convert the image to grayscale
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Apply edge detection
    edges = cv2.Canny(image, threshold1=30, threshold2=100)
    
    # Find contours
    contours, _ = cv2.findContours(edges.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Calculate the number of contours (edges of the hair fade)
    num_contours = len(contours)
    # Rate the hair fade based on the number of contours
    if num_contours >= 1000:
        return 0
    else:
        rating = num_contours  # Scale the rating to be out of 10
    ret = maps(rating,300,0,20,0)
    ret = min(ret,10)
    return ret

@app.get("/")
def read_root(img: str):
    hair_fade_rating = rate_hair_fade(img)
    return hair_fade_rating