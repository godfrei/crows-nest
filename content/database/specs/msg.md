---
title: MSG Files
---

They contain the text messages used in the game.

* **text.msg** - Contains in-game text messages. You can create new messages or patch existing ones. New messages can be displayed with the "TEXT:" INF function.
* **local.msg** - Contains run-time error messages and should be left untouched.
* **hotkeys.msg** - Contains menu hotkeys and should be left untouched

General format:

```
| MSG 1.0
|
| MSGS 119
|
| # internal game messages
| 0    0:  "Joystick Off"
| ...
| END
```

MSGS is the number of messages. Don't forget to update it if you add messages.

I found no problems by adding messages to TEXT.MSG at 900 and more.

eg.
```
| 900  1:  "Hurry up !"
```

The number followed by a colon (eg. 1:) rates the importance of the message relative to other messages in the MSG file. '0: ' is the most important, and as the number increases, the message becomes less important. If a message is currently on screen, it can be immediately overwritten with one of the same or more importance, otherwise if the incoming message is less important, it won't be shown. So for example, you will probably want the pickup message of a goal item to be more important than the pickup message of a shield or clip.

The 'cheat messages' are from 700 onwards. Just so you know where to insert a few 'Cheater!' and 'Chicken Mode ON' ... :-)