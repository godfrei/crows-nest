---
title: CMP Files
---

CMP files store palette mappings (like DOOM COLORMAP), which are the way the colors behave under different light levels.

Each byte is an index into the palette, and the CMP file is in fact an array that can be used for shading.

Given a color value [C] and a light value [L] the correct color to draw can be determined with the following formula:

```
DrawColor = [start_of_CMP_file]+(256*L)+C
```

There are 128 added bytes at the end of the file, generally forming a slow gradient from 0x00 to 0x1F.

Those serve to modify light values when you use the headlight (or when firing a weapon lights the area).

The first of the 128 bytes controls the area right next to you and each one after that control an area progressively further away.

0x00 is the maximum illumination while 0x1f is minimum for the headlight.

Values above 0x1f and up to 0x27 serve to suppress the weapon lighting effect too.

The only use I see for those is to set them all to 0x1f to suppress the headlight altogether.

It doesn't seem logical to suppress the weapon lighting, although it can be done too...