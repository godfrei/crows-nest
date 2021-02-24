---
title: LFD Files
---

LFD files contain various resources, mostly sound and graphics.

You don't need them to create a new level, but for things like cutscenes and briefings.

The Dark Forces LFD format seems to be completely compatible with X-Wing and Tie Fighter LFD files.

```
LFD_Ix_Entry IS
{
 TYPE             char[4]          // type of the resource
 NAME             char[8]          // name of the resource
 LENGTH           long             // length of the resource
}
```

Then LENGTH bytes follow the header.

The first index entry is of type RMAP, and contains the list of all the sections in the .LFD file.

This is similar to the GOB Master Index.

The other sections can be:

|||
|--- |--- |
|Section	|Description
|ANIM	    |animation, this is a collection of DELT
|DELT	    |static image in delta format
|FILM	    |'script' referencing the other resources in the lfd
|FONT	    |font
|GMID	    |General Midi music
|PLTT	    |palette used for ANIM and DELT
|VOIC	    |VOC (standard Creative Labs format)
