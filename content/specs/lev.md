---
title: LEV Files
---

LEV files contain a complete level geometry. They are in a quite complex text format.

They are also huge (generally > 600K), but this isn't a problem, as you really cannot edit them as a text file, because of the many dependencies between the geometry elements.

Geometry Elements
The Adjoin/Mirror/Walk mechanism
A Quick Note on Texturing
File Format
* Magic, Version number and general level info
* Texture Table
* Geometry Description
    * Sectors
        * Sector Flags
    * Vertices
    * Walls
        * Wall Flags

## Geometry Elements

The basic geometry elements of a DF level are :

VERTEX	a point in a 2 dimensions projection (X and Z)
WALLS	a line joining 2 vertices
SECTOR	a collection of walls generally closed, can contain "gaps" or other sectors

As the game works with a two dimensions projection, the third (Y) dimension is coded at the sector level by a floor altitude and a ceiling altitude.

Note that this implies that floors and ceilings of a sector are always FLAT.

Sectors can however be layered on top of one another to give a "full 3D" feeling.

Each sector is coded with its walls and vertices, and is completely self contained

The relation between sectors is done at the wall level by the adjoin/mirror/walk mechanism.

### The Adjoin/Mirror/Walk mechanism

```
1--------2    Sector 1 has 5 vertices (0 to 4) marked 0 1 2 A B
|        |                 5 walls    including AB (wall 3)
|   S1   |
|        |    Sector 2 has 4 vertices (0 to 3) marked 0 1 B A
0---B====A                 4 walls    including BA (wall 2)
    | S2 |
    1----0
```

It is VERY important to note that there are 2 vertices at point A, two vertices at point B and 2 walls marked ==== . 

As I said earlier, sectors are self contained.

So, to come back to the adjoin/mirror/walk mechanism, if S1 and S2 must be connected, an adjoin/mirror relation must be established.

```
+----1---+
|        |
0        2
| 4    3 |
+---+====+
    1  2 3
    +--0-+
```

This is quite simple :

* the **adjoin** is the number of the connected sector
* the **mirror** is the number of the connection wall

So we would need to set:

in S1 : W3.adjoin = S2 and W3.mirror = 2
in S2 : W2.adjoin = S1 and W2.mirror = 3

If there is no adjoin/mirror relationship, the values for adjoin and mirror will be -1.

Walk values seem to have no effect at all in a level, but they are mostly set to the same value as adjoin.

### A Quick Note on Texturing

When you have adjacent sectors:

TOP	is ABOVE the ceiling of the other SC
BOT	is BELOW the floor of the other SC
MID	is everywhere you can see through to the other SC

Of course, the MID texture is not shown when walls are adjoined, so that you can see through! 
Note: WL flag 1, bit 1 forces it back in place. See Wall Flags

The DF engine applys the floor and ceiling textures as if you had taken a picture and layed it face down. This gives the effect of while in DF ,that the left and right sides of the texture have been exchanged..(flipped on the X axis). To view them correctly you would have to be under the floor looking up while facing south.

# File Format

The LEV file is composed of 3 parts:

* Magic, Version number and general level info
* Texture Table
* Geometry Description

The following comments are accepted:

```
# comment
DATA # comment
```

## Magic, Version number and general level info

### Magic and version number

```
| LEV 2.1
```

This is trivial.

### General Level Info

This part contains the following data (sample from secbase.lev):

```
| LEVELNAME SECBASE
| PALETTE   SECBASE.PAL
| MUSIC     AVENGE.GMD
| PARALLAX  1024.0000 1024.0000
```

