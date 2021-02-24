---
title: CUTMUSE.TXT
---

This file controls the music to be played during cutscenes.

CUTMUSE.TXT accepts // comments.

## File Format
```
SEQUENCE: 1
// cue 1
CUE: star-thm
0 0 0 0
// cue 2
CUE: star-thm
B 2 B 2
...
SEQUENCE: 2
// cue 1
CUE: execmus
0 0 0 0
...
```

**Note:** there is no header.

As you can see, the file is split into a number of Sequences which correspond to the "SEQ number" in CUTSCENE.LST. Sequences are nothing more than logical groupings of cutscenes that are played together, for example the starting sequence, the long sequence before TALAY, the ending sequence. The whole point of a sequence is that in CUTSCENE.LST, only the first cutscene in each sequence of cutscenes needs to point to the corresponding music sequence in CUTMUSE.TXT -- the rest can have "SEQ number" set to 0 as the same music sequence selected at the first cutscene will apply throughout the remainder of the cutscene sequence.

Sequences each have a number of Cues which are fired by the CUST objects in FILMs of cutscenes. Cues define a .GMD file (note - without the extension) to play the music from, what chunk within it to play, and how and when to play the chunk.

**Note:** the numbering of CUEs in CUTMUSE.TXT are just comments -- they are not actually defined with numbers.

[Thanks to Alex Novikov for lots of help in figuring out the following]

Cues point to the chunk to be played like this:

```
%c	%d	%c	%d
```

The two characters refer to MTrk chunks within the GMD. Capital letters are used, i.e. A, B, C, D, E..... where A is the first track, B is the second...... The numbers seem to refer to a point in the track -- larger numbers will start the track from further on. They maybe refer to a number of patterns or an interval of time (seconds or beats?), from the start of the track.

Now, the overall meaning seems to be something like this: the first character and number refer to a certain point in the music, which when reached, will change the music to a point defined by the second character and number. So "C 7 D 2" possibly means: when the music reaches track C time/pattern 7, then change to track D time/pattern 2. All this will happen when a FILM CUST object fires the Cue.

There are also a few exceptions:

"0 0 0 0" seems to be the equivilant of "give no command", so the music will just play on through unless it gets into a melody loop.

"1 0 0 0" usually means start the next track, but it has varying effects in different cutscenes, and sometimes will bring the music out of a loop, but sometimes won't.

". 0 0 0" will fade the music away.

A lot of this seems to be dependant on the internal iMUSE commands within GMD tracks, whose workings are unfortunately still very much unknown.

