---
title: GOB
---

GOB files are a repository for many other files, and are by far the best way to distribute add-on levels.
They contain a header with a signature, a data part and an index part.

```
GOB_Header IS
{
 GOB_MAGIC        char[4]          // 'GOB' followed by 0x0A
 MASTERX          long             // offset to MASTERN
}
```

The embedded files follow, then comes the index.

```
GOB_Index IS
{
 MASTERN          long             // number of files in the GOB
 INDEXES          GOB_Ix_Entry[n]  // one index entry per file
}
```

Where:

```
GOB_Ix_Entry IS
{
 IX               long             // pointer to start of the file
 LEN              long             // length of the file
 NAME             char[13]         // name of the file, null terminated
}
```