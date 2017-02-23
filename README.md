# LLSIF_simulator
A simulator for Lovelive! school idol festival and a convertor for osu! and midi, or some other rhythm games.<br>
<b><i><u>Since the USB was recently lost, the whole project will only be resumed after it is found.</b></i></u><br>
<br>
v3.0.0.0 Preview:
-----------------------------------------------------
Added feature:<br>
-Add gray circles for beatmaps with less than 9 buttons.<br>
-Add temporary 4 secret maps in c.dash.moe.<br>
-Add resolution adjustment trackbar.<br>
-Add number of button adjustment trackbar.<br>

All projects:<br>
-----------------------------------------------------
1. Simulator<br>
1a. <a href="Visual%20Basic/">vb.net</a> (requires .NET Framework)<br>
1b. HTML<br>
1c. <a href="http://student.tanghin.edu.hk/~S121429/SIFpiano/index.html">web</a> (demo play)<br>
1c. <a href="Android/">android</a> (Nothing released yet)<br>
1d. iOS<br>
1e. <a href="https://scratch.mit.edu/studios/2986030">Scratch</a> (with cloud highscore)<br>
1f. ...<br>
2. Controller<br>
2a. Keyboard<br>
2b. Arduino<br>
2c. Touch screen (I don't have one)<br>
2d. Graphics Tablet (I also don't have one)<br>
2e. ...<br>
3. Converter (from)<br>
3a. osu<br>
3b. midi<br>
3c. processed json<br>
3d. raw json<br>
3e. other games or video<br>
3f. ...<br>
4. Converter (to)<br>
4a. Scratch<br>
4b. to processed json<br>
4c. to osu!mania
4d. ...<br>

Program related readme.txt:
-----------------------------------------------------
LLSIF Simulator 2.1.0.1 (User version Beta) by TWY
-----------------------------------------------------
How To Use:
-----------------------------------------------------
1. (Optional) Select the language.<br>
2. Select a beatmap by either opening a file or fetching data from Card Explorer.<br>
3. Select the offset time for judgement and graphics.<br>
4. Select whether auto play mode is on or off, also for all miss mode.<br>
5. Click Confirm button.<br>
6. (Optional) If auto play is off, you need to play by yourself. You can either control by mouse(/touch screen/drawing tablet) or keyboard.<br>
6a. For mouse, just click on the screen to play. (However, you cannot solve pairs of parallel notes)<br>
6b. For keyboard, use the key A,S,D,F,G,H,J,K,L to represent the 9 tap zones from left to right. (However, you cannot play beatmaps with more than 9 tap zones)<br>
7. After the song has finished, click on the screen or the X at the top-right corner to exit.

Update Log:
-----------------------------------------------------
-v2.1.0.1<br>
-- Card Explorer -> https://c.dash.moe/ only<br>
<br>
-v2.1.0.0<br>
-- Can fetch beatmap data from the card explorer.<br>
--- That means you can play the most updated beatmaps!<br>
<br>
-v2.0.0.1<br>
--Language Available:<br>
--- Traditional Chinese<br>
--- Simplified Chinese<br>
--- English<br>
--- Japanese<br>
<br>
-v2.0.0.0<br>
-- Basic Feature Included:<br>
--- Read .sif files (Not provided now)<br>
--- Read .osu files (Basic/Taiko/Mania)<br>
-- Language: English Only<br>

Others:
-----------------------------------------------------
Feel free to give suggestion to the translation.<br>
https://goo.gl/forms/aNxHNCtdgSskFfFM2<br>
To use this application, .NET Framework is requuired.
Please keep Interop.WMPLib.dll and AxInterop.WMPLib.dll in the same folder as the exe or else it cannot be exexcuted.

Related Links:
-----------------------------------------------------
Card Explorer: https://c.dash.moe/<br>
osu!: http://osu.ppy.sh/

Executable Download Links (exe v2.1.0.1):
-----------------------------------------------------
Baidu yun: https://pan.baidu.com/s/1dEVpDfV<br>
Dropbox: https://www.dropbox.com/sh/78r5hdki8apdfgg/AACqatEhWtTNeghWTlDAgQrJa?dl=0<br>
Github: https://github.com/wingyintang/LLSIF_simulator

Planning:
-----------------------------------------------------
1. At least 9 rows for a map (add gray button for unused circles) (Finished - Not released)<br>
2. Finish LL Practice Conversion. <br>
3. Finish yuyu's design beatmap. <br>
4. Add a private server for other beatmaps. <br>
5. Add an editor to create own beatmap. <br>
6. Directly process raw json file in the application.<br>
7. Provide current LLSIF events' score from different bots.<br>
8. Provide some prediction of events by different places.
9. Add more effect option for the beatmap. (Actually some have been made in the application, such as moving circles in https://www.youtube.com/watch?v=hFMHm_mBvt0)<br>
10. Add video functionality for the osu! beatmap. (Not so easy to get the address)<br>
11. Use color blend to create other color button other than red, green and light blue (Actually the grayscale base has been made).
12. Add the old random, new random, and purely random choice.

Something Else:
-----------------------------------------------------
The process of fetching data from the official database can be found in klab's github: https://github.com/KLab/PlaygroundOSS<br>
Here the processed beatmaps from card explorer is used.<br>
Card Explorer is a closed source developed and maintained by NijiharaTsubasa (tsubasa@dash.moe)(https://github.com/NijiharaTsubasa), who also makes a executable version of LLSIF, please do not ask the developer for the source code for fetching data.<br>
.sif is not the original files.<br>
This is originally for personal uses, therefore nobody is allowed to get profit from the code.
It seems that https://c.dash.moe/live has added some "神秘谱面 (Secret (beat)maps)" for LLSIF After School Activity's Challenge difficulties, including (1. 乙女式れんあい塾, 2. PSYCHIC FIRE, 3. ススメ→トゥモロウ, 4. LOVELESS WORLD) (Temporary links: https://c.dash.moe/static/somesecretlive("","2","3","4").html).

End
-----------------------------------------------------
Last Updated on 30/12/2016 17:14 UTC+8
