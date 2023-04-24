#!/usr/bin/python
from PIL import Image
import colorsys
im = Image.new(mode="RGB", size=(128, 128))
for x in range(128):
    for y in range(128):
        (r, g, b) = colorsys.hsv_to_rgb(x/128, 1-y/128, 1.0)
        r = r*255
        g = g*255
        b = b*255
        im.putpixel((x, y), (round(r), round(g), round(b)))

im.show()
im.save("test.png")
