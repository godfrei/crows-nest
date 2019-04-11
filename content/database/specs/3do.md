---
title: 3DO Files
---

* [General Description](#general-description)
* [File Header](#file-header)
* [Object Definitions](#object-definitions)

## <a id="#general-descroption" /> General Description

They contain the "3D" objects. (samples : MOUSEBOT, the DEATH STAR HOLOGRAM, ...)

They are text files containing a geometric description of a full 3D object, and are converted from 3D Studio .ASC format. They accept # comments.

Note: "Underscore ("_") in the 3DO name makes other objects behind it show improperly - they get shown as if they are in front of the object rather than behind it (that excludes other 3DOs with underscore in their names for some reason). Underscore somehow changes sorting order, Z-buffering or some other rendering parameter probably giving a benefit in speed. Since the speed isn't really a problem for DF anymore, it's recommended not to use underscore in the names of 3DO files."
[ by Michael Taylor]

### 3DO Format: Header
```
| 3DO 1.2
```
Magic and Version Number: this is the word "3DO" followed by a version #, either 1.2, 1.20, or 1.30.

Next comes several lines of header data.
Included is the picture name, number of objects in the file, number of vertice, number of polygons, palette used, and number of textures.

```
| 3DONAME  cube
| OBJECTS  00001
| VERTICES 00008
| POLYGONS 00006
| PALETTE  METAL.PAL
| TEXTURES 0
```
or

```
| TEXTURES 1
|   TEXTURE: IPDTENGR.BM
```

The palette file doesn't appear to relate to any PAL file found in the GOB directory.
[Could this be the type of rendering (metal, phong, ...) used in 3DS ? [Yves]]
Please note that textures are a little different and will be explained below.

If any textures are used then below the TEXTURES # line is additional lines defining each texture file. It creates a zero based array of textures for later usage by the objects.

## <a id="#object-definitions" /> Object Definitions
[ by Michael Taylor]

After the header data comes each object's definition. Each one starts with an object header and then the data. The object header is the word "OBJECT" followed by the object's name in double quotes. The object names seem irrelevant provided they are unique within the 3DO file. Next is the word "TEXTURE" followed by the texture used for this object. If no texture is used then the value of -1 is used else an index into the texture table defined in the header data is given.

```
| OBJECT "shuttle"
| TEXTURE 0    # Index into texture array
|              # IFOCTGR.BM
```
After the texture information, starts the actual geometric description of the object.

First comes the vertices. The initial line is the word VERTICES followed by the number of vertices defined. Then the vertices are listed starting with 0 and going up to the number of vertices listed on the VERTICES line. Each vertex is defined by 3 numbers; x, y, and z. They represent relative locations on a 3-D graph. They are taken to 3 decimal places.

```
| VERTICES 8
|    0:   0.000   2.000  -0.050
|    1: -10.000   2.000  -5.550
| ...
```
After the vertex information, comes the polygonal information. Each object may be made up of either triangles or quads. The appropriate header and number of polygons defined are listed, TRIANGLES for triangles and QUADS for quadrilaterals. The polygons are described with a number starting at 0, then the vertex number for each end point is given (3 for triangles and 4 for quadrilaterals). Then a color is given to each polygon (0 to 255). Finally comes the shading used for each polygon.

Note that in order to use a texture for a polygon, you must set its shading to TEXTURE.

[Here is a list and quick explanation of each of the shading types:

|||
|--- |--- |
|FLAT	    |Normal, flat surface
|GOURAUD	|Gouraud shading on surface
|VERTEX	    |Display only vertexes of polygon (like Death Star holo)
|TEXTURE	|filled with a texture
|GOURTEX	|filled with a texture, plus gouraud shading on the texture
|PLANE	    |texture on a horizontal plane (acts same as floor and ceiling textures -- must be 64*64, affected by flr and ceil txoffsets, and scrolled by elevators scroll_floor and scroll_ceiling)
- Jereth]

```
| TRIANGLES 12
| # Num  V1  V2  V3  Color  Shading
|   0:   1   2   3     0     PLANE
|   1:   0   1   3     0     PLANE
|   2:   5   1   0    62     FLAT
| ...  
```
Also note that the vertices are listed in clockwise order if you are facing directly at the polygon.
[This simplifies hidden lines/surfaces algorithm, as you may determine the facet orientation with 3 of them [Yves]]

[end of Michael's section]

Here is a description of TEXTURE VERTICES and TEXTURE QUADS/TRIANGLES, which Michael didn't fully cover.

If textures are used (TEXTURE, GOURTEX or PLANE shading), then texture vertices and texture triangles/quads also needed to be defined.

### TEXTURE VERTICES:

These are a set of points defined on an X-Y plane, where X and Y coordinate values are >=0 and <= 1. These points define relative positions on the texture being used for the current object, eg. for a 16 x 8 texture, the following

**TEXTURE VERTICE**		
|\|#	|num:	|(x)	|(y)    |
|\|	    |0:	    |0.5	|0.25   |
....defines a point on the texture at (8, 2) in geometry units, or (64, 8) in pixels.

TEXTURE QUADS / TEXTURE TRIANGLES:

These link texture vertices into a 3 or 4 sided polygon, hence deciding which portion of the texture is to be placed on the polygon. For example, if you have an 16 x 8 texture, and the following 4

**TEXTURE VERTICES:**	
||||
|--- |--- |--- |
|/| 0:	|0.00	|0.00|
|/| 1:	|0.00	|0.50
|/| 2:	|1.00	|0.50
|/| 3:	|1.00	|0.00
and the following

**TEXTURE QUAD:*
||||||
|--- |--- |--- |--- |--- |	
|\|0:|0     |1    |2	|3	

....the bottom half of the texture will be placed onto QUAD 0 of the object (i.e. up to an X value of 16, but only up to a Y value of 4) with the first vertice of the TEXTURE QUAD being placed on the first vertice of the QUAD, the second vertice on the second, and so on. So you can also orientate the portion of texture on the polygon any way you want by keeping the TEXTURE VERTICES pointed to in the same order, but varying the starting vertice, flip it by reversing the order of TEXTURE VERTICES pointed to, or even deform the texture by varying the order of the TEXTURE VERTICES pointed to.

```
| 1:	2	1	0	3
```

In this example, the texture will be flipped horizontally, and be on its side relative to TEXTURE QUAD 0 (the first example).

Of course, this section of the texture will need to be scaled to cover the whole polygon, so if the polygon is, say, a 64 by 32 rectangular QUAD, the texture will be expanded by a factor of 4 for the above example. If the polygon doesn't have dimensions of the same ratio as the portion of texture, the texture portion will be warped, eg. if the polygon for the above example is shaped like a regular trapezium, the top part of the texture will be squashed and the bottom part stretched.

It is okay to point to the same texture vertices over and over again if you for example want to put the same section of a texture on more than one polygon in the object.

Note: TEXTURE VERTICES and TEXTURE QUADS / TRIANGLES are also needed for PLANE fill, although you can't decide what part of a texture is to be placed on a PLANE polygon. Hence the TEXTURE VERTICES pointed to by the TEXTURE QUAD / TRIANGLE are unused.

TEXTURE QUADS / TRIANGLES correspond with the polygons (having TEXTURE, GOURTEX or PLANE fill) that they are linked to. So if QUAD 0 and 2 of an object have a texture fill, but QUAD 1 is just gouraud or flat or otherwise, then TEXTURE QUAD 0 and 2 will be used, but TEXTURE QUAD 1 must also be defined even though it isn't used. So to be economical, you should have all polygons filled with a texture defined first within each object of the 3DO file.