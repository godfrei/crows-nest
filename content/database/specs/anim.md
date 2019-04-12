---
title: ANIM LFD Resource (ANM Files)
---

Those LFD resources contain animations played in the cutscenes, the missions objective screens that appear in the PDA, and the game menus.

ANIMs are quite logically a collection of DELTs.

**Note:** the .anm extension is a convention adopted by add-on developers when writing conversion programs, there are no real ANM files in DARK FORCES.

Their format is quite simple:

```
ANIM_Header IS
{		
 NbDELT           int              // number of embedded DELTs
}
```	

Then follows each DELT, encoded as:

```
ANIM_DELTData IS
{		
 DELTSize         long             // the size of the embedded DELT
 aDELT            bytes[n]         // a complete DELT resource
}
```
