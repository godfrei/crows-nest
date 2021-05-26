---
title: VUE Files
---

[Slightly edited extract from VUE.TXT by Paul Nemesh] [changed the references to "object name" to "id" which is what is used in the OFFSTVUE tool]

This what a sample .VUE looks like:
```
| vue 1
| transform "id" #1 #2 #3 #4 #5 #6 #7 #8 #9 #10 #11 #12
| transform "id" ......
```

"id" is the identifier (referenced by the .o file, see below). So you can store more than one set of 3D object motions within the one VUE, each with a different identifier.

The values for #1 through #9 are the coefficients of the rotating and scaling matrix that is used by DF to determine how to draw the .3do. 

The formulas are:

```
 #1: Scale x [cos(H) x cos(R)]
 #2: Scale x [-sin(H) x cos(P) + cos(H) x sin(R) x sin(P)]
 #3: Scale x [-sin(H) x sin(P) - cos(H) x sin(R) x cos(P)]
 #4: Scale x [sin(H) x cos(R)]
 #5: Scale x [cos(H) x cos(P) + sin(H) x sin(R) x sin(P)]
 #6: Scale x [cos(H) x sin(P) - sin(H) x sin(R) x cos(P)]
 #7: Scale x [sin(R)]
 #8: Scale x [-cos(R) x sin(P)]
 #9: Scale x [cos(R) x cos(P)]
 ```

The values for #10 through #12 are:

```
#10: X coordinate
#11: Z coordinate
#12: -Y coordinate
```

The .o file should have the following logic associated with the .3do:
```
SEQ
 KEY:   TRUE                     /* This always needs to be present.  */
 VUE:   TIEDEF.VUE "ID"         /* This is the filename of the .VUE,
                                    with the object name in quotes.   */
 VUE_APPEND: TIEDEF2.VUE "ID"   /* Same as the previous line, except
                                    this will be run directly after
                                    the first .VUE is finished.       */
 PAUSE: TRUE                     /* If this line is used, the .VUE 
                                    will run exactly once (like 
                                    Kyle's ship taking off). If this 
                                    line is omitted, the .VUE will 
                                    continuously repeat itself.       */
SEQEND
```

[End of extract]

Apparently, the very best way to generate VUE files is to use 3D Studio, as .VUE is a standard 3DS file format, used to describe objects motion. 

By the way, 3DS .ASC is the base format for the 3DOs, after which the LEC team converted them.