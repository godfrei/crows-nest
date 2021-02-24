---
title: FME Files
---

They contain the frames, which are the "one view" objects (you can turn around them, and you always see the same image).

* [Normal FME](#normal-fme)
* [Compressed FME](#compressed-fme)

## <a id="normal-fme" /> Normal FME
Here is the data structure for the FME file headers.

```
FME_Header1 IS
{

 InsertX          long             // Insertion point, X coordinate
                                   // This is a negative value
 InsertY          long             // Insertion point, Y coordinate
                                   // This is a negative value
 Flip             long             // 0 = not flipped
                                   // 1 = flipped horizontally
                                   // 2 = flipped vertically (?)
 Header2          long             // pointer to FME_Header2
 UnitWidth        long             // Unused
 UnitHeight       long             // Unused
 pad3             long             // Unused
 pad4             long             // Unused
}
```
```
FME_Header2 IS
{
 SizeX            long             // Size of the FME (cell), X value
 SizeY            long             // Size of the FME (cell), Y value
 Compressed       long             // 0 = not compressed 
                                   // 1 = compressed
 DataSize         long             // Datasize for compressed FMEs,
                                   // equals length of the FME file - 32
                                   // If not compressed, DataSize = 0
 ColOffs          long             // Always 0, because columns table 
                                   // follows just after
 pad1             long             // Unused
}
```

If Compressed = 0, the data follows, encoded by COLUMNS from the bottom to the top.

## <a id="compressed-fme" /> Compressed FME

Compressed FMEs are very similar to compressed BMs using RLE0. After FME\_Header2 follows a table of offsets to the starts of the columns data. 
Those are offsets from the start of FME\_Header2.

Then follow the columns data.

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