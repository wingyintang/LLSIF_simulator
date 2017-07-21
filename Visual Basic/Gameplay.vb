Imports System.IO
Imports WMPLib

Public Class Gameplay
    Dim w As Integer = 960
    Dim h As Integer = w / 1.5

    Dim smilelist As Bitmap() = {My.Resources._49, My.Resources._50, My.Resources._51, My.Resources._52, My.Resources._53, My.Resources._54, My.Resources._55, My.Resources._56, My.Resources._57}
    Dim purelist As Bitmap() = {My.Resources._40, My.Resources._41, My.Resources._42, My.Resources._43, My.Resources._44, My.Resources._45, My.Resources._46, My.Resources._47, My.Resources._48}
    Dim coollist As Bitmap() = {My.Resources._31, My.Resources._32, My.Resources._33, My.Resources._34, My.Resources._35, My.Resources._36, My.Resources._37, My.Resources._38, My.Resources._39}
    Dim alllist As Bitmap() = {My.Resources._89, My.Resources._382, My.Resources._89, My.Resources._382, My.Resources._89, My.Resources._382, My.Resources._89, My.Resources._382, My.Resources._89}
    Dim elelist As Bitmap()
    Dim midiS As Boolean
    Dim prebg As New Bitmap(w, h, Imaging.PixelFormat.Format32bppPArgb)
    Dim postbg As New Bitmap(w, h, Imaging.PixelFormat.Format32bppPArgb)
    Dim fc As Bitmap = My.Resources.ef_329_000
    Dim su As Bitmap = My.Resources.ef_311_000
    Dim header As Bitmap = My.Resources.live_header
    Dim baseimage As New Bitmap(w, h, Imaging.PixelFormat.Format32bppPArgb)
    Dim pauses As Bitmap = My.Resources.live_pause
    Dim resultperfect As Bitmap = My.Resources.l_etc_11
    Dim resultgreat As Bitmap = My.Resources.l_etc_12
    Dim resultgood As Bitmap = My.Resources.l_etc_13
    Dim resultbad As Bitmap = My.Resources.l_etc_14
    Dim resultmiss As Bitmap = My.Resources.l_etc_15
    Dim resultnr As Bitmap = My.Resources.l_etc_07
    Dim resultcombo As Bitmap = My.Resources.l_etc_08
    Dim resultscore As Bitmap = My.Resources.l_etc_09
    Dim resulths As Bitmap = My.Resources.l_etc_10
    Dim lifeback As Bitmap = My.Resources.live_gauge_02_01
    Dim statback As Bitmap = My.Resources.live_gauge_03_02
    Dim ab As Bitmap
    Dim livepict As Bitmap
    Dim parallel As Bitmap = My.Resources.ef_315_timing_1
    Dim gaugemask As Bitmap = My.Resources.l_gauge_17
    Dim star As Bitmap = My.Resources.ef_315_effect_0004
    Dim bg As New Bitmap(w, h, Imaging.PixelFormat.Format32bppPArgb)
    Dim nums As Bitmap() = {My.Resources.l_num_10, My.Resources.l_num_11, My.Resources.l_num_12, My.Resources.l_num_13, My.Resources.l_num_14, My.Resources.l_num_15, My.Resources.l_num_16, My.Resources.l_num_17, My.Resources.l_num_18, My.Resources.l_num_19}
    Dim numa As Bitmap() = {My.Resources.l_num_21, My.Resources.l_num_22, My.Resources.l_num_23, My.Resources.l_num_24, My.Resources.l_num_25, My.Resources.l_num_26, My.Resources.l_num_27, My.Resources.l_num_28, My.Resources.l_num_29, My.Resources.l_num_30}
    Dim numl As Bitmap() = {My.Resources.live_num_0, My.Resources.live_num_1, My.Resources.live_num_2, My.Resources.live_num_3, My.Resources.live_num_4, My.Resources.live_num_5, My.Resources.live_num_6, My.Resources.live_num_7, My.Resources.live_num_8, My.Resources.live_num_9}
    Dim notes As Bitmap() = {My.Resources.ef_315_notes_0002, My.Resources.ef_315_notes_0001, My.Resources.ef_315_notes_0003, My.Resources.ef_315_notes_0004}
    Dim resultnum As Bitmap() = {My.Resources._0, My.Resources._1, My.Resources._2, My.Resources._3, My.Resources._4, My.Resources._5, My.Resources._6, My.Resources._7, My.Resources._8, My.Resources._9}
    Dim ComboText() As Bitmap = {My.Resources.ef_313_004, My.Resources.ef_313_003, My.Resources.ef_313_002, My.Resources.ef_313_001, My.Resources.ef_313_000}
    Dim bgs As Bitmap() = {My.Resources.b_liveback_001, My.Resources.b_liveback_002, My.Resources.b_liveback_003, My.Resources.b_liveback_004, My.Resources.b_liveback_005, My.Resources.b_liveback_006, My.Resources.b_liveback_007, My.Resources.b_liveback_008, My.Resources.b_liveback_009, My.Resources.b_liveback_010, My.Resources.b_liveback_011, My.Resources.b_liveback_012}
    Dim bigrank() As Bitmap = {My.Resources.ef_322_000, My.Resources.ef_323_000, My.Resources.ef_324_000, My.Resources.ef_325_000, Nothing}
    Dim smallrank() As Bitmap = {My.Resources.l_etc_16, My.Resources.l_etc_17, My.Resources.l_etc_18, My.Resources.l_etc_19, Nothing}
    Dim plus As Bitmap = My.Resources.l_num_31
    Dim lives As Bitmap() = {My.Resources.live_gauge_02_06, My.Resources.live_gauge_02_05, My.Resources.live_gauge_02_04, My.Resources.live_gauge_02_03, My.Resources.live_gauge_02_02}
    Dim postbase As Bitmap = My.Resources.Post
    Dim mus As Bitmap = My.Resources.mus
    Dim sliderend As Bitmap = My.Resources.ef_326_002
    Dim objcount As Integer
    Dim menu1 As Bitmap = My.Resources.l_win_08
    Dim menu2 As Bitmap = My.Resources.l_win_07
    Dim scoremask As Bitmap = My.Resources.l_etc_46
    Dim liveclear As Bitmap = My.Resources.ef_330_000_1
    Dim livegauge As Bitmap() = {My.Resources.live_gauge_03_03, My.Resources.live_gauge_03_04, My.Resources.live_gauge_03_05, My.Resources.live_gauge_03_06, My.Resources.live_gauge_03_07}
    Dim combo0() As Bitmap = {My.Resources.ef_301_000, My.Resources.ef_301_001, My.Resources.ef_301_002, My.Resources.ef_301_003, My.Resources.ef_301_004, My.Resources.ef_301_005, My.Resources.ef_301_006, My.Resources.ef_301_007, My.Resources.ef_301_008, My.Resources.ef_301_009}
    Dim combo50() As Bitmap = {My.Resources.ef_301_010, My.Resources.ef_301_011, My.Resources.ef_301_012, My.Resources.ef_301_013, My.Resources.ef_301_014, My.Resources.ef_301_015, My.Resources.ef_301_016, My.Resources.ef_301_017, My.Resources.ef_301_018, My.Resources.ef_301_019}
    Dim combo100() As Bitmap = {My.Resources.ef_301_020, My.Resources.ef_301_021, My.Resources.ef_301_022, My.Resources.ef_301_023, My.Resources.ef_301_024, My.Resources.ef_301_025, My.Resources.ef_301_026, My.Resources.ef_301_027, My.Resources.ef_301_028, My.Resources.ef_301_029}
    Dim combo200() As Bitmap = {My.Resources.ef_301_030, My.Resources.ef_301_031, My.Resources.ef_301_032, My.Resources.ef_301_033, My.Resources.ef_301_034, My.Resources.ef_301_035, My.Resources.ef_301_036, My.Resources.ef_301_037, My.Resources.ef_301_038, My.Resources.ef_301_039}
    Dim combo300() As Bitmap = {My.Resources.ef_301_040, My.Resources.ef_301_041, My.Resources.ef_301_042, My.Resources.ef_301_043, My.Resources.ef_301_044, My.Resources.ef_301_045, My.Resources.ef_301_046, My.Resources.ef_301_047, My.Resources.ef_301_048, My.Resources.ef_301_049}
    Dim combo400() As Bitmap = {My.Resources.ef_301_050, My.Resources.ef_301_051, My.Resources.ef_301_052, My.Resources.ef_301_053, My.Resources.ef_301_054, My.Resources.ef_301_055, My.Resources.ef_301_056, My.Resources.ef_301_057, My.Resources.ef_301_058, My.Resources.ef_301_059}
    Dim combo500() As Bitmap = {My.Resources.ef_301_060, My.Resources.ef_301_061, My.Resources.ef_301_062, My.Resources.ef_301_063, My.Resources.ef_301_064, My.Resources.ef_301_065, My.Resources.ef_301_066, My.Resources.ef_301_067, My.Resources.ef_301_068, My.Resources.ef_301_069}
    Dim combo600() As Bitmap = {My.Resources.ef_301_070, My.Resources.ef_301_071, My.Resources.ef_301_072, My.Resources.ef_301_073, My.Resources.ef_301_074, My.Resources.ef_301_075, My.Resources.ef_301_076, My.Resources.ef_301_077, My.Resources.ef_301_078, My.Resources.ef_301_079}
    Dim combo1000() As Bitmap = {My.Resources.ef_301_080, My.Resources.ef_301_081, My.Resources.ef_301_082, My.Resources.ef_301_083, My.Resources.ef_301_084, My.Resources.ef_301_085, My.Resources.ef_301_086, My.Resources.ef_301_087, My.Resources.ef_301_088, My.Resources.ef_301_089}
    Dim combolist()() As Bitmap = {combo0, combo50, combo100, combo200, combo300, combo400, combo500, combo600, combo1000}
    Dim combott() As Bitmap = {My.Resources.ef_301_090, My.Resources.ef_302_001, My.Resources.ef_303_001, My.Resources.ef_304_001, My.Resources.ef_335_001, My.Resources.ef_336_001, My.Resources.ef_337_001, My.Resources.ef_338_001, My.Resources.ef_342_001}
    Dim auto As Boolean = Offset.Autoplay.Checked
    Dim allmiss As Boolean = Offset.Allmiss.Checked
    Dim ends As Boolean = False
    Dim play As Boolean = True
    Dim keystate() As Boolean
    Dim fcdeter As Boolean = False
    Dim leavezero As Boolean = False
    Dim starttime As Date
    Dim degpos() As Double
    Dim playerspeed As Double = Offset.playerspeed
    Dim multiplier() As Double = {1, 0.88, 0.8, 0.4, 0}
    Dim timer2tick As Integer = 0
    Dim timer3tick As Integer = 0
    Dim numb As Integer
    Dim combob As Integer = 0
    Dim numbx() As Integer
    Dim numby() As Integer
    Dim maxcombo As Integer = 0
    Dim counts As Integer = 0
    Dim fullHP As Integer = 999
    Dim HP As Integer = fullHP
    Dim joffset As Integer = Offset.joffset
    Dim goffset As Integer = Offset.goffset
    Dim Accuracy() As Integer = {16, 40, 64, 112, 128} 'From llsiftw
    'Dim Accuracy() As Integer = {33.59375, 70.3125, 112.5, 156.25, 781.25} 'From LLpractice
    'Dim Accuracy() As Integer = {50, 100, 167, 200, 467} 'From LLpractice
    Dim combomulti() As Integer = {1, 51, 51, 101, 201, 401, 601, 801}
    Dim combo() As Integer = {0, 0, 0, 0, 0}
    Dim complete As Integer = -1
    Dim cdraw As Integer = -1 'Anything to draw?
    Dim cdraw2 As Integer = -1 'Anything to draw?
    Public timenow As Integer = 0
    Dim timeout As Integer 'Still need to draw?
    Dim timeout2 As Integer 'Still need to draw?
    Dim sent As Integer = 0
    Dim score As Integer = 0
    Dim lefttextsize As SizeF
    Dim righttextsize As SizeF
    Dim perfectplayer As New Media.SoundPlayer With {.Stream = My.Resources.SE_306}
    Dim greatplayer As New Media.SoundPlayer With {.Stream = My.Resources.SE_307}
    Dim goodplayer As New Media.SoundPlayer With {.Stream = My.Resources.SE_308}
    Dim badplayer As New Media.SoundPlayer With {.Stream = My.Resources.SE_309}
    Dim missplayer As New Media.SoundPlayer With {.Stream = My.Resources.SE_326}
    Dim fcplayer As New Media.SoundPlayer With {.Stream = My.Resources.live_fullcombo_audio0}
    Dim videoplayer As New Overlaying_video
    Public mysong As Song
    Dim Player As WindowsMediaPlayer = New WindowsMediaPlayer
    Private Sub refreshtime()
        If mysong.hasaudio Then
            If Not leavezero Then
                timenow = CInt(Math.Floor(Player.controls.currentPosition * 1000) + goffset * playerspeed)
                If timenow - goffset > 0 Then
                    leavezero = True
                    starttime = Now.AddMilliseconds((-timenow + goffset) / playerspeed)
                End If
            Else
                Dim timenow2 As Integer = CInt(Math.Floor(Player.controls.currentPosition * 1000) + goffset * playerspeed)
                Dim timenow3 As Integer = CInt(((Now - starttime).TotalMilliseconds + goffset) * playerspeed)
                Debug.Print(timenow2 & " " & timenow3 & " " & timenow)
                If timenow2 > timenow Then
                    timenow = timenow2
                Else
                    timenow = timenow3
                End If
            End If
        End If
    End Sub
    Private Function ComboMultiplier(c As Integer) As Double
        Dim p = -1
        For i = 0 To combomulti.Length - 1
            If c >= combomulti(i) Then
                p += 1
            End If
        Next
        Return 1 + 0.05 * p
    End Function
    Private Sub addscore(a As Integer)
        score += a
        timeout2 = timenow + 200
        cdraw2 = a
    End Sub
    Private Function KeyDowns(a As Integer) As Boolean
        If Not keystate(a - 1) Then
            'debug.print("Down:" & a.ToString)
            keystate(a - 1) = True
            Dim found As Boolean = False
            For i = 0 To mysong.Hit_Object.Length - 1
                If Not found And Not mysong.Hit_Object(i).processed1 Then
                    If Math.Abs((timenow + joffset) - mysong.Hit_Object(i).time) < Accuracy(3) * mysong.Speed Then 'start decide
                        If mysong.Hit_Object(i).locationsif = a Then
                            Select Case Math.Abs((timenow + joffset) - mysong.Hit_Object(i).time)
                                Case 0 To CInt(Accuracy(0) * mysong.Speed) 'Perfect
                                    If mysong.Hit_Object(i).type = 1 Or mysong.Hit_Object(i).type = 3 Then
                                        combo(0) += 1
                                        combob += 1
                                        If combob > maxcombo Then
                                            maxcombo = combob
                                        End If
                                    End If
                                    cdraw = 0
                                    mysong.Hit_Object(i).c1 = 0
                                    timeout = timenow + 200
                                    If Not midiS Then
                                        perfectplayer.Play()
                                    End If
                                Case CInt(Accuracy(0) * mysong.Speed) To CInt(Accuracy(1) * mysong.Speed) 'Great
                                    If mysong.Hit_Object(i).type = 1 Or mysong.Hit_Object(i).type = 3 Then
                                        combo(1) += 1
                                        combob += 1
                                        If combob > maxcombo Then
                                            maxcombo = combob
                                        End If
                                    End If
                                    cdraw = 1
                                    mysong.Hit_Object(i).c1 = 1
                                    timeout = timenow + 200
                                    If Not midiS Then
                                        greatplayer.Play()
                                    End If
                                Case CInt(Accuracy(1) * mysong.Speed) To CInt(Accuracy(2) * mysong.Speed) 'Good
                                    If mysong.Hit_Object(i).type = 1 Or mysong.Hit_Object(i).type = 3 Then
                                        combo(2) += 1
                                    End If
                                    cdraw = 2
                                    combob = 0
                                    mysong.Hit_Object(i).c1 = 2
                                    timeout = timenow + 200
                                    If mysong.Hit_Object(i).star Then
                                        HP = Math.Max(0, HP - 2)
                                    Else
                                        HP = Math.Max(0, HP - 0)
                                    End If
                                    If Not midiS Then
                                        goodplayer.Play()
                                    End If
                                Case CInt(Accuracy(2) * mysong.Speed) To CInt(Accuracy(3) * mysong.Speed) 'Bad
                                    If mysong.Hit_Object(i).type = 1 Or mysong.Hit_Object(i).type = 3 Then
                                        combo(3) += 1
                                    End If
                                    cdraw = 3
                                    combob = 0
                                    mysong.Hit_Object(i).c1 = 3
                                    timeout = timenow + 200
                                    If mysong.Hit_Object(i).star Then
                                        HP = Math.Max(0, HP - 2)
                                    Else
                                        HP = Math.Max(0, HP - 1)
                                    End If
                                    If Not midiS Then
                                        badplayer.Play()
                                    End If
                            End Select
                            'My.Computer.Audio.Play(p, AudioPlayMode.Background)
                            mysong.Hit_Object(i).processed1 = True
                            If mysong.Hit_Object(i).type = 1 Or mysong.Hit_Object(i).type = 3 Then
                                mysong.Hit_Object(i).processed2 = True
                                addscore(CInt(Math.Floor(50000 * 0.0125 * multiplier(mysong.Hit_Object(i).c1) * ComboMultiplier(combob) * 1 * 1.1 * 1.1)))
                                sent += 1
                            End If
                            found = True
                        End If
                    End If
                End If
            Next
            Return found
        Else
            Return False
        End If
    End Function
    Private Function KeyUps(a As Integer) As Boolean
        If keystate(a - 1) Then
            'debug.print("Up:" & a.ToString)
            keystate(a - 1) = False
            Dim found As Boolean = False
            For i = 0 To mysong.Hit_Object.Length - 1
                If Not found And Not mysong.Hit_Object(i).processed2 And mysong.Hit_Object(i).type = 2 Then
                    If mysong.Hit_Object(i).processed1 And ((timenow + joffset) - mysong.Hit_Object(i).endtime) < Accuracy(3) * mysong.Speed Then 'start decide
                        If mysong.Hit_Object(i).locationsif = a Then
                            'debug.print(((timenow + joffset) - mysong.Hit_Object(i).endtime).ToString)
                            Select Case Math.Abs((timenow + joffset) - mysong.Hit_Object(i).endtime)
                                Case 0 To CInt(Accuracy(0) * mysong.Speed) 'Perfect
                                    combo(Math.Max(0, mysong.Hit_Object(i).c1)) += 1
                                    cdraw = 0
                                    combob += 1
                                    If combob > maxcombo Then
                                        maxcombo = combob
                                    End If
                                    mysong.Hit_Object(i).c2 = 0
                                    timeout = timenow + 200
                                    If Not midiS Then
                                        perfectplayer.Play()
                                    End If
                                Case CInt(Accuracy(0) * mysong.Speed) To CInt(Accuracy(1) * mysong.Speed) 'Great
                                    combo(Math.Max(1, mysong.Hit_Object(i).c1)) += 1
                                    cdraw = 1
                                    combob += 1
                                    If combob > maxcombo Then
                                        maxcombo = combob
                                    End If
                                    mysong.Hit_Object(i).c2 = 1
                                    timeout = timenow + 200
                                    If Not midiS Then
                                        greatplayer.Play()
                                    End If
                                Case CInt(Accuracy(1) * mysong.Speed) To CInt(Accuracy(2) * mysong.Speed) 'Good
                                    combo(Math.Max(2, mysong.Hit_Object(i).c1)) += 1
                                    cdraw = 2
                                    combob = 0
                                    mysong.Hit_Object(i).c2 = 2
                                    timeout = timenow + 200
                                    If mysong.Hit_Object(i).star Then
                                        HP = Math.Max(0, HP - 2)
                                    Else
                                        HP = Math.Max(0, HP - 0)
                                    End If
                                    If Not midiS Then
                                        goodplayer.Play()
                                    End If
                                Case CInt(Accuracy(2) * mysong.Speed) To CInt(Accuracy(3) * mysong.Speed) 'Bad
                                    combo(Math.Max(3, mysong.Hit_Object(i).c1)) += 1
                                    cdraw = 3
                                    combob = 0
                                    mysong.Hit_Object(i).c2 = 3
                                    timeout = timenow + 200
                                    If mysong.Hit_Object(i).star Then
                                        HP = Math.Max(0, HP - 2)
                                    Else
                                        HP = Math.Max(0, HP - 1)
                                    End If
                                    If Not midiS Then
                                        badplayer.Play()
                                    End If
                            End Select
                            mysong.Hit_Object(i).processed2 = True
                            addscore(CInt(Math.Floor(50000 * 0.0125 * multiplier(mysong.Hit_Object(i).c1) * multiplier(mysong.Hit_Object(i).c2) * ComboMultiplier(combob) * 1.25 * 1.1 * 1.1)))
                            sent += 1
                            found = True
                        End If
                    End If
                End If
            Next
            Return found
        Else
            Return False
        End If
    End Function
    Public Sub DrawDes(ByVal i As Integer, t As Integer)
        Using g As Graphics = Graphics.FromImage(bg)
            If i <> -1 Then
                Dim siz As New Size(CInt(ComboText(i).Width * 0.025 * h * ((t + 1000) / 1200) / 11), CInt(ComboText(i).Height * 0.025 * h * ((t + 1000) / 1200) / 11))
                g.DrawImage(ComboText(i), New Rectangle(New Point(CInt(w / 2 - siz.Width / 2), CInt(0.502 * h - siz.Height / 2)), siz))
            End If
            g.Dispose()
        End Using
    End Sub
    Public Sub DrawObject(ByRef o As HitObject, t As Integer, d As Double, n As Integer)
        Using g As Graphics = Graphics.FromImage(bg)
            Dim buffers As Double
            buffers = 1750 - 125 * o.ApproachRate
            If o.time - t < buffers Then 'appear
                Dim note As Integer
                Select Case o.Element
                    Case "Smile"
                        note = 0
                    Case "Pure"
                        note = 1
                    Case "Cool"
                        note = 2
                    Case Else
                        note = 3
                End Select
                Select Case o.type
                    Case 1 'Circle
                        If t - o.time < 1120 * mysong.Speed And Not o.processed1 Then 'Not yet disappear
                            If o.time - (t + joffset) <= 0 And Not o.processed1 And auto And Not allmiss Then
                                KeyDowns(o.locationsif)
                                KeyUps(o.locationsif)
                            End If
                            'draw
                            Dim ratio As Double = (buffers - o.time + t) / (buffers)
                            Dim siz As Integer = CInt((1.75 * h / n) * ratio) * If(o.large, 1.5, 1)
                            Dim loc As Point = New Point(CInt(numbx((o.locationsif - 1) Mod numb) * ratio + 0.75 * h - siz / 2), CInt(0.25 * h - numby((o.locationsif - 1) Mod numb) * ratio - siz / 2))
                            g.DrawImage(notes(note), New Rectangle(loc, New Size(siz, siz)))
                            If o.parallel Then
                                g.DrawImage(parallel, New Rectangle(loc, New Size(siz, siz)))
                            End If
                            If o.star Then
                                g.DrawImage(star, New Rectangle(loc, New Size(siz, siz)))
                            End If
                            'g.FillEllipse(Brushes.Red, New Rectangle(loc, New Size(siz, siz)))
                        Else
                            If Not o.processed1 Then
                                o.processed1 = True
                                o.processed2 = True
                                combo(4) += 1
                                sent += 1
                                cdraw = 4
                                timeout = timenow + 200
                                combob = 0
                                If o.star Then
                                    HP = Math.Max(0, HP - 4)
                                Else
                                    HP = Math.Max(0, HP - 2)
                                End If
                            End If
                        End If
                    Case 2 'Slider
                        If t - o.endtime < 1120 * mysong.Speed Then 'Not yet disappear
                            If o.time - (t + joffset) <= 0 And Not o.processed1 And auto And Not allmiss Then
                                KeyDowns(o.locationsif)
                            End If
                            'draw
                            If t - o.time > 1120 * mysong.Speed And Not o.processed1 Then
                                o.processed1 = True
                                o.processed2 = True
                                sent += 1
                                combo(4) += 1
                                cdraw = 4
                                timeout = timenow + 200
                                combob = 0
                                If o.star Then
                                    HP = Math.Max(0, HP - 4)
                                Else
                                    HP = Math.Max(0, HP - 2)
                                End If
                            End If
                            Dim ratio As Double
                            If Not o.processed1 Then
                                ratio = (buffers - o.time + t) / (buffers)
                            Else
                                ratio = 1
                            End If
                            Dim ratioend As Double = 0
                            If o.processed1 And Not o.processed2 Then
                                If o.endtime - (t + joffset) < buffers Then 'endpt appear
                                    If o.endtime - (t + joffset) <= 0 And Not o.processed2 And auto And Not allmiss Then
                                        KeyUps(o.locationsif)
                                    End If
                                End If
                            End If
                            If o.endtime - t < buffers Then 'endpt appear
                                ratioend = (buffers - o.endtime + t) / (buffers)
                            End If
                            If Not o.processed2 Then
                                Dim dist = 0.625 * h - 0.01225 * h / (numb / 10) ^ 2
                                Dim deg As Double = degpos(o.locationsif - 1)
                                Dim doff As Double = Math.Asin(24 * (0.875 * w / (1.5 * numb)) / (10 * w))
                                Dim pointlist() As Point = {New Point(CInt(w / 2 + dist * ratio * Math.Cos(deg + doff)), CInt(h / 4 - dist * ratio * Math.Sin(deg + doff))),
                                                            New Point(CInt(w / 2 + dist * ratio * Math.Cos(deg - doff)), CInt(h / 4 - dist * ratio * Math.Sin(deg - doff))),
                                                            New Point(CInt(w / 2 + dist * ratioend * Math.Cos(deg - doff)), CInt(h / 4 - dist * ratioend * Math.Sin(deg - doff))),
                                                            New Point(CInt(w / 2 + dist * ratioend * Math.Cos(deg + doff)), CInt(h / 4 - dist * ratioend * Math.Sin(deg + doff)))}
                                Dim col As Color = Color.FromArgb(128, 255, 255, 255)
                                If o.processed1 Then
                                    col = Color.FromArgb(128, 255, 255, 180)
                                End If
                                g.FillPolygon(New SolidBrush(col), pointlist)
                            End If
                            If Not o.processed1 Then
                                Dim siz As Integer = CInt((1.75 * h / n) * ratio) * If(o.large, 1.5, 1)
                                Dim startpt As New Point(CInt(numbx((o.locationsif - 1) Mod numb) * ratio + 0.75 * h), CInt(0.25 * h - numby((o.locationsif - 1) Mod numb) * ratio))
                                Dim loc As Point = startpt - New Size(CInt(siz / 2), CInt(siz / 2))
                                If o.parallel Then
                                    g.DrawImage(parallel, New Rectangle(loc, New Size(siz, siz)))
                                End If
                                If o.star Then
                                    g.DrawImage(star, New Rectangle(loc, New Size(siz, siz)))
                                End If
                                g.DrawImage(notes(note), New Rectangle(loc, New Size(siz, siz)))
                            Else
                                Dim siz As Integer = CInt((1.75 * h / n)) * If(o.large, 1.5, 1)
                                Dim startpt As New Point(CInt(numbx((o.locationsif - 1) Mod numb) + 0.75 * h), CInt(0.25 * h - numby((o.locationsif - 1) Mod numb)))
                                Dim loc As Point = startpt - New Size(CInt(siz / 2), CInt(siz / 2))
                                g.DrawImage(notes(note), New Rectangle(loc, New Size(siz, siz)))
                            End If
                            If o.endtime - t < buffers And Not o.processed2 Then 'endpt appear
                                Dim sizend As Integer = CInt((1.75 * h / n) * ratioend) * If(o.large, 1.5, 1)
                                Dim linkpt As Point = New Point(CInt(numbx((o.locationsif - 1) Mod numb) * ratioend + 0.75 * h), CInt(0.25 * h - numby((o.locationsif - 1) Mod numb) * ratioend))
                                Dim endpt As Point = linkpt - New Size(CInt(sizend / 2), CInt(sizend / 2))
                                g.DrawImage(sliderend, New Rectangle(endpt, New Size(sizend, sizend)))
                            End If
                            'g.FillPolygon(Brushes.White, {})
                        Else
                            If o.processed1 And Not o.processed2 Then
                                o.processed2 = True
                                sent += 1
                                combo(4) += 1
                                cdraw = 4
                                timeout = timenow + 200
                                combob = 0
                                If o.star Then
                                    HP = Math.Max(0, HP - 4)
                                Else
                                    HP = Math.Max(0, HP - 2)
                                End If
                            End If
                        End If
                    Case 3 'Moving Circle
                        If t - o.time < 1120 * mysong.Speed And Not o.processed1 Then 'Not yet disappear
                            If o.time - (t + joffset) <= 0 And Not o.processed1 And auto And Not allmiss Then
                                KeyDowns(o.locationsif)
                                KeyUps(o.locationsif)
                            End If
                            'draw
                            Dim ratio As Double = (buffers - o.time + t) / (buffers)
                            Dim siz As Integer = CInt((1.75 * h / n) * ratio) * If(o.large, 1.5, 1)
                            Dim locsifrad As Double = DegToRad(o.locationsif2)
                            'Dim loc As Point = New Point(CInt(numbx((o.locationsif - 1) Mod numb) * ratio + 0.75 * h - siz / 2), CInt(0.25 * h - numby((o.locationsif - 1) Mod numb) * ratio - siz / 2))
                            Dim deg As Double = locsifrad + (degpos((o.locationsif - 1) Mod numb) - locsifrad) * ratio
                            Dim numbxt As Double = CInt(0.625 * h * Math.Cos(deg))
                            Dim numbyt As Double = CInt(0.625 * h * Math.Sin(deg))
                            Dim loc As Point = New Point(CInt(numbxt * ratio + 0.75 * h - siz / 2), CInt(0.25 * h - numbyt * ratio - siz / 2))
                            g.DrawImage(notes(note), New Rectangle(loc, New Size(siz, siz)))
                            If o.parallel Then
                                g.DrawImage(parallel, New Rectangle(loc, New Size(siz, siz)))
                            End If
                            If o.star Then
                                g.DrawImage(star, New Rectangle(loc, New Size(siz, siz)))
                            End If
                            'g.FillEllipse(Brushes.Red, New Rectangle(loc, New Size(siz, siz)))
                        Else
                            If Not o.processed1 Then
                                o.processed1 = True
                                o.processed2 = True
                                combo(4) += 1
                                sent += 1
                                cdraw = 4
                                timeout = timenow + 200
                                combob = 0
                                If o.star Then
                                    HP = Math.Max(0, HP - 4)
                                Else
                                    HP = Math.Max(0, HP - 2)
                                End If
                            End If
                        End If
                End Select
            End If
            g.Dispose()
        End Using
    End Sub
    Private Sub createbase()
        'baseimage = New Bitmap(w, h, Imaging.PixelFormat.Format32bppPArgb)
        Using big As Graphics = Graphics.FromImage(baseimage)
            'g.FillRectangle(New SolidBrush(Color.Gray), New Rectangle(New Point(0, 0), New Size(3000, 150)))
            'g.FillPolygon(New SolidBrush(Color.Gray), {New Point(3125 / 3, 150), New Point(5875 / 3, 150), New Point(16600 / 9, 300), New Point(10400 / 9, 300)})
            For i As Integer = 1 To numb
                'g.FillEllipse(New SolidBrush(Color.White), New Rectangle(New Point(1250 * Math.Cos(d) + 1500 - 1750 / numb, 500 - 1250 * Math.Sin(d) - 1750 / numb), New Size(3500 / numb, 3500 / numb)))
                'g.DrawEllipse(New Pen(Color.Red, 125 / numb), New Rectangle(New Point(1250 * Math.Cos(d) + 1500 - 1750 / numb, 500 - 1250 * Math.Sin(d) - 1750 / numb), New Size(3500 / numb, 3500 / numb)))
                big.DrawImage(elelist((i - 1) Mod elelist.Length), New Rectangle(New Point(CInt(numbx(i - 1) + w / 2 - 0.875 * h / numb), CInt(h / 4 - numby(i - 1) - 0.875 * h / numb)), New Size(CInt(1.75 * h / numb), CInt(1.75 * h / numb))))
                'Dim s As SizeF = g.MeasureString("ASDFGHJKL"(i - 1), New Font("Consolas", 200))
                'g.DrawString("ASDFGHJKL"(i - 1), New Font("Consolas", 200), Brushes.Black, New Point(1250 * Math.Cos(d) + 1500 - s.Width / 2, 500 - 1250 * Math.Sin(d) - s.Height / 2))
            Next
            big.Dispose()
        End Using
    End Sub
    Private Sub drawadd(ByVal s As Integer, t As Integer)
        Using g As Graphics = Graphics.FromImage(bg)
            Dim digit As Integer = Len(s.ToString)
            For i As Integer = 1 To digit + 1
                If i = digit + 1 Then
                    g.DrawImage(plus, New Rectangle(New Point(CInt(h * (0.92875 - 0.045 * t / 200) + (digit - i) * 0.27125 * h / 6), CInt(h * 0.09125)), New Size(CInt(0.27125 * h / 6), CInt(0.14 * h / 3))))
                Else
                    g.DrawImage(numa(CInt(s \ CLng(10 ^ (i - 1)) Mod 10)), New Rectangle(New Point(CInt(h * (0.92875 - 0.045 * t / 200) + (digit - i) * 0.27125 * h / 6), CInt(h * 0.09125)), New Size(CInt(0.27125 * h / 6), CInt(0.14 * h / 3))))
                End If
            Next
            If t > 150 Then
                g.DrawImage(gaugemask, New Rectangle(New Point(CInt(0.011 * h), CInt(0.018 * h)), New Size(CInt(1.37 * h), CInt(0.0505 * h))))
                g.DrawImage(scoremask, New Rectangle(New Point(CInt(0.5 * h), CInt(0.195625 * h / 3)), New Size(CInt(h / 2), CInt(0.2125 * h / 2))))
            End If
            g.Dispose()
        End Using
    End Sub
    Private Sub drawbase()
        Using g As Graphics = Graphics.FromImage(bg)
            If Not mysong.hasvideo Then
                g.DrawImage(livepict, New Rectangle(New Point(0, 0), New Size(w, h)))
            End If
            g.FillRectangle(New SolidBrush(Color.FromArgb(128, 0, 0, 0)), New Rectangle(New Point(0, 0), New Size(w, h)))
            'radius = 1250
            'button radius = 3500/9
            g.DrawImage(baseimage, New Point(0, 0))
            Dim img As Integer
            Dim w2 As Double
            Select Case score
                Case 0 To mysong.Grade(0) '45 to 500
                    img = 0
                    w2 = 45 + (500 - 45) * (score - 0) / (mysong.Grade(0) - 0)
                Case mysong.Grade(0) To mysong.Grade(1) '500 to 665
                    img = 1
                    w2 = 500 + (665 - 500) * (score - mysong.Grade(0)) / (mysong.Grade(1) - mysong.Grade(0))
                Case mysong.Grade(1) To mysong.Grade(2) '665 to 790
                    img = 2
                    w2 = 665 + (790 - 665) * (score - mysong.Grade(1)) / (mysong.Grade(2) - mysong.Grade(1))
                Case mysong.Grade(2) To mysong.Grade(3) '790 to 875
                    img = 3
                    w2 = 790 + (875 - 790) * (score - mysong.Grade(2)) / (mysong.Grade(3) - mysong.Grade(2))
                Case Else '875
                    img = 4
                    w2 = 875
            End Select
            Dim b2 As New Bitmap(880, 38, Imaging.PixelFormat.Format32bppPArgb)
            Using g2 As Graphics = Graphics.FromImage(b2)
                Dim b3 As New Bitmap(CInt(w2), 38, Imaging.PixelFormat.Format32bppPArgb)
                Using g3 As Graphics = Graphics.FromImage(b3)
                    Dim bl As New Bitmap(271, 29, Imaging.PixelFormat.Format32bppPArgb)
                    Using gl As Graphics = Graphics.FromImage(bl)
                        Dim bl2 As New Bitmap(37 + CInt(230 * HP / fullHP), 29, Imaging.PixelFormat.Format32bppPArgb)
                        Using gl2 As Graphics = Graphics.FromImage(bl2)
                            gl2.DrawImage(lives(CInt(Math.Min(4, Math.Floor(HP * 5 / fullHP)))), New Point(0, 0))
                            gl.DrawImage(lifeback, New Point(0, 0))
                            gl.DrawImage(bl2, New Point(0, 0))
                            g3.DrawImage(livegauge(img), New Point(0, 0))
                            g2.DrawImage(statback, New Point(0, 0))
                            g2.DrawImage(b3, New Point(0, 0))
                            g.DrawImage(b2, New Rectangle(New Point(CInt(0.011 * h), CInt(0.018 * h)), New Size(CInt(1.37 * h), CInt(0.0505 * h))))
                            g.DrawImage(bl, New Rectangle(New Point(CInt(0.022 * h), CInt(0.0935 * h)), New Size(CInt(0.423 * h), CInt(0.0455 * h))))
                            g2.Dispose()
                            g3.Dispose()
                            gl.Dispose()
                            gl2.Dispose()
                            b2.Dispose()
                            b3.Dispose()
                            bl.Dispose()
                            bl2.Dispose()
                            'img.Dispose()
                        End Using
                    End Using
                End Using
            End Using
            'width: 250 to 320 period: 2 sec
            'width: 250 to 310 period: 2 sec
            Dim wi, he As Integer
            wi = CInt(0.14 * h + 0.015 * h * Math.Cos(DegToRad((timenow Mod 2000) * 360 / 2000)))
            he = CInt(wi * 256 / 265)
            g.DrawImage(mus, New Rectangle(New Point(CInt(w / 2 - wi / 2), CInt(h / 4 - he / 2)), New Size(wi, he)))
            Dim digit As Integer = Len(score.ToString)
            For i = 1 To digit
                g.DrawImage(nums(CInt((score \ CLng(CLng(10 ^ (i - 1))) Mod 10))), New Rectangle(New Point(CInt(w / 2 - 0.007 * h + digit * 0.025 * h - i * 0.05 * h), CInt(0.259 * h / 3)), New Size(CInt(0.064 * h), CInt(0.064 * h))))
            Next
            Dim digitl As Integer = Len(HP.ToString)
            For i = 1 To digitl
                g.DrawImage(numl(CInt((HP \ CLng(CLng(10 ^ (i - 1))) Mod 10))), New Rectangle(New Point(CInt(0.53 * h - i * 0.026 * h), CInt(0.096 * h)), New Size(CInt(0.024 * h), CInt(0.036 * h))))
            Next
            Dim comboset As Integer
            Dim cs As Integer
            Select Case combob
                Case 0 To 49
                    comboset = 0
                Case 50 To 99
                    comboset = 1
                Case 100 To 199
                    comboset = 2
                Case 200 To 299
                    comboset = 3
                Case 300 To 399
                    comboset = 4
                    cs = 4
                Case 400 To 499
                    comboset = 5
                Case 500 To 599
                    comboset = 6
                Case 600 To 999
                    comboset = 7
                Case Else
                    comboset = 8
            End Select
            cs = comboset
            If combob > 0 Then
                Dim digit2 As Integer = Len(combob.ToString)
                For i = 1 To digit2
                    g.DrawImage(combolist(comboset)(CInt(combob \ CLng(10 ^ (i - 1)) Mod 10)), New Rectangle(New Point(CInt(w / 2 - i * h * 0.067 - 0.013 * h), CInt(0.3815 * h)), New Size(CInt(0.072 * h), CInt(0.072 * h))))
                Next
                g.DrawImage(combott(cs), New Rectangle(New Point(CInt(w / 2), CInt(0.3925 * h)), New Size(CInt(0.188 * h), CInt(0.05 * h))))
            End If
            'Combo num width=144 intersect = 10
            'Combo text width=376x100 space=26
            'combo Text : half Right
            g.Dispose()
        End Using
    End Sub
    Public Sub start()
        midiS = mysong.midiAudio
        objcount = mysong.objcount
        Me.mysong = mysong
        numb = mysong.Numrow
        Array.Resize(keystate, numb)
        For i = 0 To numb - 1
            keystate(i) = False
        Next
        Select Case mysong.Element
            Case "Smile"
                elelist = smilelist
            Case "Pure"
                elelist = purelist
            Case "Cool"
                elelist = coollist
            Case Else
                elelist = alllist
        End Select
        For i = 0 To mysong.Numrow - 1
            If mysong.Image(i) <> "" Then
                elelist(i) = New Bitmap(Directory.GetParent(mysong.Filename).FullName & "/" & mysong.Image(i))
            End If
        Next
        createpre(Directory.GetParent(mysong.Filename).FullName & "/" & mysong.ImageFilename)
        'createbase()
        baseimage = New Bitmap(w, h, Imaging.PixelFormat.Format32bppPArgb)
        Using big As Graphics = Graphics.FromImage(baseimage)
            big.DrawImage(header, New Rectangle(New Point(0, 0), New Size(w, CInt(h * 0.153125))))
            big.DrawImage(pauses, New Rectangle(New Point(CInt(0.955 * w), CInt(0.008 * h)), New Size(CInt(0.0575 * h), CInt(0.0575 * h))))
            If mysong.LeftText <> "" Then
                lefttextsize = big.MeasureString(mysong.LeftText, New Font("Consolas", CSng(w / 80)))
            End If
            If mysong.RightText <> "" Then
                righttextsize = big.MeasureString(mysong.RightText, New Font("Consolas", CSng(w / 80)))
            End If
        End Using
        If mysong.hasvideo Then
            videoplayer.URL = Directory.GetParent(mysong.Filename).FullName & "/" & mysong.VideoFilename
            videoplayer.Stop()
        End If
        If mysong.hasaudio Then
            Player.URL = Directory.GetParent(mysong.Filename).FullName & "/" & mysong.AudioFilename
            Player.settings.volume = 100
            Player.controls.stop()
        End If
        If allmiss Then
            fullHP = mysong.Hit_Object.Length * 2 + mysong.starcount * 2 + 1
        Else
            fullHP = 999
        End If
        HP = fullHP
        Array.Resize(degpos, numb)
        Array.Resize(numbx, numb)
        Array.Resize(numby, numb)
        For i = 1 To numb
            refreshdeg(i, CInt(180 + 180 * ((i - 1) Mod numb) / (numb - 1)))
        Next
        timer3tick = 0
        Me.BackgroundImage = prebg
        Timer3.Start()
    End Sub
    Private Sub refreshdeg(pos As Integer, deg As Integer)
        degpos(pos - 1) = DegToRad(deg)
        numbx(pos - 1) = CInt(0.625 * h * Math.Cos(degpos(pos - 1)))
        numby(pos - 1) = CInt(0.625 * h * Math.Sin(degpos(pos - 1)))
    End Sub
    Private Function DegToRad(c As Double) As Double
        Return c * Math.PI / 180
    End Function
    Private Sub createpre(img As String)
        ' prebg = New Bitmap(w, h, Imaging.PixelFormat.Format32bppPArgb)
        If mysong.Picture = "" Then
            livepict = bgs((mysong.Bgcode - 1) Mod 12)
        Else
            livepict = New Bitmap(Directory.GetParent(mysong.Filename).FullName & "/" & mysong.Picture)
            Using lpg As Graphics = Graphics.FromImage(livepict)
                lpg.FillRectangle(New SolidBrush(Color.FromArgb(128, 0, 0, 0)), New Rectangle(New Point(0, 0), New Size(960, 640)))
            End Using
        End If
        Using bgg As Graphics = Graphics.FromImage(prebg)
            bgg.DrawImage(livepict, New Rectangle(New Point(0, 0), New Size(w, h)))
            Try
                If Strings.Left(img, 4) = "http" Then
                    ab = New Bitmap(New MemoryStream((New System.Net.WebClient).DownloadData(img)))
                Else
                    ab = New Bitmap(img)
                End If
            Catch ex As Exception
                ab = New Bitmap(1250, 1250, Imaging.PixelFormat.Format32bppPArgb)
            End Try
            bgg.DrawImage(ab, New Rectangle(New Point(CInt(0.4375 * h), CInt(0.125 * h)), New Size(CInt(0.625 * h), CInt(0.625 * h))))
            Dim s1 As SizeF = bgg.MeasureString(mysong.Title, New Font("新細明體", CSng(h / 25)))
            bgg.DrawString(mysong.Title, New Font("新細明體", CSng(h / 25)), Brushes.White, New Point(CInt(w / 2 - s1.Width / 2), CInt(h * 5 / 6 - s1.Height / 2)))
            If mysong.People = "" Then
                Dim s2 As SizeF = bgg.MeasureString("作詞：" & mysong.Lyrics & "　作曲：" & mysong.Compose & "　編曲：" & mysong.Arrange, New Font("新細明體", CSng(h / 50)))
                bgg.DrawString("作詞：" & mysong.Lyrics & "　作曲：" & mysong.Compose & "　編曲：" & mysong.Arrange, New Font("新細明體", CSng(h / 50)), Brushes.White, New Point(CInt(w / 2 - s2.Width / 2), CInt(h * 8 / 9 - s2.Height / 2)))
                bgg.Dispose()
            Else
                Dim s2 As SizeF = bgg.MeasureString(mysong.People, New Font("新細明體", CSng(h / 50)))
                bgg.DrawString(mysong.People, New Font("新細明體", CSng(h / 50)), Brushes.White, New Point(CInt(w / 2 - s2.Width / 2), CInt(h * 8 / 9 - s2.Height / 2)))
                bgg.Dispose()
            End If
        End Using
    End Sub
    Private Sub Timer1_Tick(sender As Object, e As EventArgs) Handles Timer1.Tick
        refreshtime()
        bg = New Bitmap(w, h, Imaging.PixelFormat.Format32bppPArgb)
        createbase()
        drawbase()
        If timenow < timeout And cdraw <> -1 Then
            DrawDes(cdraw, timeout - timenow)
        Else
            timeout = 0
        End If
        If timenow < timeout2 And cdraw2 <> -1 Then
            drawadd(cdraw2, timeout2 - timenow)
        Else
            timeout2 = 0
        End If
        'Me.Text = sent.ToString
        For i = complete + 1 To mysong.Hit_Object.Length - 1
            If Not mysong.Hit_Object(i).processed2 Then
                DrawObject(mysong.Hit_Object(i), timenow, mysong.Speed, numb)
            ElseIf complete = i - 1 Then
                complete = i
            End If
        Next
        Using big As Graphics = Graphics.FromImage(baseimage)
            If mysong.LeftText <> "" Then
                big.DrawString(mysong.LeftText, New Font("Consolas", CSng(w / 80)), Brushes.White, New PointF(0, h - lefttextsize.Height))
            End If
            If mysong.RightText <> "" Then
                big.DrawString(mysong.RightText, New Font("Consolas", CSng(w / 80)), Brushes.White, New PointF(w - righttextsize.Width, h - righttextsize.Height))
            End If
            big.Dispose()
        End Using
        Me.BackgroundImage = bg
        counts += 1
        'Me.Text = complete.ToString
        Me.Text = counts / (Now - starttime).TotalSeconds & "FPS"
        'Me.Text = sent.ToString & " " & complete.ToString
        If sent = objcount And Not Timer2.Enabled Then
            Timer2.Start()
            timer2tick = 0
        End If
    End Sub
    Private Sub Timer2_Tick(sender As Object, e As EventArgs) Handles Timer2.Tick
        videoplayer.Hide()
        If timer2tick < 6 Then
            timer2tick += 1
            If timer2tick > 2 And timer2tick < 4 And Not fcdeter Then
                If mysong.hasaudio Then
                    Player.controls.stop()
                End If
                If mysong.hasvideo Then
                End If
                Timer1.Stop()
                If combo(0) + combo(1) = objcount Then
                    'Full Combo
                    fcplayer.Play()
                    bg = New Bitmap(w, h, Imaging.PixelFormat.Format32bppPArgb)
                    drawbase()
                    Using g As Graphics = Graphics.FromImage(bg)
                        g.DrawImage(fc, New Rectangle(New Point(CInt(0.39 * h), CInt(0.45 * h)), New Size(CInt(456 * h / (10.5 * 61)), CInt(h / 10.5))))
                        Me.BackgroundImage = bg
                        g.Dispose()
                    End Using
                End If
                fcdeter = True
            End If
            If timer2tick > 4 And timer2tick < 6 Then
                'Success
                bg = New Bitmap(w, h, Imaging.PixelFormat.Format32bppPArgb)
                drawbase()
                Using g As Graphics = Graphics.FromImage(bg)
                    g.DrawImage(su, New Rectangle(New Point(CInt(0.39 * h - 16 * h / (10.5 * 122)), CInt(0.45 * h - h * 50 / (21 * 61))), New Size(CInt(472 * h / (10.5 * 61)), CInt(h * 111 / (10.5 * 61)))))
                    Me.BackgroundImage = bg
                    g.Dispose()
                End Using
            End If
        Else
            Timer2.Stop()
            'Live success
            Using g2 As Graphics = Graphics.FromImage(postbg)
                g2.DrawImage(postbase, New Rectangle(New Point(0, 0), New Size(w, h)))
                g2.DrawImage(ab, New Rectangle(New Point(CInt(h * 1242 / 1170), CInt(h * 183 / 1170)), New Size(CInt(h * 256 / 1170), CInt(h * 256 / 1170))))
                g2.DrawImage(liveclear, New Rectangle(New Point(CInt(w * 227 / 960), CInt(h * 19 / 640)), New Size(CInt(w * 500 / 960), CInt(h * 84 / 640))))
                g2.DrawImage(menu1, New Rectangle(New Point(CInt(w * 59 / 960), CInt(h * 409 / 640)), New Size(CInt(w * 474 / 960), CInt(h * 148 / 640))))
                g2.DrawImage(menu2, New Rectangle(New Point(CInt(w * 559 / 960), CInt(h * 259 / 640)), New Size(CInt(w * 374 / 960), CInt(h * 300 / 640))))
                g2.DrawImage(resultnr, New Rectangle(New Point(CInt(w * 103 / 960), CInt(h * 535 / 640)), New Size(CInt(w * 364 / 960), CInt(h * 52 / 640))))
                g2.DrawImage(resultscore, New Rectangle(New Point(CInt(w * 143 / 960), CInt(h * 470 / 640)), New Size(CInt(w * 122 / 960), CInt(h * 26 / 640))))
                g2.DrawImage(resultcombo, New Rectangle(New Point(CInt(w * 771 / 1200), CInt(h * 339 / 800)), New Size(CInt(w * 132 / 1200), CInt(h * 26 / 800))))
                g2.DrawImage(resulths, New Rectangle(New Point(CInt(w * 90 / 960), CInt(h * 520 / 640)), New Size(CInt(w * 176 / 960), CInt(h * 22 / 640))))
                g2.DrawImage(resultperfect, New Rectangle(New Point(CInt(w * 580 / 960), CInt(h * 325 / 640)), New Size(CInt(w * 148 / 960), CInt(h * 36 / 640))))
                g2.DrawImage(resultgreat, New Rectangle(New Point(CInt(w * 609 / 960), CInt(h * 371 / 640)), New Size(CInt(w * 120 / 960), CInt(h * 36 / 640))))
                g2.DrawImage(resultgood, New Rectangle(New Point(CInt(w * 614 / 960), CInt(h * 416 / 640)), New Size(CInt(w * 108 / 960), CInt(h * 36 / 640))))
                g2.DrawImage(resultbad, New Rectangle(New Point(CInt(w * 637 / 960), CInt(h * 460 / 640)), New Size(CInt(w * 83 / 960), CInt(h * 36 / 640))))
                g2.DrawImage(resultmiss, New Rectangle(New Point(CInt(w * 621 / 960), CInt(h * 505 / 640)), New Size(CInt(w * 98 / 960), CInt(h * 36 / 640))))
                For i = 1 To 9
                    g2.DrawImage(resultnum(CInt((score \ CLng(10 ^ (i - 1)) Mod 10))), New Rectangle(New Point(CInt(w * (519 - 26 * i) / 960), CInt(h * 472 / 640)), New Size(CInt(w * 19 / 960), CInt(h * 27 / 640))))
                Next
                For i = 1 To 9
                    g2.DrawImage(resultnum(CInt((score \ CLng(10 ^ (i - 1)) Mod 10))), New Rectangle(New Point(CInt(w * (517 - 18.2 * i) / 960), CInt(h * 522 / 640)), New Size(CInt(w * 19 * 7 / 9600), CInt(h * 27 * 7 / 6400))))
                Next
                For i = 1 To 4
                    g2.DrawImage(resultnum(CInt((maxcombo \ CLng(10 ^ (i - 1)) Mod 10))), New Rectangle(New Point(CInt(w * (876 - 24 * i) / 960), CInt(h * 268 / 640)), New Size(CInt(w * 19 / 960), CInt(h * 27 / 640))))
                Next
                For i = 1 To 4
                    g2.DrawImage(resultnum(CInt((combo(0) \ CLng(10 ^ (i - 1)) Mod 10))), New Rectangle(New Point(CInt(w * (878 - 24 * i) / 960), CInt(h * 332 / 640)), New Size(CInt(w * 19 / 960), CInt(h * 27 / 640))))
                Next
                For i = 1 To 4
                    g2.DrawImage(resultnum(CInt((combo(1) \ CLng(10 ^ (i - 1)) Mod 10))), New Rectangle(New Point(CInt(w * (878 - 24 * i) / 960), CInt(h * 375 / 640)), New Size(CInt(w * 19 / 960), CInt(h * 27 / 640))))
                Next
                For i = 1 To 4
                    g2.DrawImage(resultnum(CInt((combo(2) \ CLng(10 ^ (i - 1)) Mod 10))), New Rectangle(New Point(CInt(w * (878 - 24 * i) / 960), CInt(h * 417 / 640)), New Size(CInt(w * 19 / 960), CInt(h * 27 / 640))))
                Next
                For i = 1 To 4
                    g2.DrawImage(resultnum(CInt((combo(3) \ CLng(10 ^ (i - 1)) Mod 10))), New Rectangle(New Point(CInt(w * (878 - 24 * i) / 960), CInt(h * 464 / 640)), New Size(CInt(w * 19 / 960), CInt(h * 27 / 640))))
                Next
                For i = 1 To 4
                    g2.DrawImage(resultnum(CInt((combo(4) \ CLng(10 ^ (i - 1)) Mod 10))), New Rectangle(New Point(CInt(w * (878 - 24 * i) / 960), CInt(h * 508 / 640)), New Size(CInt(w * 19 / 960), CInt(h * 27 / 640))))
                Next
                Dim r1 As Boolean = True
                Dim r2 As Boolean = True
                Dim rank1, rank2 As Integer
                Select Case score
                    Case 0 To mysong.Grade(0) - 1 'No
                        r2 = False
                        rank2 = 4
                    Case mysong.Grade(0) To mysong.Grade(1) - 1 'C
                        rank2 = 3
                    Case mysong.Grade(1) To mysong.Grade(2) - 1 'B
                        rank2 = 2
                    Case mysong.Grade(2) To mysong.Grade(3) - 1 'A
                        rank2 = 1
                    Case Else 'S
                        rank2 = 0
                End Select
                Select Case maxcombo
                    Case 0 To mysong.ComboGrade(0) - 1 'No
                        r1 = False
                        rank1 = 4
                    Case mysong.ComboGrade(0) To mysong.ComboGrade(1) - 1 'C
                        rank1 = 3
                    Case mysong.ComboGrade(1) To mysong.ComboGrade(2) - 1 'B
                        rank1 = 2
                    Case mysong.ComboGrade(2) To mysong.ComboGrade(3) - 1 'A
                        rank1 = 1
                    Case Else 'S
                        rank1 = 0
                End Select
                Dim rank1size As New Size(CInt(h * 176 / 1080), CInt(h * 176 / 1080))
                Dim rank2size As New Size(CInt(w * 128 / 1266), CInt(w * 138 / 1266))
                Dim rank1loc As New Point(CInt(w * 431 / 810), CInt(h * 187 / 540))
                Dim rank2loc As New Point(CInt(w * 1 / 422), CInt(h * 149 / 211))
                If r1 Then
                    g2.DrawImage(bigrank(rank1), New Rectangle(rank1loc, rank1size))
                End If
                If r2 Then
                    g2.DrawImage(smallrank(rank2), New Rectangle(rank2loc, rank2size))
                End If
                Me.BackgroundImage = postbg
                ends = True
                'MsgBox(
                '"Score: " & score & vbCrLf &
                '"Perfect: " & combo(0) & vbCrLf &
                '"Great: " & combo(1) & vbCrLf &
                '"Good: " & combo(2) & vbCrLf &
                '"Bad: " & combo(3) & vbCrLf &
                '"Miss: " & combo(4)
                '   )
                g2.Dispose()
            End Using
        End If
    End Sub
    Private Sub Timer3_Tick(sender As Object, e As EventArgs) Handles Timer3.Tick
        If timer3tick < 3 Then
            timer3tick += 1
        Else
            Timer3.Stop()
            If mysong.hasaudio And mysong.hasvideo Then
                videoplayer.Show()
                Player.settings.rate = playerspeed
                Player.controls.play()
                videoplayer.Speed = playerspeed
                videoplayer.Play()
            ElseIf mysong.hasaudio Then
                Player.settings.rate = playerspeed
                Player.controls.play()
            ElseIf mysong.hasvideo Then
                videoplayer.Speed = playerspeed
                videoplayer.Play()
            End If
            starttime = DateTime.Now
            timenow = 0
            leavezero = False
            'bg = New Bitmap(w, h, Imaging.PixelFormat.Format32bppPArgb)
            Timer1.Start()
        End If
    End Sub
    Private Sub Gameplay_FormClosing(sender As Object, e As FormClosingEventArgs) Handles Me.FormClosing
        Timer1.Stop()
        Timer2.Stop()
        Timer3.Stop()
        If mysong.hasaudio Then
            Player.controls.stop()
        End If
        If mysong.hasvideo Then
            videoplayer.Stop()
        End If
        Me.Dispose()
    End Sub
    Private Sub Form1_KeyDown(sender As Object, e As KeyEventArgs) Handles Me.KeyDown
        If Not auto And Not ends Then
            Dim clicked As Integer = 0
            Select Case e.KeyCode
                Case Keys.A
                    clicked = 1
                Case Keys.S
                    clicked = 2
                Case Keys.D
                    clicked = 3
                Case Keys.F
                    clicked = 4
                Case Keys.G
                    clicked = 5
                Case Keys.H
                    clicked = 6
                Case Keys.J
                    clicked = 7
                Case Keys.K
                    clicked = 8
                Case Keys.L
                    clicked = 9
            End Select
            If clicked <> 0 Then
                KeyDowns(clicked)
            End If
        End If
    End Sub
    Private Sub Form1_KeyUp(sender As Object, e As KeyEventArgs) Handles Me.KeyUp
        If Not auto And Not ends Then
            Dim clicked As Integer = 0
            Select Case e.KeyCode
                Case Keys.A
                    clicked = 1
                Case Keys.S
                    clicked = 2
                Case Keys.D
                    clicked = 3
                Case Keys.F
                    clicked = 4
                Case Keys.G
                    clicked = 5
                Case Keys.H
                    clicked = 6
                Case Keys.J
                    clicked = 7
                Case Keys.K
                    clicked = 8
                Case Keys.L
                    clicked = 9
            End Select
            If clicked <> 0 Then
                KeyUps(clicked)
            End If
        End If
    End Sub
    Private Sub Form1_MouseDown(sender As Object, e As MouseEventArgs) Handles Me.MouseDown
        Dim l As Point = e.Location
        Dim s As Size = Me.ClientSize
        Dim asize As Size
        If s.Width > s.Height * 1.5 Then
            asize = New Size(CInt(s.Height * 1.5), s.Height)
        Else
            asize = New Size(s.Width, CInt(s.Width / 1.5))
        End If
        Dim offset As New Size(CInt((s.Width - asize.Width) / 2), CInt((s.Height - asize.Height) / 2))
        l -= offset
        l = New Point(CInt(l.X * w / asize.Width), CInt(l.Y * w / asize.Width))
        If l.X > 0.955 * w And l.X < 0.955 * w + 0.0575 * h And l.Y > 0.008 * h And l.Y < 0.008 * h + 0.0575 * h Then
            If play Then
                If mysong.hasvideo Then
                    Overlaying_video.Pause()
                End If
                Player.controls.pause()
                Timer1.Stop()
                leavezero = False
                play = False
            Else
                Player.settings.rate = playerspeed
                If mysong.hasvideo Then
                    Overlaying_video.Play()
                End If
                Player.controls.play()
                Timer1.Start()
                play = True
            End If
        Else
            If Not ends And Not auto Then
                Dim found As Boolean = False
                For i = 1 To numb
                    If Not found Then
                        Dim c As New Point(CInt(numbx(i - 1) + w / 2), CInt(h / 4 - numby(i - 1)))
                        Dim d As Double = Math.Sqrt((c.X - l.X) ^ 2 + (c.Y - l.Y) ^ 2)
                        If d < 0.875 * h / numb Then
                            found = found Or KeyDowns(i)
                        End If
                    End If
                Next
            End If
        End If
    End Sub
    Private Sub Form1_MouseUp(sender As Object, e As MouseEventArgs) Handles Me.MouseUp
        If Not ends And Not auto Then
            Dim l As Point = e.Location
            Dim s As Size = Me.ClientSize
            Dim asize As Size
            If s.Width > s.Height * 1.5 Then
                asize = New Size(CInt(s.Height * 1.5), s.Height)
            Else
                asize = New Size(s.Width, CInt(s.Width / 1.5))
            End If
            Dim offset As New Size(CInt((s.Width - asize.Width) / 2), CInt((s.Height - asize.Height) / 2))
            l -= offset
            l = New Point(CInt(l.X * w / asize.Width), CInt(l.Y * w / asize.Width))
            Dim found As Boolean = False
            For i = 1 To numb
                If Not found Then
                    Dim c As New Point(CInt(numbx(i - 1) + w / 2), CInt(h / 4 - numby(i - 1)))
                    Dim d As Double = Math.Sqrt((c.X - l.X) ^ 2 + (c.Y - l.Y) ^ 2)
                    If d < 0.875 * h / numb Then
                        found = found Or KeyUps(i)
                    End If
                End If
            Next
        End If
    End Sub
    Private Sub Gameplay_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        start()
    End Sub
    Private Sub Form1_Click(sender As Object, e As EventArgs) Handles Me.Click
        If ends Then
            Me.Close()
        End If
    End Sub
End Class
