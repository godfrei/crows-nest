---
title: Sound Files
---

* [VOC Files](#voc)
* [VOIC Resources (VOC Files)](#voic)
* [GMD Files](#gmd)
* [GMID Resources (GMD Files)](#gmid)

## <a id="voc" /> VOC Files

These are standard .VOC files in the Creative Labs format.

The DF engine only accepts MONO 8-bit 11KHz (11025 Hz) .VOC files.

Note that sounds are looped (eg. the water and wind) using REPEAT/END REPEAT markers.

[by galt@dsd.es.com]

Creative Voice File (VOC) Format:

HEADER (bytes 00-19)
Series of DATA BLOCKS (bytes 1A+) [Must end w/ Terminator Block]

|||
|--- |--- |
|HEADER:    |
|byte # 	|Description
|00-12	    |Creative Voice File
|13-15	    |1A 1A 00 (eof to abort printing of file)
|16-17	    |Version number (minor,major) (VOC-HDR puts 0A 01)
|18-19	    |2's Comp of Ver. # + 1234h (VOC-HDR puts 29 11)

DATA BLOCK:

Data Block: TYPE(1-byte), SIZE(3-bytes), INFO(0+ bytes)

**NOTE:** Terminator Block is an exception -- it has only the TYPE byte.

|||||
|--- |--- |--- |--- |
|TYPE   |Description    |Size (3-byte int)  |Info
|00	    |Terminator	    |(NONE)	            |(NONE)
|01	    |Sound data	    |2+length of data	|*
|02	    |Sound continue	|length of data	    |Voice Data
|03	    |Silence	    |3	                |**
|04	    |Marker	        |2	                |Marker# (2 bytes)
|05	    |ASCII	        |length of string	|null terminated string
|06	    |Repeat	        |2	                |Count# (2 bytes)
|07	    |End repeat	    |0	                |(NONE)

|||||
|--- |--- |--- |--- |
|*Sound Info Format:    |                   |**Silence Info Format: |
|00	                    |Sample Rate	    |00-01	                |Length of silence - 1
|01	                    |Compression Type	|02	                    |Sample Rate
|02+	                |Voice Data		    |                       |

|||
|--- |--- |
|Marker#	        |-- Driver keeps the most recent marker in a status byte
|Count#	            |-- Number of repetitions + 1
|                   |Count# may be 1 to FFFE for 0 - FFFD repetitions
|                   |or FFFF for endless repetitions
|Sample Rate	    |-- SR byte = 256-(1000000/sample_rate)
|Length of silence	|-- in units of sampling cycle
|Compression Type	|-- of voice data
|                   |8-bits = 0
|                   |4-bits = 1
|                   |2.6-bits = 2
|                   |2-bits = 3
|                   |Multi DAC = 3+(# of channels) [interesting-- this isn't in the developer's manual]


## <a id="voic" /> VOIC Resources (VOC Files)

Those LFD resources store .VOC files, in the Creative Labs format.

It seems that all the VOIC resources are in the jedisfx.lfd file.

## <a id="gmd" /> GMD Files

They contain the musics.

[by Alex Novikov]

The header of GMD file (or the LFD GMID resource) consists of two fields:

```
GMD_Header IS		
{		
Magic	char[4]	// the string 'MIDI'
Size	long	// Size of the whole file excluding header // inverted byte order
}		
```

The order of bytes in the Size field is inverted: the first byte is the highest byte, the 4th byte is the lowest byte of the value (this order is normal for Mac, but inverted for PC).

Then follow a variable number of chunks in format:

```
GMD_Chunk IS		
{		
Type	char[4]	// chunk type
Size	long	// Size of the chunk excluding header // inverted byte order
}	
```	

The field Size has the inverted order of bytes - same as the field Size of the file header.

The following Chunks are encountered:

**MDpg**
Varied length, usually 14 (0Eh)
Very strange content - mostly doesn't change from file to file, but if it does - some new byte is INSERTED between usual ones (with chunk size preserved, so the last byte of chunk goes).

**MThd**
6 bytes long.
Normal MIDI header. Indicates MIDI format 2.

```
MTHD_CHUNK IS		
{		
Format	INVERTED_INT	// always 2 (MIDI2 format)
NTracks	INVERTED_INT	// Number of tracks in the file
Division	INVERTED_INT	// always 1E0h (tempo constant)
}
```		

**INVERTED_INT** is an **INT** with inverted byte order.

**MTrk**
Normal MIDI format 0(2) track data with the exception that "running status" (i.e. if one MIDI event followed by the same MIDI event with different parameters, the MIDI event code can omitted) is not used/supported. You cannot omit MIDI event codes.This basically means that GMD MTrk data are compatible with the MIDI standard, but MTrk from external MIDIs can be (and often are) incompatible with the GMD standard. See SMF (Standard MIDI File) specs for more info on MTrk chunk content.

The additional data in GMD's MTrk chunks is internal iMuse commands. Internal iMuse commands are stored as SysEx (System Exclusive) messages. They usually look like:

|||
|--- |--- |
|F0 Size 7D 03 TEXT 00 F7   |
|F0	                        |identifier of SysEx message
|Size	                    |value of message size in MIDI variable length format
|7D 03	                    |probably an identifier of iMuse message
|TEXT	                    |a text string of several characters
|00	                        |string terminator
|F7	                        |SysEx message terminator

The encounteded messages are (TEXT part):

|||
|--- |--- |
|start new	        |
|stalk trans #	    |// # is a number appears to be a float
|fight trans #,#	|
|engage trans #	    |
|from fight #,#	    |
|from stalk #,#,#	|
|from boss #	    |
|clear callback	    |
|to X	            |// X= A,B,C...
|to Xslow	        |// X=A,B,C...

The number of parameters may vary. And, actually, the effect of these messages is not really known.

There are also iMuse messages beginning with 7D 01 whose format is unknown. They seem to have something to do with looping the in-level music.

## <a id="gmid" /> GMID Resources (GMD Files)

Those LFD resources store .GMD general midi files.

See the GMD discussion just above.
