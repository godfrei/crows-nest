---
title: Palette Files
---

* [PAL Files](#pal)
* [PLTT Resources (PLT Files)](#pltt)


## <a id="pal" /> PAL Files
PAL files are 768 bytes long, and store a single 256 colors palette as 256 x 3 RGB bytes.

Each level in Dark Forces can have its own palette, specified in the LEV header.

```
PAL_File IS
{
 Colors           RGB_Color[256]   // 256 colors from 0 to 255
}
```

Where:

```
RGB_Color Is
{
 R                byte             // Red   intensity
 G                byte             // Green intensity
 B                byte             // Blue  intensity
}
```

**Note** The intensities range from 0 to 63 (limit of VGA mode 0x13) in the PAL files.

## <a id="pltt" /> PLTT Resources (PLT Files)
PLTT LFD resources are of variable size, and store a (possibly incomplete) palette used by ANIM and DELT resources.

**Note** The .plt extension is a convention adopted by add-on developers when writing conversion programs, there are no real PLT files in DARK FORCES.

```
PLTT_File IS
{
 First            byte             // first color in the palette
 Last             byte             // last color in the palette
 colors           RGB_Color[n]     // n = Last - First + 1
 pad1             byte             // unused = 0
}
```

Where:

```
RGB_Color Is
{
 R                byte             // Red   intensity
 G                byte             // Green intensity
 B                byte             // Blue  intensity
}
```

**Note** Contrary to the PAL files, the intensities range from 0 to 255 in the PLTT resources.