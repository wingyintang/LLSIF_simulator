Imports System.IO
Public Class osureader
    Public Shared Sub readosu(filename As String)
        Dim numrow As Integer
        Dim mysong As New Song
        mysong.Filename = filename
        Dim sr As New System.IO.StreamReader(filename)
        Dim c = sr.ReadToEnd()
        Dim ln() As String = Strings.Split(c, vbCrLf)
        Dim mode As String = ""
        Dim analysis As String = ""
        mysong.Hit_Object = {}
        Dim hocount = 0
        Dim tpcount = 0
        Dim colormax = 0
        For h = 0 To ln.Length - 1
            If ln(h) <> "" Then
                Select Case mode
                    Case ""
                        If InStr(ln(h), "osu file format v") = 1 Then
                            mysong.format = Mid(ln(h), Len("osu file format v") + 1)
                        Else
                            mode = Mid(ln(h), 2, Len(ln(h)) - 2)
                        End If
                    Case "General"
                        If InStr(ln(h), "AudioFilename: ") = 1 Then
                            mysong.AudioFilename = Mid(ln(h), Len("AudioFilename: ") + 1)
                        ElseIf InStr(ln(h), "AudioLeadIn: ") = 1 Then
                            mysong.AudioLeadIn = Mid(ln(h), Len("AudioLeadIn: ") + 1)
                        ElseIf InStr(ln(h), "AudioHash: ") = 1 Then
                            mysong.AudioHash = Mid(ln(h), Len("AudioHash: ") + 1)
                        ElseIf InStr(ln(h), "PreviewTime: ") = 1 Then
                            mysong.PreviewTime = Mid(ln(h), Len("PreviewTime: ") + 1)
                        ElseIf InStr(ln(h), "Countdown: ") = 1 Then
                            mysong.Countdown = (Mid(ln(h), Len("Countdown: ") + 1) = "1")
                        ElseIf InStr(ln(h), "SampleSet: ") = 1 Then
                            mysong.SampleSet = Mid(ln(h), Len("SampleSet: ") + 1)
                        ElseIf InStr(ln(h), "StackLeniency: ") = 1 Then
                            mysong.StackLeniency = Mid(ln(h), Len("StackLeniency: ") + 1)
                        ElseIf InStr(ln(h), "Mode: ") = 1 Then
                            mysong.Mode = Mid(ln(h), Len("Mode: ") + 1)
                        ElseIf InStr(ln(h), "LetterboxInBreaks: ") = 1 Then
                            mysong.LetterboxInBreaks = (Mid(ln(h), Len("LetterboxInBreaks: ") + 1) = "1")
                        ElseIf InStr(ln(h), "WidescreenStoryboard: ") = 1 Then
                            mysong.WidescreenStoryboard = (Mid(ln(h), Len("WidescreenStoryboard: ") + 1) = "1")
                        ElseIf InStr(ln(h), "EpilepsyWarning: ") = 1 Then
                            mysong.EpilepsyWarning = (Mid(ln(h), Len("EpilepsyWarning: ") + 1) = "1")
                        End If
                    Case "Editor"
                    Case "Metadata"
                        If InStr(ln(h), "Title:") = 1 Then
                            mysong.Title = Mid(ln(h), Len("Title:") + 1)
                            If mysong.TitleUnicode = "" Then
                                mysong.TitleUnicode = mysong.Title
                            End If
                        ElseIf InStr(ln(h), "TitleUnicode:") = 1 Then
                            mysong.TitleUnicode = Mid(ln(h), Len("TitleUnicode:") + 1)
                        ElseIf InStr(ln(h), "Title:") = 1 Then
                            mysong.Artist = Mid(ln(h), Len("Artist:") + 1)
                            If mysong.ArtistUnicode = "" Then
                                mysong.ArtistUnicode = mysong.Artist
                            End If
                        ElseIf InStr(ln(h), "ArtistUnicode:") = 1 Then
                            mysong.ArtistUnicode = Mid(ln(h), Len("ArtistUnicode:") + 1)
                        ElseIf InStr(ln(h), "Creator:") = 1 Then
                            mysong.Creator = Mid(ln(h), Len("Creator:") + 1)
                        ElseIf InStr(ln(h), "Version:") = 1 Then
                            mysong.Version = Mid(ln(h), Len("Version:") + 1)
                        ElseIf InStr(ln(h), "Source:") = 1 Then
                            mysong.Source = Mid(ln(h), Len("Source:") + 1)
                        ElseIf InStr(ln(h), "Tags:") = 1 Then
                            mysong.Tags = Strings.Split(Mid(ln(h), Len("Tags:") + 1), " ")
                        ElseIf InStr(ln(h), "BeatmapID:") = 1 Then
                            mysong.BeatmapID = Mid(ln(h), Len("BeatmapID:") + 1)
                        ElseIf InStr(ln(h), "BeatmapSetID:") = 1 Then
                            mysong.BeatmapSetID = Mid(ln(h), Len("BeatmapSetID:") + 1)
                        End If
                    Case "Difficulty"
                        If InStr(ln(h), "HPDrainRate:") = 1 Then
                            mysong.HPDrainRate = Mid(ln(h), Len("HPDrainRate:") + 1)
                        ElseIf InStr(ln(h), "CircleSize:") = 1 Then
                            mysong.CircleSize = Mid(ln(h), Len("CircleSize:") + 1)
                        ElseIf InStr(ln(h), "OverallDifficulty:") = 1 Then
                            mysong.OverallDifficulty = Mid(ln(h), Len("OverallDifficulty:") + 1)
                        ElseIf InStr(ln(h), "ApproachRate:") = 1 Then
                            mysong.ApproachRate = Mid(ln(h), Len("ApproachRate:") + 1)
                        ElseIf InStr(ln(h), "SliderMultiplier:") = 1 Then
                            mysong.SliderMultiplier = Mid(ln(h), Len("SliderMultiplier:") + 1)
                        ElseIf InStr(ln(h), "SliderTickRate:") = 1 Then
                            mysong.SliderTickRate = Mid(ln(h), Len("SliderTickRate:") + 1)
                        End If
                    Case "Events"
                    Case "TimingPoints"
                        Dim token() As String = Strings.Split(ln(h), ",")
                        tpcount += 1
                        Array.Resize(mysong.Timing_Point, tpcount)
                        mysong.Timing_Point(tpcount - 1) = New TimingPoint
                        mysong.Timing_Point(tpcount - 1).Offset = token(0)
                        If token.Length >= 2 Then
                            mysong.Timing_Point(tpcount - 1).MillisecondsPerBeat = token(1)
                        End If
                        If token.Length >= 3 Then
                            mysong.Timing_Point(tpcount - 1).Meter = token(2)
                        End If
                        If token.Length >= 4 Then
                            mysong.Timing_Point(tpcount - 1).SampleType = token(3)
                        End If
                        If token.Length >= 5 Then
                            mysong.Timing_Point(tpcount - 1).SampleSet = token(4)
                        End If
                        If token.Length >= 6 Then
                            mysong.Timing_Point(tpcount - 1).Volume = token(5)
                        End If
                        If token.Length >= 7 Then
                            mysong.Timing_Point(tpcount - 1).Inherited = (token(6) = "0")
                        End If
                        If token.Length >= 8 Then
                            mysong.Timing_Point(tpcount - 1).KiaiMode = (token(7) = "1")
                        End If
                    Case "Colours"
                        Dim combonum As Integer
                        Dim comborgb() As String
                        Dim combocol As Color
                        If InStr(ln(h), "Combo") = 1 Then
                            combonum = Mid(ln(h), Len("Combo") + 1, 1)
                            If InStr(ln(h), "Combo" & combonum & " : ") = 1 Then
                                comborgb = Strings.Split(Mid(ln(h), Len("Combo" & combonum & " : ") + 1), ",")
                                combocol = Color.FromArgb(comborgb(0), comborgb(1), comborgb(2))
                                colormax = Math.Max(combonum, colormax)
                                If mysong.ComboColor.Length < combonum Then
                                    Array.Resize(mysong.ComboColor, combonum)
                                End If
                                mysong.ComboColor(combonum - 1) = combocol
                            Else
                            End If
                        Else
                        End If
                    Case "HitObjects"
                        Dim token() As String = Strings.Split(ln(h), ",")
                        Dim minimumindex As Integer
                        hocount += 1
                        Array.Resize(mysong.Hit_Object, hocount)
                        mysong.Hit_Object(hocount - 1) = New HitObject
                        mysong.Hit_Object(hocount - 1).location = New Point(token(0), token(1))
                        mysong.Hit_Object(hocount - 1).time = token(2)
                        mysong.Hit_Object(hocount - 1).type = token(3)
                        mysong.Hit_Object(hocount - 1).hitsound = token(4)
                        If (mysong.Hit_Object(hocount - 1).type \ 1) Mod 2 = 1 Then
                            mysong.circlecount += 1
                            minimumindex = 5
                        ElseIf (mysong.Hit_Object(hocount - 1).type \ 2) Mod 2 = 1 Then
                            mysong.slidercount += 1
                            minimumindex = 10
                            Dim tokenslider() As String = Strings.Split(token(5), "|")
                            mysong.Hit_Object(hocount - 1).slidertype = tokenslider(0)
                            Array.Resize(mysong.Hit_Object(hocount - 1).slidercurve, tokenslider.Length - 1)
                            For j = 1 To tokenslider.Length - 1
                                Dim pointstr() As String = Strings.Split(tokenslider(j), ":")
                                mysong.Hit_Object(hocount - 1).slidercurve(j - 1) = New Point(pointstr(0), pointstr(1))
                            Next
                            mysong.Hit_Object(hocount - 1).repeat = token(6)
                            mysong.Hit_Object(hocount - 1).pixelLength = token(7)
                            If token.Length >= 9 Then
                                mysong.Hit_Object(hocount - 1).edgeHitsound = token(8)
                            End If
                            If token.Length >= 10 Then
                                mysong.Hit_Object(hocount - 1).edgeAddition = token(9)
                            End If
                        ElseIf (mysong.Hit_Object(hocount - 1).type \ 8) Mod 2 = 1 Then
                            minimumindex = 6
                            mysong.spinnercount += 1
                            mysong.Hit_Object(hocount - 1).endtime = token(5)
                        ElseIf (mysong.Hit_Object(hocount - 1).type \ 128) Mod 2 = 1 Then
                            minimumindex = 5
                            mysong.spinnercount += 1
                            mysong.Hit_Object(hocount - 1).endtime = Strings.Split(token(5), ":")(0)
                        Else
                        End If
                        If token.Length > minimumindex Then
                            mysong.Hit_Object(hocount - 1).addition = token(minimumindex)
                        End If
                        If (mysong.Hit_Object(hocount - 1).type \ 4) Mod 2 = 1 Then
                        End If
                    Case Else
                End Select
            Else
                mode = ""
            End If
        Next
        If colormax <> 0 Then
            Array.Resize(mysong.ComboColor, colormax + 1)
            mysong.ComboColor(colormax) = mysong.ComboColor(0)
            For j = 1 To colormax
                mysong.ComboColor(j - 1) = mysong.ComboColor(j)
            Next
            Array.Resize(mysong.ComboColor, colormax)
        End If
        Dim comboval As Integer = -1
        If (mysong.Hit_Object(0).type \ 4) Mod 2 = 1 Then
            comboval = -1
        Else
            comboval = 0
        End If
        Select Case mysong.Mode
            Case 3 'Mania
                numrow = mysong.CircleSize
            Case Else
                numrow = 9
        End Select
        For i = 0 To mysong.Hit_Object.Length - 1
            Dim u As HitObject = mysong.Hit_Object(i)
            If (u.type \ 4) Mod 2 = 1 Then
                comboval = (comboval + 1) Mod 3
            End If
            mysong.Hit_Object(i).Element = {"Smile", "Pure", "Cool", "All"}(comboval)
            If (u.type \ 1) Mod 2 = 1 Then 'hitcircle
                If mysong.Mode = 1 Then
                    If (u.hitsound \ 2) Mod 2 = 1 Then 'Whistle -> Blue
                        mysong.Hit_Object(i).locationsif = 6
                        mysong.Hit_Object(i).Element = "Cool"
                    ElseIf (u.hitsound \ 8) Mod 2 = 1 Then 'Clap -> Blue
                        mysong.Hit_Object(i).locationsif = 6
                        mysong.Hit_Object(i).Element = "Cool"
                    Else
                        mysong.Hit_Object(i).locationsif = 4
                        mysong.Hit_Object(i).Element = "Smile"
                    End If
                Else
                    mysong.Hit_Object(i).locationsif = Math.Max(Math.Min(Math.Round((u.location.X * numrow / 256 + 1) / 2), numrow), 1)
                End If
                mysong.Hit_Object(i).type = 1
            End If
            If (u.type \ 2) Mod 2 = 1 Then 'slider
                If mysong.Mode = 1 Then
                    mysong.Hit_Object(i).locationsif = 5
                    mysong.Hit_Object(i).Element = "Pure"
                Else
                    mysong.Hit_Object(i).locationsif = Math.Max(Math.Min(Math.Round((u.location.X * numrow / 256 + 1) / 2), numrow), 1)
                End If
                Dim pxPerBeat = mysong.SliderMultiplier * 100 * 1
                Dim beatsNumber = (u.pixelLength * u.repeat) / pxPerBeat
                mysong.Hit_Object(i).endtime = mysong.Hit_Object(i).time + Math.Ceiling(beatsNumber * mpb(mysong, u.time))
                mysong.Hit_Object(i).type = 2
            End If
            If (u.type \ 8) Mod 2 = 1 Then 'spinner
                If mysong.Mode = 1 Then
                    mysong.Hit_Object(i).locationsif = 5
                    mysong.Hit_Object(i).Element = "Pure"
                Else
                    mysong.Hit_Object(i).locationsif = Math.Max(Math.Min(Math.Round((u.location.X * numrow / 256 + 1) / 2), numrow), 1)
                End If
                mysong.Hit_Object(i).type = 2
            End If
            If (u.type \ 128) Mod 2 = 1 Then 'mania slider
                mysong.Hit_Object(i).locationsif = Math.Max(Math.Min(Math.Round((u.location.X * numrow / 256 + 1) / 2), numrow), 1)
                mysong.Hit_Object(i).type = 2
            End If
            If mysong.Mode = 1 Then
                If (u.hitsound \ 4) Mod 2 = 1 Then 'Finish -> Large
                    mysong.Hit_Object(i).large = True
                    mysong.Hit_Object(i).star = True
                End If
            End If
        Next
        mysong.Bgcode = Math.Min(Math.Max(mysong.OverallDifficulty * 2, 1), 12)
        mysong.Speed = (16 - mysong.OverallDifficulty) / 10
        Dim times(mysong.Hit_Object.Length - 1) As Double
        For i = 1 To mysong.Hit_Object.Length - 1
            Dim u = mysong.Hit_Object(i)
            times(i) = u.time / 1000
            If Math.Abs(times(i - 1) - times(i)) < 0.0001 Then
                mysong.Hit_Object(i).parallel = True
                mysong.Hit_Object(i - 1).parallel = True
            Else
                mysong.Hit_Object(i).parallel = False
            End If
        Next
        Dim objcount As Integer = mysong.objcount
        mysong.objcount = mysong.Hit_Object.Length
        mysong.ComboGrade = {CInt(objcount * 0.3), CInt(objcount * 0.5), CInt(objcount * 0.7), CInt(objcount * 1)}
        Dim approscore As Integer = mysong.scoreapprox
        mysong.Grade = {CInt(approscore * 0.2), CInt(approscore * 0.5), CInt(approscore * 0.6), CInt(approscore * 0.7)}
        mysong.People = "Artist: " & mysong.Artist & " Osu Creater: " & mysong.Creator
        Dim game As New Gameplay
        game.mysong = mysong
        game.ShowDialog()
    End Sub
    Private Shared Function mpb(mysong As Song, timems As Integer) As Double
        Dim output As Double = mysong.Timing_Point(0).MillisecondsPerBeat
        For i = 0 To mysong.Timing_Point.Length - 1
            If (mysong.Timing_Point(i).Offset <= timems) And (mysong.Timing_Point(i).MillisecondsPerBeat > 0) Then
                output = mysong.Timing_Point(i).MillisecondsPerBeat
            End If
        Next
        Return output
    End Function
End Class
