---
component_id: at-st3
title: "AT-ST"
authors: 
    - "Matt Hallaron"
date: 2001-07-01
filename: "at-st3.zip"
component_type: "3do"
cover: 
description: "A texture-mapped AT-ST with separate head and red laser bolt for use with turret logic."
---

************************************************************************
           FULLY TEXTURED AT-ST 3DO version 3.0 FOR DARK FORCES
                             July-August 2001
************************************************************************

Dark Forces game (c) 1994 Lucasfilm Ltd. and LucasArts Entertainment Company.

Author:  Matt Hallaron (mhallaron@yahoo.com)

Allow me to indulge myself for a little bit with a little history on these 
3DOs.  Five years ago I had my first foray into Dark Forces components, by 
making a non-textured AT-ST 3DO, meant to use turret logic.  It was a little 
small in scale, and its details were done with various polygons, which due to 
limitations in the DF engine, didn't always show up properly.  I hoped to 
someday make a larger version, maybe even trying to texture it.  Unbeknownst 
to me, a talented DF editor named Barry Brien was already working on the same 
idea, and soon after released his AT-ST, version 2.  His was larger, and he 
used textures.  He also treated the bottom part a little different: My legs 
and base matched up position with the head (so that both 3DOs needed to be 
placed around 18 units above the ground) whereas Barry's legs and base could 
be set right on the ground at 0, and only the head needed to be offset (by 
about 30 units up.)  As far as which version is 'better' is a matter of 
taste; each version had its strong points and its weak points.

This one topples them both over!

Flash forward about four years: I returned to the Dark Forces scene and again 
started working on DF components, where I eventually learned the art of 
texturing 3DOs.  It really is the way to go.  Barry, who is till in the DF 
scene, and I have developed a pretty good rapport (and he also has improved 
his textured 3DO skills.)  But to me, this is a return to where it all began 
(for me).  This version is 25% larger (than my original), has better geometry, 
and excellent textures (if I may say so myself.)  It's taken me five years, 
but the AT-ST is finally done.


The initial geometries were based on my original v.1 3DOs, but have been 
significantly modified to reflect the use of the textures (no need for 
polygon details).  Changes were also made, particularily in the legs, to make 
them much more true to the models in the movies.

The textures are as authentic and accurate as I could make them.  They were 
originally mostly taken and modified from photos and screen captures of AT-
STs. A few sections were modified from Jedi Knight textures, and some were 
originally generated from the atstwalk.3ds mesh by 3D modelmaker, Arild Wiro.


There are three versions of the AT-ST in this archive: The main (new) version,
one which is scaled down to be the same size as my original v.1 3DOs, and one 
that has been enlarged (by about 38%) and offset to match the size and 
position of Barry Brien's v.2 3DOs. (In other words, it would be quite easy 
to swap the old ones for these new ones.)

The following files are included:

Main 3DO
 ATSTHED.3DO - 3DO file for the head (v.3) - to be placed 22.5 units higher 
   than the ground (on top off ATSTBOD1.3DO)
 ATSTBOD.3DO - 3DO file for the body (feet and base) (v.3) - placed 22.5 
   units higher than the ground (same coordinates as ATSTHED.3DO)

"Version 1" 3DO
 ATSTHED1.3DO - 3DO file for the head (v.1) - to be placed around 18 units 
   higher than the ground (on top off ATSTBOD1.3DO)
 ATSTBOD1.3DO - 3DO file for the body (feet and base) (v.1) - placed 18 units 
   higher than the ground (same coordinates as ATSTHED1.3DO)

"Version 2" 3DO
 ATSTHED2.3DO - 3DO file for the head (v.2) - to be placed around 30 units 
   higher than the ground (on top off ATSTBOD2.3DO)
 ATSTBOD2.3DO - 3DO file for the body (feet and base) (v.2) - placed right at 
   ground level (under ATSTHED2.3DO)

AT-ST Textures
 ATSTHEAD.BM - Texture for the head
 ATSTGUNS.BM - Texture for the side guns
 ATSTMGUN.BM - Texture for the front (main) guns
 ATSTBASE.BM - Texture for the base and neck section
 ATSTLEG.BM - Texture for the legs
 ATSTANKL.BM - Texture for the 'ankles'
 ATSTFOOT.BM - Texture for the feet

New Blaster bolt 3DO & Texture
 WGBOLT.3DO - in R.O.T.J. the AT-ST's laser colour is red while D.F. the 
   turret's laser colour is green.  This textured 3DO changes the turret's
   laser to a long red laser with an orange flare instead of short & green.
 BOLTR.BM - Texture for the red blaster bolt

 AT-ST3.TXT - This file

The AT-ST head should use turret logic - multiple turret logics can make the 
object much more powerful e.g.

/*  01 : atsthed2.3DO  */
CLASS: 3D           DATA:  # X: # Y:   # Z: # PCH:   # YAW: # ROL:   # DIFF: #
 SEQ
  LOGIC:     TURRET  
  LOGIC:     TURRET   
  LOGIC:     TURRET  
  LOGIC:     TURRET       
  LOGIC:     TURRET        
 SEQEND

These 3DOs were made for and first seen in the add-on level The Dark Tide II: 
Nightfall by Patrick Haslow and myself.

I spent many, many hours working on this, so please do not modify these files 
without my permission.  If you have any suggestions, please let me know.  If 
you use these in an add-on level, I would expect and appreciate you giving 
credit where credit's due.

You may distribute these files for FREE in their original form.  If this file 
is used on a CD or any other type of complilation, please be kind and let the 
author (me) know.

Thanks to Barry Brien, Patrick Haslow, Frank A. Krueger, Carlos Gomez, Yves 
Borckmans, Jonathan Wise, Arild Wiro, LucasArts Entertainment Company, and 
George Lucas.