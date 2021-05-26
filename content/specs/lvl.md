---
title: JEDI.LVL
---

Contains a list of the levels in DF.
```
 | LEVELS 14
 ```

This is the number of entries in JEDI.LVL

```
| Secret Base,        SECBASE,   
\ L:\LEVELS\SECBASE\;L:\LEVELS\;L:\LEVELS\BM-GEN\;
\ L:\LEVELS\PALETTES\;L:\LEVELS\BM-IMPER\;
\ L:\LEVELS\HOLDER\
| ...
```

This is the definition for a level. The first entry is the description (eg. "Secret Base")
 to be shown in the mission menu in DF.

The second entry is the name of the level (e.g. SECBASE). It will be applied in the following areas:

```
	levname.LEV
	levname.O
	levname.INF
	levname.GOL
	levname.PAL
	levname.CMP

	DELTlevname
	ANIMlevname
```
	
LEV entry in BRIEFING.LST

To successfully change the name of a level, 
its name must be changed in all of these as well as in JEDI.LVL.

The paths stored are unused, and were most probably referring to the LucasArts file server at development time.

The remainder of this file contains the names of all the levels in Dark Forces.