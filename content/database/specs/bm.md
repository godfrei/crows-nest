---
title: BM Files
---

BM files store textures used in a variety of ways in DF. They serve as wall textures, as floor and ceiling textures (in which case they must be 64*64), and as 3DO facet textures, as weapons, and as the Heads Up Display.

See Also

* [Normal BM](#normal-bm)
* [Transparent BM](#transparent-bm)
* [Multiple BM](#multiple-bm)
* [Compressed BM](#compressed-bm)

## <a id="normal-bm" /> Normal BM

Here is the data structure for the BM file header.
```
BM_Header IS		
{		
MAGIC	char[4]	// = 'BM ' + 0x1E
SizeX	int	// if = 1 then multiple BM in the file
SizeY	int	// EXCEPT if SizeY also = 1,// in which case it is a 1x1 BM
idemX	int	//unused by engine
idemY	int	//unused by engine
Transparent	byte	// 0x36 for normal // 0x3E for transparent // 0x08 for weapons
logSizeY	byte	// logSizeY = log2(SizeY)// logSizeY = 0 for weapons
Compressed	int	// 0 = not compressed// 1 = compressed (RLE)// 2 = compressed (RLE0)
DataSize	long	// Data size for compressed BM// excluding header and columns starts table// If not compressed,DataSize is unused
pad1	byte[12]	// 12 times 0x00
}
```

Pease note that BM must have a height which is a power of 2 (except weapons).
The data follows, encoded by COLUMNS from the bottom to the top.

## <a id="transparent-bm" /> Transparent BM

You can transform any BM in a transparent BM by changing its Transparent value from 0x36 to 0x3E. The color 0 will 'disappear' and you will be able to see through it if it is a MID texture on an adjoined wall. Note that this isn't the same as DOOM transparent textures (which use something very similar to RLE0).

Note that weapons BM use 0x08 for their transparent value, so maybe the transparent byte is a collection of flags, where the bit 3 means transparent.

## <a id="multiple-bm" /> Multiple BM
IIf SizeX = 1 (EXCEPT if SizeY = 1 in which case it is a 1*1 BM) the BM file is multiple.

The header of multiple BMs is different from that of a normal BM.

```
BM_Multiple_Header IS		
{		
MAGIC	char[4]	// = 'BM ' + 0x1E
SizeX	int	// = 1
SizeY	int	// = length of file - 32
idemX	int	// = -2
idemY	int	// number of 'sub' BMs
Transparent	byte	
logSizeY	byte	
Compressed	int	
DataSize	long	
pad1	byte[12]	// 12 times 0x00
}	
```	

Important notes

Straight after the Multiple BM header are two bytes: - The first is either the frame rate (in frames per second) of an animated texture, or is 0 to designate a switch. You may alter this value if you want. - The second byte is 2.

Then follows a table of offsets to the 'sub' BM composed of idemY long. The simple fact that this table exists tells us that sub BMs of different sizes may be stored. Each 'sub' BM then has its own header, slightly different from the BM_Header:

```
BM_SUBHeader IS		
{		
SizeX	int	// horizontal size
SizeY	int	// vertical size
idemX	int	// unused by engine
idemY	int	// unused by engine
DataSize	long	// unused (no compression allowed)
logSizeY	byte	// logSizeY = log2(SizeY)
pad1	byte[3]	
u1	byte[3]	// these are always filled, but they seem // to be unused
pad2	byte[5]	
Transparent	byte	// 0x36 for normal // 0x3E for transparent
pad3	byte[3]	
}		
```

Important Notes

1) There is no MAGIC field.
2) For a multiple BM to work correctly, it must be made a SIGN, and for switches there MUST also exist a corresponding trigger in the .INF Else, switches will be displayed wrong (as a single column) and the animated will display correctly, but static. This means that you cannot do animated floors and ceilings this way !
3) The multiple BMs are limited to 64K in size because SizeY contains the size of the file - 32 and is an int.
Although it should never be a problem with switches, this means that you must use animated BMs for small textures only.

A solution that allows animated walls of any size AND animated floors and ceilings is to compose a huge texture with your multiple images pasted next to each other. Then use INF elevators to scroll wall or scroll floor/ceiling using the offsets of the images as stops. If you set a speed of 0, the change will be instantaneous, and the effect will be the same. An added bonus is that you'll also have complete control on starting/stopping the animation.

## <a id="compressed-bm" /> Compressed BM
If Compressed = 1 or 2, the BM is compressed.
These existed in the DEMO (buyit.bm, Compressed = 1; wait.bm, Compressed = 2), but there aren't any in the full game.
The engine still supports them however, so here are their descriptions.
Note that Multiple BMs don't allow compression. 
(thanks to Alex Novikov for corrections and improvements on these notions).

The heart of the data is a columns starts table, with the start addresses of each of the columns. It is at the end of the file, at offset DataSize, and has one long entry per column containing this column start address. This start address is calculated without the 32 bytes BM header (i.e. read the header in a struct, then the data in a huge buffer at offset 0).

Compressed = 1 (RLE)

The coding of one column follows (in pseudo code format).

```
while(end of data for this column not reached)
{
 if(buffer[address] <= 128)
   the FOLLOWING n bytes are direct values
 else
   the FOLLOWING byte is a color byte to repeat n-128 times
}
```

So, for example, the following hex values ...88 02 17 28 82... mean:
write 8 pixels of color 02, then write 17 pixels with colors 28, 82, etc.

This should be the format of choice for non-transparent BMs.

Compressed = 2 (RLE0)

The coding of one column follows (in pseudo code format).

```
while(end of data for this column not reached)
{
 if(buffer[address] <= 128)
   the FOLLOWING n bytes are direct values
 else
   skip n-128 transparent (background) pixels
}
```

So, for example, the following hex values ...88 02 17 28 82... mean:
skip 8 background pixels, then write two pixels with colors 17 and 28, then skip 2 background pixels, etc.

This should be the format of choice for transparent BMs.
