---
title: O Files
---

O files contain all the level objects. They are in text format.

* [Generalities - Object Types](#generalities-object-types)
* [File Format](#file-format)
    * [Magic, Version number and level name](#magic-version-number-and-level-name)
    * [Objects Tables](#objects-tables)
    * [Object Descriptions](#object-descriptions)
        * [Sequences and Logics](#sequences-and-logics)
        * [Generators](#generators)
* [All Objects Logics](#all-objects-logics)

## Generalities - Object Types
There are many different object types in Dark Forces:

||||
|--- |--- |--- |
|Type   |File   |Description                                                |
|SPIRIT	|[none]	|an object not linked to a viewable file (i.e. invisible) Its main use is for the PLAYER, but you can create other invisible items. |
|SAFE	|[none]	|a restart point after the player died. You should put SAFEs in your levels, to allow the player to restart not far from where he died. |
|SPRITE	|WAX	|fully animated objects such as enemies.        |
|FRAME	|FME	|"one view" objects such as energy power ups.   |
|3D	    |3DO	|3D objects such as mousebots.                  |
|SOUND	|VOC	|an ambient sound around the object position.   |

## File Format

* [Magic, Version number and level name](#magic-version-number-and-level-name)
* [Objects Tables](#objects-tables)
* [Object Descriptions](#object-descriptions)
    * [Sequences and Logics](#sequences-and-logics)
    * [Generators](#generators)

O Files accept C like /* */ comments.

### Magic, Version number and level name

```
| O 1.1
```

This is trivial.

```
| LEVELNAME SECBASE
```

I'm not sure this level name is used in DF !

### Object Tables

As there is a lot of OB information in a level, 4 object tables are created to avoid storing OB names in full at each occurrence.

```
| PODS 3             # These are the "3D" objects
|  POD: DEATH.3DO    # 00
|  ...
|
| SPRS 10            # These are the SPRITES
|  SPR: OFFCFIN.WAX  # 00
|   ...
|
| FMES 6             # These are the FRAMES
|  FME: IENERGY.FME  # 00
|  ...
|
| SOUNDS 1           # These are the SOUNDS
|  SOUND: BANG.VOC   #00
|  ...
```

Afterwards, all the objects are referred to by their 0 based index in the object tables. 
The object CLASS determines in which table to look.

### Object Descriptions

* [Sequences and Logics](#sequences-and-logics)
* [Generators](#generators)

The first data is the total number of objects in the level :
```
| OBJECTS 185
```

Then each object is described.
Please note that the object data first line has been split here for visual convenience.

```
| CLASS: SPIRIT  DATA:  0 X: 131.00 Y:    0.00    Z: 210.00
\                       PCH:   0.00 YAW: 176.34 ROL:   0.00
\                       DIFF: 1
|  SEQ
|   LOGIC:     PLAYER
|   EYE:       TRUE
|  SEQEND
|
| CLASS: SPRITE  DATA:  0 X: 320.62  Y:  20.00   Z:  275.64
\                       PCH: 0.00  YAW: 270.00 ROL:    0.00
\                       DIFF: 1
|  SEQ
|   TYPE:      I_OFFICER
|  SEQEND
```

CLASS is the type of object, and DATA is the offset in the corresponding object table. (SPIRIT and SAFE have DATA = 0).

X, Y, Z are trivial.

PCH, YAW, ROL are classic spatial orientation, but only YAW is really used (DOOM equivalent is THING orientation). It takes a value in degrees where 0 is at the "top of the screen when you look at the map". The value increases clockwise.

DIFF is the difficulty level at which the object appears.

|||||
|--- |--- |--- |--- |
|DIFF	|EASY	|MED	|HARD   |
|-3	    |X	    |X	    |X      |
|-2	    |X	    |X	    |       |
|-1	    |X  	|       |       |    	
|0	    |X	    |X	    |X      |
|1	    |X	    |X	    |X      |
|2		|       |X	    |X      |
|3		|	    |       |X      |

#### Sequences and Logics
SEQ and SEQEND are delimiters for a series of options/modifiers to apply to the object
which determine its behavior.

The basic thing that all entities will have is a LOGIC: that controls it (eg. for an enemy, tells it what direction to walk in, when to shoot and so on).

Logics are hardcoded in DARK.EXE and also determine things like how fast an enemy moves, how it attacks, how strong it is, what sounds it makes, what weapon it drops when it dies etc.

In addition, logics will control what the sprite appears to be doing (i.e. what frames in the WAX that are shown).

See Full Logics List

##### ( LOGIC: ).
The same viewable file may be used to create 'different' objects.

For instance, OFFCFIN.WAX may be used with a LOGIC: I_OFFICER or LOGIC: I_OFFICERR (note the second 'R') which will generate a red key then killed instead of the usual ammo clip.

Or you can use it with LOGIC: STORM1 and although the enemy will appear like an officer, it will behave as a stormtrooper, take as many shots to kill as a stormtrooper etc.

The keywords TYPE: and LOGIC: are freely exchangeable, and the ITEM keyword is optional before item logics.

##### Combined Logics

If you combine enemy logics, the first LOGIC: is in this case the primary logic, which means that to kill the object, 
you have to use the firepower needed to kill its first LOGIC: .

Very strange things may happen when combining LOGICs, and some combinations don't work, or even don't work every time! Try Mousebot + Barrel, or Player + Mousebot...

#### Generators
Generators cause enemies to appear mid-way through a level. Here is a quite self explaining example:

```
| CLASS: SPRITE  DATA:  4 X: 396.88   Y:  -2.00   Z: 217.48
\                       PCH:   0.00 YAW:   0.00 ROL:   0.00 
\                      DIFF: 1
|  SEQ
|   LOGIC:     GENERATOR STORM1
|   DELAY:     30
|   INTERVAL:  20
|   MIN_DIST:  70
|   MAX_DIST:  200
|   MAX_ALIVE: 3
|   NUM_TERMINATE: 8
|   WANDER_TIME: 40
|  SEQEND
```

All generated enemies will use the sprite defined, and will appear "awake" (i.e. walking around, not standing still) from the X, Y and Z coordinates of the generator.

LOGIC: is the logic that the generated sprites will have.

Note the GENERATOR keyword.

Note also that only the following logics are allowed to be generated (generating others will cause problems and usually crash the game!)
```
	I_OFFICER and key variations
	TROOP
	STORM1
	COMMANDO
	BOSSK
	G_GUARD
	REE_YEES
	REE_YEES2
	SEWER1
	INT_DROID
	PROBE_DROID
	REMOTE
```

DELAY: is the time in seconds that needs to pass from the start of a level before the generator starts operating.

INTERVAL: is the time in seconds between each generation.

For an enemy to be generated, the player must be at a distance from the generator that is between 
MIN_DIST and MAX_DIST.

MAX_ALIVE: is the maximum number of enemies from the generator allowed alive at the same time.

NUM_TERMINATE: is the number of enemies to be generated. When this is reached, the generator deactivates.
If set to -1, an infinite amount will be generated, and the generator will never deactivate.

WANDER_TIME: is the time in seconds that a generated sprite walks around before becoming inactive.

**Note:** in DARK.EXE, there is a keyword "PLUGIN:" among the above generator keywords. Its usage is still unknown.

Sprites aren't generated when the generator is able to see you, however (otherwise it would look like the enemies were walking out of thin air!). The best way to observe a generator working is therefore on the map by using the LACDS cheat.

Also note that you can set MASTER: OFF on a generator (not to be confused with the INF master variable!), and activate it by sending a "master_on" message to the sector that contains it.

## All Objects Logics

This is a list of all the objects and other modifiers that can be used in the sequences of objects.

Please also see the end of this section for some unknowns found in DARK.EXE.

### Player

```
| LOGIC:     PLAYER
| EYE:       TRUE
```

These should always be used together. Technically though, the LOGIC: PLAYER is the entity that you will control and move around, while EYE: TRUE is the object from whose point of view the level is viewed from. 
So yes, you can try following enemies and mousebots around with the eye......

### Items

Remember that you can use ITEM keyword before these logics.
Message is the message number from TEXT.MSG that is displayed when you pick up the item 
(just in case you want to patch).

||||
|--- |--- |--- |
|Logic:Description:	|Message:	                            |Message: # |
|General		    |                                       |           |
|LOGIC: SHIELD	    |20 shield units	                    |114        |
|LOGIC: BATTERY	    |battery unit	                        |211        |
|LOGIC: CLEATS	    |ice cleats	                            |304        |
|LOGIC: GOGGLES	    |infra red goggles	                    |303        |
|LOGIC: MASK	    |gas mask	                            |305        |
|LOGIC: MEDKIT	    |med kit	                            |311        |
|Weapons            |                                       |           |		
|LOGIC: RIFLE	    |Blaster rifle / 15 energy units        |100 / 101  |
|LOGIC: AUTOGUN	    |Repeater Rifle / 30 power units        |103 / 104  |
|LOGIC: FUSION	    |Jeron fusion cutter / 50 power units	|107 / 108  |
|LOGIC: MORTAR	    |Mortar Gun / 3 mortar shells	        |105 / 106  |
|LOGIC: CONCUSSION	|Concussion Rifle / 100 power units	    |110 / 111  |
|LOGIC: CANNON	    |Assault cannon / 30 plasma units	    |112 / 113  |
|Ammo               |                                       |           |		
|LOGIC: ENERGY	    |15 energy units	                    |200        |
|LOGIC: DETONATOR	|1 thermal detonator	                |203        |
|LOGIC: DETONATORS	|5 thermal detonators	                |204        |
|LOGIC: POWER	    |10 power units	                        |201        |
|LOGIC: MINE	    |1 mine	                                |207        |
|LOGIC: MINES	    |5 mines	                            |208        |
|LOGIC: SHELL	    |1 mortar shell	                        |205        |
|LOGIC: SHELLS	    |5 mortar shells	                    |206        |
|LOGIC: PLASMA	    |20 Plasma units	                    |202        |
|LOGIC: MISSILE	    |1 missile	                            |209        |
|LOGIC: MISSILES	|5 missiles	                            |210        |
|Bonuses		    |                                       |           |
|LOGIC: SUPERCHARGE	|weapon supercharge	                    |307        |
|LOGIC: INVINCIBLE	|shield supercharge	                    |306        |
|LOGIC: LIFE	    |extra life	                            |310        |
|LOGIC: REVIVE	    |revive	                                |308        |
|Keys	            |                                       |           |	
|LOGIC: BLUE	    |blue key	                            |302        |
|LOGIC: RED	        |red key	                            |300        |
|LOGIC: YELLOW	    |yellow key	                            |301        |
|LOGIC: CODE1	    |code key 1	                            |501        |
|LOGIC: CODE2	    |code key 2	                            |502        |
|LOGIC: CODE3	    |code key 3	                            |503        |
|LOGIC: CODE4	    |code key 4	                            |504        |
|LOGIC: CODE5	    |code key 5	                            |505        |
|LOGIC: CODE6	    |code key 6	                            |506        |
|LOGIC: CODE7	    |code key 7	                            |507        |
|LOGIC: CODE8	    |code key 8	                            |508        |
|LOGIC: CODE9	    |code key 9	                            |509        |
|Goal Items		    |                                       |           |
|LOGIC: DATATAPE	|data tapes	                            |406        |
|LOGIC: PLANS	    |Death Star plans	                    |400        |
|LOGIC: DT_WEAPON	|broken DT weapon	                    |405        |
|LOGIC: NAVA	    |Nava Card	                            |402        |
|LOGIC: PHRIK	    |Phrik metal	                        |401        |
|LOGIC: PILE	    |Your Gear	                            |312        |

### Enemy Logics

|||
|--- |--- |
|Logic:	            |Description:               |
|Imperials	        |                           |
|LOGIC: I_OFFICER	|Imperial officer
|LOGIC: I_OFFICERR	|Officer with red key
|LOGIC: I_OFFICERB	|Officer with blue key
|LOGIC: I_OFFICERY	|Officer with yellow key
|LOGIC: I_OFFICER1	|Officer with code key 1
|LOGIC: I_OFFICER2	|Officer with code key 2
|LOGIC: I_OFFICER3	|Officer with code key 3
|LOGIC: I_OFFICER4	|Officer with code key 4
|LOGIC: I_OFFICER5	|Officer with code key 5
|LOGIC: I_OFFICER6	|Officer with code key 6
|LOGIC: I_OFFICER7	|Officer with code key 7
|LOGIC: I_OFFICER8	|Officer with code key 8
|LOGIC: I_OFFICER9	|Officer with code key 9
|LOGIC: TROOP		|Stormtrooper
|LOGIC: STORM1		||Stormtrooper
|LOGIC: COMMANDO	|Imperial Commando
|Aliens	
|LOGIC: BOSSK		|Bossk
|LOGIC: G_GUARD		|Gammorean Guard
|LOGIC: REE_YEES	|ReeYees with thermal detonators
|LOGIC: REE_YEES2	|ReeYees w/o thermal detonators
|LOGIC: SEWER1		|Sewer creature
|Robots	
|LOGIC: INT_DROID	|Interrogator droid
|LOGIC: PROBE_DROID	|Probe droid
|LOGIC: REMOTE		|Remote
|Bosses	
|LOGIC: BOBA_FETT	|Boba Fett
|LOGIC: KELL		|Kell Dragon
|LOGIC: D_TROOP1	|Phase 1 Dark Trooper
|LOGIC: D_TROOP2	|Phase 2 Dark Trooper
|LOGIC: D_TROOP3	|Phase 3 Dark Trooper (Mohc)

### Special Sprite Logics

**Note:** The WAX files used for the explosions of the Barrel and Land Mine are hardcoded.

|||
|--- |--- |
|Logic:				|Description:								|
|LOGIC: SCENERY		|Displays first cell of wax 0, then all of wax 1 when attacked
|LOGIC: ANIM		|Displays wax 0 over and over
|LOGIC: BARREL		|Power Generating unit
|LOGIC: LAND_MINE	|Land mine

### 3D Object Logics

|||
|--- |--- |
|Logic:				|Description:		|
|LOGIC: TURRET		|gun turret			|
|LOGIC: MOUSEBOT	|mousebot			|
|LOGIC: WELDER		|welding arm		|

### 3D Object Motion Logics

There are 2 logics for giving motions to a  3D object:
LOGIC: UPDATE to perpetually rotate a 3D, and 
LOGIC: KEY to give a VUE motion to the 3D


Rotation on X-axis		
```
LOGIC:   UPDATE 
FLAGS:    8
D_PITCH:  [speed]
```

Rotation on Y-axis
```
LOGIC:    UPDATE 
FLAGS:    16
D_YAW:    [speed]
```

Rotation on Z-axis
```
LOGIC:   UPDATE 
FLAGS:   32
D_ROLL:  [speed] 
```

Speed is the speed at which the 3D object rotates from -999 (max anti-clockwise) to 999 (max clockwise).

### VUE Object

```
LOGIC:          KEY
VUE:            filename.VUE "id"
VUE_APPEND:     filenam2.VUE "id"
PAUSE:          TRUE
FRAME_RATE:    [frame rate]
```

filename.VUE is the name of the VUE file to use.

"id" is the name of the identifier within the VUE file to use

VUE_APPEND: is an optional VUE to be played after the first VUE.

PAUSE: TRUE will cause the VUE to pause each time it is played until a "wakeup" message is sent to the sector containing the 3D object. Objects with "PAUSE: TRUE" will also be "woken up" if their RADIUS is shot.

Frame rate is in frames per second.


### Other Sequence Modifiers

BOSS:	TRUE
This can be set to the following logics: 
```
	BOBA_FETT
	KELL
	D_TROOP1
	D_TROOP2
	D_TROOP3
```
When you kill the enemy, an elevator called "boss" will move to its next stop (unless it is LOGIC: D_TROOP3, where the elevator must be called "mohc"). This is similar to the movement of "complete" when a goal item is picked up. Using this modifier, you can cause something to happen when the player has killed the boss, for instance the player could be locked in a certain area until he has killed the boss and then a door will be opened letting him out.


RADIUS:	[horizontal distance]

This defines the size of an invisible circle around the object where the PLAYER cannot enter or shoot through. Frames and sprites have radiuses by default, but 3D objects don't, so you have to set one unless you want the PLAYER to walk right through. You can use this with a Spirit to create an invisible obstacle.


HEIGHT:	[vertical distance]

Similar to radius, height defines an area above (positive value) or below (negative value) an object where you can't walk or fire through. Therefore, using radius and height together, you can effectively create an impenetrable cylinder-shaped area around an object.


A further note:
RADIUS and HEIGHT, if used with objects having a logic, will also affect how the logic interacts with the player. If used with items, they determine the distance Kyle has to be from the item to pick it up. If used with enemies and "LOGIC: SCENERY", they determine the distance from the enemy that laser bolts etc. have to come within to damage the enemy.


### Unknown

These are found in DARK.EXE. It is likely that some are only used internally by the DF engine. We would appreciate any help working out any possible usable ones!
```
VISIBLE:
SHADED:
LIGHT:
PARENT:
D_X:
D_Y:
D_Z:
D_VIEW_PITCH:
D_VIEW_YAW:
D_VIEW_ROLL:
VIEW_PITCH:
VIEW_YAW:
VIEW_ROLL:
EYE_D_XYZ:
EYE_D_PYR:
SYNC:
PLUGIN:

STORM
DISPATCH
THINKER
FOLLOW
FOLLOW_Y
RANDOM_YAW
MOVER
SHAKER
PERSONALITY
```
