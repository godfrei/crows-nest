---
title: Font Files
---

* [FNT Files](#fnt)
* [FONT Resources (FON Files)](#font)

## <a id="fnt"> FNT Files</a>

These files store a proportional character set. FNT files are found in DARK.GOB
This set may not be complete. The font used to display the ammo, for instance contains only the numbers and the ':' character.

```
FNT_Header IS
{
 Magic            char[4]          // 'FNT' + 15h (21d)
 Height           byte             // Height of the font
 u1               byte             // Unknown
 DataSize         int              // Data after header
 First            byte             // First character in font
 Last             byte             // Last character in font
 pad1             byte[22]         // 22 times 0x00
}
```

Then follow the characters. 
There is (Last-First+1) FNT_Character blocks (one per character).

```
FNT_Character IS
{
 Width            byte             // Width of the character
 Picture          byte[Width*Height] 
                                   // Bytes describing the character,
                                   // by columns from bottom to top
                                   // Each byte is an index in the
                                   // current PAL palette
}
```

## <a id="font">FONT Resources (FON Files)</a>
These LFD resources store a proportional character set, which may be incomplete.
I found two examples : font6 and font8.

**Note** the .fon extension is a convention adopted by add-on developers when writing conversion programs, there are no real FON files in DARK FORCES. There are FNT files however, which are quite different !

```
FON_Header IS
{
 First            int              // First character in font
 Last             int              // Last character in font
 u1               int              // 8, could be bits per char line
 Height           int              // Height of Chars
 u2               int              // could be average Width
                                   // or the minimal Width to use
 pad1             byte[2]          // 2 times 0x00
}
```

Then follows a block of (Last-First+1) bytes (one per character), which code the width of the corresponding character.

```
FON_Characters_Widths IS
{
 Widths           byte[Last-First+1] 
                                   // each byte is the width 
                                   // of one character
}
```

Then each character is described in turn:

```
FON_Character IS
{
 Bitmap           Byte[Height]     // Height bytes for each
                                   // character
}
```

Now the funny part: each of these bytes is a bitmap representation of a line of the character.
A bit set correspond to a pixel drawn on the screen.

For example, if the bytes are 48h, FCh, 48h, FCh, 48h, 00h this gives

```
 48h   .X..X...
 FCh   XXXXXX..
 48h   .X..X...
 FCh   XXXXXX..
 48h   .X..X...
 00h   ........
```

Which is the # character.
Note that the width as referenced in the FON_Characters_Widths array would be 6 for this character. 
In fact, FON_Characters_Widths must be used to determine where on the screen to draw the next character.