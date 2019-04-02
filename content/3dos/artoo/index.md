---
component_id: artoo
title: "R2 Unit"
authors: 
    - "Jereth Kok"
date: "1997-03"
filename: "artoo.zip"
component_type: "3do"
heroImage: 
description: "A texture-mapped R2 unit with separate objects for animating with VUEs."
---

                              Doc for R2 unit
                              ---------------

This is a texture mapped R2 unit that I created for using with VUEs. It is
made up of five 3D objects and three textures:

        R2BODY.3DO      -- body
        R2HEAD.3DO      -- head (dome)
        R2LEG-L.3DO     -- left leg
        R2LEG-R.3DO     -- right leg
        R2FEET.3DO      -- feet (treads & power cells)

        R2_BODY.BM      -- texture for body
        R2_HEAD.BM      -- texture for head
        R2_LEG.BM       -- texture for legs

The head is separated from the body so you can make it spin around. The
body, legs and feet are separated so that you can make them lean for when
R2 is moving. The legs need to be separate (i.e. you can't have a single
3D object comprising of both legs) because they need to be positioned on
either side of the body for them to be z-buffered, and therefore displayed,
correctly.

Here are the relative insertion points (spatial positions) and orientations
required for if the R2 has its centre at X=0.00, Z=0.00, is on a floor of
altitude Y=0.00, and is facing north (YAW=0) :


STANDING STILL:
        Body      : X=0.00, Z=0.00, Y=3.50, Pitch=0, Yaw=0, Roll=0

        Head      : X=0.00, Z=0.00, Y=3.55, Pitch=0, Yaw=*, Roll=0

        Left leg  : X=-0.01, Z=0.00, Y=3.50, Pitch=0, Yaw=0, Roll=0

        Right leg : X=0.01, Z=0.00, Y=3.50, Pitch=0, Yaw=0, Roll=0

        Feet      : X=0.00, Z=0.00, Y=0.00, Pitch=0, Yaw=0, Roll=0


MOVING:
        Body      : X=0.00, Z=0.00, Y=3.50, Pitch=10, Yaw=0, Roll=0

        Head      : X=0.00, Z=0.00, Y=3.55, Pitch=10, Yaw=*, Roll=0

        Left leg  : X=-0.01, Z=0.00, Y=3.50, Pitch=-20, Yaw=0, Roll=0

        Right leg : X=0.01, Z=0.00, Y=3.50, Pitch=-20, Yaw=0, Roll=0

        Feet      : X=0.00, Z=-1.00, Y=0.00, Pitch=0, Yaw=0, Roll=0


* The Yaw for the head may be anything you want because as we all know, an
  R2 unit's head can swivel round.

With the feet, you should also define the RADIUS and HEIGHT for the R2
unit. THE RADIUS should be 2.0 units and the HEIGHT should be 5.5 units.

If you want an example of how to use the R2 with VUEs, check out my
level: "Stars End - The Cloak" (STARSEND.ZIP).

You may do anything you want with this R2 unit, including modifying its
textures and/or its 3D objects. You can use it as a base to create an
R5 unit to also use with VUEs (you know, the red one with the head like an
upside-down flower pot). You can add the third tread. You can make the
textures more detailed. You can port if over to Jedi Knight when the time
comes. As I said, do whatever you want with it. Just make sure you give
credit to me, the original creator.

Use of these 3DOs and BMs should not in anyway harm your copy of Dark
Forces or your system, but if by some incredible fluke of nature they do,
I am not responsible.

                                                        Jereth Kok
                                                        March 1997
