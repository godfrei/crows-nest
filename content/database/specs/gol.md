---
title: GOL Files
---

## General Description

GOL files control the functioning of the objective screen in the PDA. They contain a list of mission goals which are shown to be completed in the objective screen when they are fired. Note that the objective screen is an ANIM in DFBRIEF.LFD. It is composed of a number of DELTs (with yellow text) which are overlaid on the first embedded DELT (which has green text) as goals are completed.

```
| GOL 1.0
| GOAL: 0       ITEM:   5       # DT weapon
| GOAL: 1       TRIG:   1
```

Each GOAL: can be a TRIG: -- a goal trigger, or an ITEM: -- a goal item.

## Goal triggers

These are goals that are fired by the .INF file when a "complete" message is sent. The message will fire the appropriate goal in the GOL file.

For instance, "message: [stop] [recipient] complete 1" will say that "TRIG: 1" is complete!

## Goal Items

These are goals which are fired when you pick up a goal item. The logics of the goal items fire an internal message to the GOL when the item is picked up.

Each goal item has a num of its own:

||||
|--- |--- |--- |
|Goal item          |Description	    |Num    |
|LOGIC: PLANS       |Death Star plans	|0      |
|LOGIC: PHRIK       |Phrik metal	    |1      |
|LOGIC: NAVA	    |Nava Card	        |2      |
|LOGIC: DATATAPE	|data tapes	        |4      |
|LOGIC: DT_WEAPON	|broken DT weapon	|5      |
|LOGIC: PILE	    |Your Gear	        |6      |

For instance, picking up a broken DT weapon will say that "ITEM: 5" is complete! Notice this implies that you can only use one of each goal item in each level.

**Note:** 
the goal items will also move an elevator called "complete" to its next stop when picked up.

## Managing Goals

The best way to handle goals is to use elevator "complete" only for mission goal/completion handling. It should have a number of "hold" stops and a final "complete" stop. Each goal you accomplish will move elevator "complete" one stop forward, until accomplishing the final goal moves it onto its "complete" stop, completing the level. Goal triggers will move elevator "complete" if the "complete" message is sent to elevator "complete" (because the "complete" message also moves its recipient to its next stop). Goal items automatically move elevator "complete" when they are picked up, as mentioned above.

Don't get confused with the 3 different "completes" ! One is a message, one is the name of an elevator, and one is a stop option just like "hold".

Final note: don't assume the goals will happen in the .GOL order! Ordering completion of goals is something you need to do yourself as part of your level design!