It seems that LEVELNAME isn't used at all by DF.
MUSIC is also unused, because musics are hardcoded in dark.exe.
(AVENGE.GMD doesn't even exist in DF, I think it is a Tie Fighter music !)

PALETTE determines the palette (PAL) used in the level, you may change it.

PARALLAX determines how much the "exterior" backgrounds scroll as you turn.
1024 1024 means as you turn around 360 degrees, you will see 1024 pixel columns of background sky.
Vertical PARALLAX is similar, although of course you can't pitch 360 degrees in DF.

## Texture Table

As there is a lot of TX information in a level, a texture table is created to avoid storing TX names in full at each occurrence.

Coding sample :

```
| TEXTURES 85        # number of textures
| TEXTURE: TEX00.BM  # texture 0
| TEXTURE: TEX01.BM  # texture 1
| ...
| TEXTURE: TEX84.BM  # texture 84
```

Afterwards, all the textures are referred to by their 0 based index in this texture table.

Note that changing TX names in the TX table may be an ultra fast way to relook a level !

# Geometry Description
* Sectors
    * Sector Flags
* Vertices
* Walls
    * Wall Flags

The first data is the total number of sectors in the level:

```
| NUMSECTORS numsectors
```

Then each sector is described, with its vertices and walls.
Please note that the wall data is on ONE line, but has been split here for visual convenience.

```
| SECTOR scnum
|  NAME             sectorname
|  AMBIENT          20
|  FLOOR TEXTURE    80 -0.38 -0.06 2
|  FLOOR ALTITUDE    0.00
|  CEILING TEXTURE  0  0.00  0.00 2
|  CEILING ALTITUDE -12.00
|  SECOND ALTITUDE   0.00
|  FLAGS 0 0 0
|  LAYER            1
|
| VERTICES numvertices
|  X: 252.00 Z: 224.00 # a vx
|  ...
|
| WALLS numwalls
|  WALL LEFT:  0 RIGHT:  1 
\       MID:   0  0.00  0.00 0
\       TOP:   1  0.00  0.00 0
\       BOT:   2  0.17  0.00 0
\       SIGN: -1  0.00  0.00
\       ADJOIN: 57 MIRROR: 0 WALK: 57
\       FLAGS: 0 0 0
\       LIGHT: 5
|  ...
```

Hmmm... heavy information!
Click a section to take it apart, it's not too difficult.

## Sectors
```
| SECTOR scnum
```

This is the sector number, it is zero based.

```
|  NAME             sectorname
```

This is both a link to the .INF file and a useful reminder.

```
|  AMBIENT          20
```

Ambient light level in this sector.
Note that this value is used in GROMAS to indicate an amount of red fog, not a light level.
This is a good demonstration of the use of the CMP files.

```
|  FLOOR TEXTURE    80 -0.38 -0.06 2
```

The TX to apply to the floor of the SC as an index in the TX table.
The following two floats are the X and Z offsets by which the TX must be moved before being mapped.
The third (int) value is unused.
It seems that floor textures must be 64x64, or the game engine does strange things.

```
|  FLOOR ALTITUDE    0.00
```

The altitude of the floor of this SC. Note that the Y axis goes "down", so higher altitudes have lower values.

```
|  CEILING TEXTURE  0  0.00  0.00 2
|  CEILING ALTITUDE -12.00
```

Same as floor.

```
|  SECOND ALTITUDE   0.00
```

This is used to indicate a second "floor" altitude in a sector. For instance, a second altitude of 4 will make you "enter into the floor" 4 deep. It will in addition make the sector water like and generate a splashing sound. If you set a negative second altitude, you will be able to walk higher on the sector, provided you also enter the sector higher. This is the way platforms are created (the platform object is only a visual clue).

```
|  FLAGS            0 0 0
```

Three flags, the second of which is never used in the 14 original levels.
Change various things in the sector. See Sector Flags.

```
|  LAYER            1
```

The layer on which the SC is (positive, 0 or negative).
This value is used in the game to make different maps corresponding to zones of altitude.
Note that this is only a logical grouping, but is also used by the map in the game.

### Sectors Flags
#### FLAG 1
|||
|--- |--- |--- |
|Bit Value  |Description                |Comment                                                        |
|1	        |EXTERIOR - NO CEIL. (SKY)	|Note: actual ceiling limit will be the ceiling altitude + 100  |
|2	        |DOOR	                    |instant door                                                   |
|4	        |SHOT REFLECTION / MAG.SEAL	|walls, floor and ceiling reflect weapon shots
|8	        |EXTERIOR ADJOIN	        |will adjoin adjacent skies.
|16	        |ICE FLOOR (SKATING)	    |
|32	        |SNOW FLOOR	                |no apparent effects
|64	        |EXPLODING WALL/DOOR	    |instant exploding door
|128	    |EXTERIOR - NO FLOOR (PIT)	|Note: actual floor limit will be the floor altitude - 100
|256	    |EXTERIOR FLOOR ADJOIN	    |will adjoin adjacent pits
|512	    |CRUSHING SECTOR	        |vertically moving elevators will crush the player
|1024	    |NO WALL DRAW / "HORIZON"	|removes walls of a sector(sector must be sky and pit to work properly)
|2048	    |LOW DAMAGE	                |
|4096	    |HIGH DAMAGE (both = GAS)	|both can be combined for GAS
|8192	    |NO SMART OBJECT REACTION	|
|16384	    |SMART OBJECT REACTION	    |
|32768	    |SUBSECTOR	                |no apparent effects
|65536	    |SAFE SECTOR	            |
|131072	    |RENDERED	                |
|262144	    |PLAYER	                    |
|524288	    |SECRET SECTOR	            |increments the %secret when entered

**Note on the Smart Objects:**
Smart Object Reactions will cause doors and CERTAIN elevator classes to react to enemies.
 There are two values, not a toggle, because Flag doors by default react to smart objects, and
 INF elevators by default don't react.

These are the elevators that can react to smart objects:
```
basic
inv
basic_auto
morph_move1
morph_move2
morph_spin1
morph_spin2
move_wall
rotate_wall
door
door_mid
door_inv
```

#### FLAG 2

is unused.

#### FLAG 3

When "message: system lights" is sent (eg. in TALAY when you turn on the generator), the engine copies the value here to the Ambient of the sector.

## Vertices
```
| VERTICES numvertices
```

This is the number of vertices that this SC has.

```
|  X: 252.00 Z: 224.00 # a vx
```

List of the VXs. X and Z are trivial.

## Walls
```
| WALLS numwalls
```

This is the number of walls that this SC has.

```
|  WALL LEFT:  0 RIGHT:  1
```

These are the origin and destination vertices for this wall.

```
\       MID:   0  0.00  0.00 0
```

The TX to apply to the middle of the WL as an index in the TX table.
The following two floats are the X and Y offsets by which the TX must be moved before being mapped (remember Y goes down).
The third (int) value is unused.

```
\       TOP:   1  0.00  0.00 0
\       BOT:   2  0.17  0.00 0
```

Same as MID

```
\       SIGN: -1  0.00  0.00
```

A sign is a second TX on the same WL, its main use is to place switches.

First is the TX to apply to a sign on the WL as an index in the TX table.

The following two floats are the X and Y offsets by which the TX must be moved before being mapped (remember Y goes down). Also note that this is relative to the texturing of the wall. So if you offset the WALL, you have to add this offset to that of the SIGN.

```
\       ADJOIN: 57 MIRROR: 0 WALK: 57
```

See The Adjoin/Mirror/Walk mechanism.

```
\       FLAGS: 0 0 0
```

Three flags.
Change various things in the wall. See Wall Flags.

```
\       LIGHT: 5
```

Relative modification of the luminosity on this specific WL.

### Walls Flags

#### FLAG 1

||||
|--- |--- |--- |
|Bit Value  |Description	            |Comment
|1	        |ADJOINING MID TX	        |the MID TX is NOT removed
|2	        |ILLUMINATED SIGN	        |
|4	        |FLIP TEXTURE HORIZONTALLY	|
|8	        |ELEV CAN CHANGE WALL LIGHT	|
|16	        |WALL TX ANCHORED	        |
|32	        |WALL MORPHS WITH ELEV	    |
|64	        |ELEV CAN SCROLL TOP TX	    |
|128	    |ELEV CAN SCROLL MID TX	    |
|256	    |ELEV CAN SCROLL BOT TX	    |
|512	    |ELEV CAN SCROLL SIGN TX	|
|1024	    |HIDE ON MAP	            |
|2048	    |SHOW AS NORMAL ON MAP	    |i.e. light green
|4096	    |SIGN ANCHORED	            |
|8192	    |WALL DAMAGES PLAYER	    |
|16384	    |SHOW AS LEDGE ON MAP	    |i.e. dark green
|32768	    |SHOW AS DOOR ON MAP	    |i.e. yellow

#### FLAG 2

is unused.

#### FLAG 3

||||
|--- |--- |--- |
|Bit Value	|Description	                            |Comment
|1	        |CAN ALWAYS WALK	                        |Player will climb any height
|2	        |PLAYER & ENEMIES CANNOT WALK THROUGH WALL	|
|4	        |ENEMIES ONLY CANNOT WALK THROUGH WALL	    |
|8	        |CANNOT FIRE THROUGH WALL	                |
