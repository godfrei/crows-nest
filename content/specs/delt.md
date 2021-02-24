---
title: DELT LFD Resource (DLT Files)
---

A DELT LFD resource codes a static image. They are generally used as backgrounds for ANIMs, but their most important use is in the briefings 'texts' (the scrollable section of the briefing screen) which are a DELT stored in dfbrief.lfd for each level.

**Note:** the .dlt extension is a convention adopted by add-on developers when writing conversion programs, there are no real DLT files in DARK FORCES.

```
DELT_Header IS
{
 OffsX            int              // X offset
 OffsY            int              // Y offset
 SizeX            int              // X size - 1 !
 SizeY            int              // Y size - 1 !
}
```

After the header, a variable number of **line descriptors** follow. They are composed of an header and some data.

```
DELT_Line
{
 SizeAndType      int              // size and compression of the line
 StartX           int              // X position of line start
 StartY           int              // Y position of line start
}
```

StartX and StartY indicate the point where to start the drawing. You can start in the middle of a line, and draw a portion of it. Lines need not be in consequential order. You can split one line in more than one section. Portions not covered are, of course, transparent.

Bits 1-15 of SizeAndType indicate the number of pixels described in this section.

If bit 0 of SizeAndType is 0, the byte following the header contains the number of bytes to copy.
Those bytes follow.

If bit 0 is 1, data compressed with RLE follows.
This data may be composed of copy and RLE parts, which is indicated by **bit 0** of the count byte.