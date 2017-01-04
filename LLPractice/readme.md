#Here is the LLPractice Information (For Reference Only.)

Claim:
-
I do not own the file build.js, nor other files.<br>
I also do not own that website.

Detail:
-
The main page https://m.tianyi9.com/#/index<br>
The website for playing: https://m.tianyi9.com/NGLLP/?live_id=(live_id)<br>
Detail page: https://m.tianyi9.com/#/getlive?live_id=(live_id)<br>
You can see from the source that the icon is images/icons/llicon.png (https://m.tianyi9.com/images/icons/llicon.png)<br>
<img src="https://m.tianyi9.com/images/icons/llicon.png"><br>
There are two javascript files and two css stylesheets:<br>
https://m.tianyi9.com/(The following)<br>
styles/vender.213982bd.css<br>
styles/style.6e407618.css<br>
scripts/scripts.217cb370.js (Beautified version uploaded here)<br>
scripts/vendor.78ff4668.js (Beautified version uploaded here)<br>

Fetching:
-
https://m.tianyi9.com/API/getlive?live_id=(live_id)<br>
You'll get a content like this:<br>
{"content": {"bgimg_path": "[1]", "bgm_path": "[2]", "like_count": [3], "live_name": "[4]", "map_file": "[5]", "category": {"id": [6], "name": "[7]"}, "cover_path": "[8]", "state": "[9]", "bgm_file": "[10]", "update_time": "[11]", "live_info": "[12]", "memberonly": [13], "level": [14], "customize_path": [15], "bgimg_file": "[16]", "upload_user": {"username": "[17]", "avatar_path": "[18]", "id": [19], "post_count": [20]}, "click_count": [21], "artist": "[22]", "map_path": "[23]", "assets_path": [24], "live_setting": "[25]", "live_id": "[26]"}, "succeed": [27]}<br>
[1]: The background image of the beatmap: https://m.tianyi9.com/upload/(bgimg_path)<br>
[2]: The song of the beatmap: https://m.tianyi9.com/upload/(bgm_path)<br>
[3]: Like count: (like_count)<br>
[4]: Live Name: (live_name) (in unicode)<br>
[6]: The difficulty level: The index of difficulty from [EASY, NORMAL, HARD, EXTREME, TECHNICAL, ULTIMATE, 其他(OTHERS)]<br>
[7]: The difficulty name: The [6]th item of [EASY, NORMAL, HARD, EXTREME, TECHNICAL, ULTIMATE, 其他(OTHERS)]<br>
[8]: The cover of the beatmap: https://m.tianyi9.com/upload/(cover_path)<br>
[11]: The time of last update: (update_time) (In format: YYYY-MM-DDTHH:MM:SS)<br>
[13]: If the beatmap need login: (memberonly) (boolean)<br>
[17]: The username of the upload_user<br>
[18]: The path of the avatar of the upload_user: https://m.tianyi9.com/upload/(avatar_path)<br>
[20]: The number of post of the upload_user: (post_count)<br>
[22]: The artist of the song: (artist) (in unicode)<br>
[23]: The json file: https://m.tianyi9.com/upload/(map_path)<br>
[26]: (live_id) (Needless to say)<br>
[27]: If the fetch is successful. (succeed) (boolean)<br>
or Return just "Not found" if the live is not found.<br>
<b>Warning:</b>You cannot empty the field for (live_id) otherwise it will return a 502 error (Bad Gateway). Program should validate the field that it is not empty first.<br><br>
Json file: https://m.tianyi9.com/upload/(map_path(.json))<br>
Actually very easy to understand the code since it is not raw fson file.<br>
1. Be note that the field "lane" is from 0 to 8<br>
2. Be note that it is not ordered by time, but first order by lane, then by time.<br>
3. For "longnote":false, the starttime and endtime are the same.<br>
4. The units of starttime and endtime are ms (millisecond, 1/1000 second)<br>
5. Whether the note is parallel has been provided.<br>
6. Audiofile is actually referring to the live_id, not the audio filename.

The site:
-
COPYRIGHT 2015.BUILD WITH <b>Angular</b>& <b>Bootstrap</b>
