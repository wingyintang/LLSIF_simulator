Imports System.IO
Public Class sifreader
    Public Shared Sub readsif(filename As String)
        Dim mysong As New Song
        mysong.Filename = filename
        Dim sr As New StreamReader(filename)
        Dim ln() As String = Strings.Split(sr.ReadToEnd, vbCrLf)
        Dim map As Boolean = False
        sr.Close()
        mysong.Hit_Object = {}
        mysong.sifformat = CInt(Strings.Mid(ln(0), 13))
        For i = 0 To 99
            mysong.Image(i) = ""
        Next
        For i = 1 To ln.Length - 1
            If map Then
                Dim line = Strings.Split(ln(i), ",")
                If CInt(line(0)) = 0 Then
                    'Effect
                Else
                    mysong.objcount += 1
                    Array.Resize(mysong.Hit_Object, mysong.objcount)
                    mysong.Hit_Object(mysong.objcount - 1) = New HitObject
                    mysong.Hit_Object(mysong.objcount - 1).type = CInt(line(0))
                    mysong.Hit_Object(mysong.objcount - 1).locationsif = CInt(line(1))
                    mysong.Hit_Object(mysong.objcount - 1).time = CInt(CDbl(line(2)) * 1000)
                    Select Case mysong.Hit_Object(mysong.objcount - 1).type
                        Case 1
                            mysong.Hit_Object(mysong.objcount - 1).endtime = mysong.Hit_Object(mysong.objcount - 1).time
                            mysong.Hit_Object(mysong.objcount - 1).parallel = (line(3) = "1")
                            mysong.Hit_Object(mysong.objcount - 1).star = (line(4) = "1")
                            mysong.Hit_Object(mysong.objcount - 1).events = (line(5) = "1")
                            If line.Length >= 7 Then
                                If line(6) <> "" Then
                                    mysong.Hit_Object(mysong.objcount - 1).Element = {"Smile", "Pure", "Cool", "All"}(CInt(line(6)))
                                Else
                                    mysong.Hit_Object(mysong.objcount - 1).Element = mysong.Element
                                End If
                            Else
                                mysong.Hit_Object(mysong.objcount - 1).Element = mysong.Element
                            End If
                            If line.Length >= 8 Then
                                mysong.Hit_Object(mysong.objcount - 1).ApproachRate = Val(line(7))
                            Else
                                mysong.Hit_Object(mysong.objcount - 1).ApproachRate = mysong.ApproachRate
                            End If
                            If line.Length >= 9 Then
                                mysong.Hit_Object(mysong.objcount - 1).large = (line(8) = "1")
                            Else
                                mysong.Hit_Object(mysong.objcount - 1).large = False
                            End If
                        Case 2
                            mysong.Hit_Object(mysong.objcount - 1).endtime = CInt(CDbl(line(3)) * 1000)
                            mysong.Hit_Object(mysong.objcount - 1).parallel = (line(4) = "1")
                            mysong.Hit_Object(mysong.objcount - 1).star = (line(5) = "1")
                            mysong.Hit_Object(mysong.objcount - 1).events = (line(6) = "1")
                            If line.Length >= 8 Then
                                If line(7) <> "" Then
                                    mysong.Hit_Object(mysong.objcount - 1).Element = {"Smile", "Pure", "Cool", "All"}(CInt(line(7)))
                                Else
                                    mysong.Hit_Object(mysong.objcount - 1).Element = mysong.Element
                                End If
                            Else
                                mysong.Hit_Object(mysong.objcount - 1).Element = mysong.Element
                            End If
                            If line.Length >= 9 Then
                                mysong.Hit_Object(mysong.objcount - 1).ApproachRate = Val(line(8))
                            Else
                                mysong.Hit_Object(mysong.objcount - 1).ApproachRate = mysong.ApproachRate
                            End If
                            If line.Length >= 10 Then
                                mysong.Hit_Object(mysong.objcount - 1).large = (line(9) = "1")
                            Else
                                mysong.Hit_Object(mysong.objcount - 1).large = False
                            End If
                        Case 3
                            mysong.Hit_Object(mysong.objcount - 1).locationsif2 = Val(line(3))
                            mysong.Hit_Object(mysong.objcount - 1).parallel = (line(4) = "1")
                            mysong.Hit_Object(mysong.objcount - 1).star = (line(5) = "1")
                            mysong.Hit_Object(mysong.objcount - 1).events = (line(6) = "1")
                            If line.Length >= 8 Then
                                If line(7) <> "" Then
                                    mysong.Hit_Object(mysong.objcount - 1).Element = {"Smile", "Pure", "Cool", "All"}(CInt(line(7)))
                                Else
                                    mysong.Hit_Object(mysong.objcount - 1).Element = mysong.Element
                                End If
                            Else
                                mysong.Hit_Object(mysong.objcount - 1).Element = mysong.Element
                            End If
                            If line.Length >= 9 Then
                                mysong.Hit_Object(mysong.objcount - 1).ApproachRate = Val(line(8))
                            Else
                                mysong.Hit_Object(mysong.objcount - 1).ApproachRate = mysong.ApproachRate
                            End If
                            If line.Length >= 10 Then
                                mysong.Hit_Object(mysong.objcount - 1).large = (line(9) = "1")
                            Else
                                mysong.Hit_Object(mysong.objcount - 1).large = False
                            End If
                    End Select
                    mysong.Hit_Object(mysong.objcount - 1).processed1 = False
                    mysong.Hit_Object(mysong.objcount - 1).processed2 = False
                End If
                If mysong.Hit_Object(mysong.objcount - 1).star Then
                    mysong.starcount += 1
                End If
            Else
                Select Case ln(i)(0).ToString
                    Case "A"
                        If ln(i)(1) = "r" Then
                            mysong.Arrange = Strings.Mid(ln(i), 10)
                        ElseIf ln(i)(1) = "p" Then
                            mysong.ApproachRate = Val(Strings.Mid(ln(i), 11))
                        End If
                    Case "B"
                        mysong.Bgcode = CInt(Strings.Mid(ln(i), 5))
                    Case "C"
                        mysong.Compose = Strings.Mid(ln(i), 10)
                    Case "D"
                        mysong.Speed = Val(Strings.Mid(ln(i), 7))
                    Case "E"
                        mysong.Element = Strings.Mid(ln(i), 10)
                    Case "G"
                        mysong.Grade = Converter.ArraytoInteger(Strings.Split(Strings.Mid(ln(i), 8), ","))
                    Case "I"
                        mysong.ImageFilename = Strings.Mid(ln(i), 8)
                    Case "L"
                        If ln(i)(1) = "e" Then
                            mysong.LeftText = Strings.Mid(ln(i), 7)
                        ElseIf ln(i)(1) = "y" Then
                            mysong.Lyrics = Strings.Mid(ln(i), 9)
                        End If
                    Case "M"
                        map = True
                    Case "N"
                        mysong.Numrow = CInt(Strings.Mid(ln(i), 9))
                        Array.Resize(mysong.Image, mysong.Numrow)
                    Case "O"
                        mysong.format = CInt(Strings.Mid(ln(i), 13))
                    Case "P"
                        If ln(i)(1) = "e" Then
                            mysong.People = Strings.Mid(ln(i), 9)
                        ElseIf ln(i)(1) = "i" Then
                            mysong.Picture = Strings.Mid(ln(i), 10)
                        End If
                    Case "R"
                        If ln(i)(1) = "a" Then
                            mysong.ComboGrade = Converter.ArraytoInteger(Strings.Split(Strings.Mid(ln(i), 7), ","))
                        ElseIf ln(i)(1) = "i" Then
                            mysong.RightText = Strings.Mid(ln(i), 8)
                        End If
                    Case "S"
                        mysong.AudioFilename = Strings.Mid(ln(i), 7)
                        If Strings.Right(mysong.AudioFilename, 4) <> "midi" And Strings.Right(mysong.AudioFilename, 4) <> ".mid" Then
                            mysong.midiAudio = False
                            Offset.goffset = Offset.goffset * 10 + Offset.playeroffset
                        Else
                            mysong.midiAudio = True
                        End If
                        mysong.hasaudio = True
                    Case "T"
                        mysong.Title = Strings.Mid(ln(i), 8)
                    Case "V"
                        mysong.VideoFilename = Strings.Mid(ln(i), 8)
                        mysong.hasvideo = True
                    Case "X"
                        Dim colonpos As Integer = InStr(ln(i), ":")
                        Dim place As Integer = CInt(Strings.Mid(ln(i), 2, colonpos - 2))
                        Dim paths As String = Strings.Mid(ln(i), colonpos + 2)
                        If place <= mysong.Numrow Then
                            mysong.Image(place - 1) = paths
                        End If
                End Select
            End If
        Next
        Dim game As New Gameplay
        game.mysong = mysong
        game.ShowDialog()
    End Sub
End Class
