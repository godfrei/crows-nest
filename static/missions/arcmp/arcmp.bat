@echo off
cls
echo Loading OPERATION ARCHANGEL - MULTIPACK RELEASE (c) July 2000
echo.
rename lfd\dfbrief.lfd dfbrief.old
copy arcmp.lfd lfd\dfbrief.lfd > nul
dark -uarcmp.gob
cls
del lfd\dfbrief.lfd
rename lfd\dfbrief.old dfbrief.lfd
cls