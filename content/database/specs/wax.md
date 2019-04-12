---
title: WAX Files
---

They contain the sprites. (samples : STORMTROOPERS, BONUS LIVES ...)

They are a collection of embedded CELLS (FME files stripped of their FME_Header1).

## WAX file structure:

```
WAX_Header IS		
{		
Version	long	// constant = 0x00100100
Nseqs	long	// number of SEQUENCES
Nframes	long	// number of FRAMES
Ncells	long	// number of CELLS
Xscale	long	// unused
Yscale	long	// unused
XtraLight	long	// unused
pad4	long	// unused
WAXES	long[32]	// pointers to WAXES // = different actions
}	
```	

```
WAX IS		
{		
Wwidth	long	// World Width
Wheight	long	// World Height
FrameRate	long	// Frames per second
Nframes	long	// unused = 0
pad2	long	// unused = 0
pad3	long	// unused = 0
pad4	long	// unused = 0
SEQS	long[32]	// pointers to SEQUENCES // = views from different angles
}		
```

**Note:** World Width and World Height are values which define how big the sprite actually appears in-game.

```
SEQUENCE IS		
{		
pad1	long	// unused = 0
pad2	long	// unused = 0
pad3	long	// unused = 0
pad4	long	// unused = 0
FRAMES	long[32]	// pointers to FRAMES // = the animation frames
}	
```	

```
FRAME IS		
{		
InsertX	long	// Insertion point, X coordinate // Negative values shift the cell left// Positive values shift the cell right
InsertY	long	// Insertion point, Y coordinate // Negative values shift the cell up// Positive values shift the cell down
Flip	long	// 0 = not flipped // 1 = flipped horizontally
Cell	long	// pointer to CELL// = single picture
UnitWidth	long	// Unused
UnitHeight	long	// Unused
pad3	long	// Unused
pad4	long	// Unused
}	
```	

```
CELL_Header IS		
{		
SizeX	long	// Size of the CELL, X value
SizeY	long	// Size of the CELL, Y value
Compressed	long	// 0 = not compressed // 1 = compressed
DataSize	long	// Datasize for compressed CELL,// equals length of the CELL// If not compressed, DataSize = 0
ColOffs	long	// Always 0, because columns table // follows just after
pad1	long	// Unused
}		
```

An explanation of how it all works:

The 32 WAXes pointed to by the .WAX file header are 32 possible states that the sprite can be in (usually only up to 14 are used). The logic controls what WAX is shown when, so that the sprite appears to be doing what the logic actually is doing.

All enemies apart from the REMOTE follow this general pattern:

|||
|--- |--- |
|WAX #	|state
|0	    |moving -- eg. walking, floating
|1	    |attacking (primary)
|2	    |dying (from punch)
|3	    |dying (from shot or explosion)
|4	    |lying dead
|5	    |staying still (i.e. not sighted player yet)
|6	    |follow through of primary attack -- eg. kick from gun
|7	    |secondary attack -- eg. TD for reeyees, green junk for int. droid, ..
|8	    |follow through of secondary attack
|9	    |jump (Kell Dragon)
|10	    |
|11	    |
|12	    |getting injured (dianoga looking around)
|13	    |special action - Using shield for D\_TROOP1, flying for D\_TROOP2 and D\_TROOP3, submerging for dianoga...

**Note:** The Phase 3 varies from this pattern quite a bit.
Where a state doesn't apply for a particular enemy logic, the WAX will usually just be the enemy walking or moving towards you. It won't be called for by the logic.

The remote has 4 states:

|||
|--- |--- |
|WAX #  |state
|0	    |moving
|1	    |staying still -- before siting player
|2	    |dying
|3	    |dying

LOGIC: SCENERY has 2 simple states:

|||
|--- |--- |
|WAX #  |state
|0	    |normal
|1	    |attacked

LOGIC: BARREL has 2 states:

|||
|--- |--- |
|WAX #  |state
|0	    |normal
|1	    |exploding

LOGIC: ANIM, as well as weapon projectiles, explosions, splashing water etc. have 1 continuous state.

The 32 pointers to SEQUENCES in each WAX structure point to the view of the WAX (state) from 32 different angles as you move around it (0, 11.25, 22.50....348.75). The first pointer (angle 0) is when the logic is facing you.

The pointers to FRAMEs in each SEQUENCE structure point to the FRAMEs that make up an animation sequence for each point of view. FRAMEs are the header 1 of FME files.
The SEQUENCE consists of 32 FRAME entries. Usually no more than 5 are used, but the dianoga has 27 frames of animation for one of its states (WAX 12, when it looks around for you) !
The entries = 0 are unused.

Each FRAME points to a CELL, which is a picture with the same format as .FME files with header 2 of FME files.

