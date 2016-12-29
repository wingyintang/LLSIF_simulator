Public Class CardExplorer
    Dim language As Integer = -1
    Property SelectedSong As Song
    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        TreeView1.Nodes.Clear()
        tryhost(ComboBox1.SelectedItem)
    End Sub

    Private Function getsource(ByVal url As String)
        Try
            Dim request As System.Net.HttpWebRequest = System.Net.HttpWebRequest.Create(url)
            Dim response As System.Net.HttpWebResponse = request.GetResponse()
            Dim sr As System.IO.StreamReader = New System.IO.StreamReader(response.GetResponseStream())
            Dim sourcecode As String = sr.ReadToEnd()
            Return sourcecode
        Catch ex As Exception
            Return "Error"
        End Try
    End Function

    Public Function findintext(ByVal text, ByVal first, Optional ByVal last = "") As String()
        Try
            If last = "" Then
                Dim firstplace As Integer = InStr(text, first)
                Return {Strings.Mid(text, firstplace + Len(first)), ""}
            Else
                Dim firstplace As Integer = InStr(text, first)
                Dim lastplace As Integer = InStr(firstplace + Len(first), text, last)
                Return {Strings.Mid(text, firstplace + Len(first), lastplace - firstplace - Len(first)), Strings.Mid(text, lastplace + Len(last))}
            End If
        Catch ex As Exception
            Return {"Error", "Error"}

        End Try
    End Function

    Private Sub tryhost(host As String)
        TreeView1.Nodes.Add(New TreeNode(host))
        Try
            Dim numnode As Integer = TreeView1.Nodes(0).Nodes.Count - 1
            Dim subnode As Integer = -1
            Dim content As String = getsource(host & "/live/")
            Dim table As String = findintext(content, "</th></tr>", "/table>")(0)
            Dim item() As String = Strings.Split(table, "<td")
            For i = 1 To item.Length - 1
                If InStr(item(i), "rowspan") > 0 Then
                    Dim search0() As String = findintext(item(i), "data-src=""", """")
                    Dim imageurl As String = search0(0)
                    Dim search() As String
                    'If host = "http://card.llsupport.cn" Then
                    'search = findintext(search0(1), "color:", """")
                    'Else
                    search = findintext(search0(1), "class=""ll", "color""")
                    'End If
                    Dim colors As String = search(0)
                    Dim c As Color
                    Dim search2() As String = findintext(search(1), ">", "<")
                    Dim title As String = search2(0)
                    title = Strings.Replace(title, "&nbsp;&nbsp;", "")
                    title = Strings.Replace(title, "&amp;", "&")
                    title = Strings.Replace(title, "&quot;", """")
                    title = Strings.Replace(title, "&lt;", "<")
                    title = Strings.Replace(title, "&gt;", ">")
                    title = Strings.Replace(title, "&#34;", """")
                    title = Strings.Replace(title, "&#38;", "&")
                    title = Strings.Replace(title, "&#39;", "'")
                    title = Strings.Replace(title, "&#60;", "<")
                    title = Strings.Replace(title, "&#62;", ">")
                    title = Strings.Replace(title, ":", "：")
                    Select Case colors
                        'Case "red"
                        '    c = Color.Red
                        'Case "green"
                        '    c = Color.Green
                        'Case "blue"
                        '    c = Color.Blue
                        Case "smile"
                            c = Color.Red
                        Case "pure"
                            c = Color.Green
                        Case "cool"
                            c = Color.Blue
                    End Select
                    numnode += 1
                    subnode = -1
                    TreeView1.Nodes(0).Nodes.Add(New TreeNode(title))
                    TreeView1.Nodes(0).Nodes(numnode).ForeColor = c
                    TreeView1.Nodes(0).Nodes(numnode).Tag = imageurl
                Else
                    If InStr(item(i), "href") > 0 Then
                        Dim search() As String = findintext(item(i), "a href=""", """")
                        Dim url As String = search(0)
                        Dim search2() As String = findintext(search(1), ">", "</")
                        Dim diff As String = search2(0)
                        subnode += 1
                        TreeView1.Nodes(0).Nodes(numnode).Nodes.Add(New TreeNode(Trim(diff)))
                        TreeView1.Nodes(0).Nodes(numnode).Nodes(subnode).Tag = url
                    ElseIf InStr(item(i), "border-left:0;border-right:0") > 0 Then
                        Dim search() As String = findintext(item(i), "&nbsp;&nbsp;", "&nbsp;&nbsp;")
                        Dim diff As String = search(0)
                        TreeView1.Nodes(0).Nodes(numnode).Nodes(subnode).Text &= "(" & diff & ")"
                    ElseIf InStr(item(i), "border-right:0") > 0 Then
                        Dim search() As String = findintext(item(i), ">", "</")
                        Dim diff As String = search(0)
                        subnode += 1
                        'If subnode = 4 Then
                        '    MsgBox(Asc(diff(0)) & " " & Asc(diff(1)) & " " & Asc(diff(2)) & " " & Asc(diff(3)) & " " & Asc(diff(4)))
                        'End If
                        TreeView1.Nodes(0).Nodes(numnode).Nodes.Add(New TreeNode(Trim(Strings.Replace(diff, Chr(10), ""))))
                        TreeView1.Nodes(0).Nodes(numnode).Nodes(subnode).ForeColor = Color.LightGray
                        TreeView1.Nodes(0).Nodes(numnode).Nodes(subnode).Tag = "Not available"
                    End If
                End If
            Next
            If item.Length > 1 Then
                MsgBox({"Success!", "成功！", "成功！", "成功！"}(language))
            Else
                MsgBox({"Data is empty!", "數據為空", "数据为空", "データが空です"}(language))
            End If
        Catch ex As Exception
            TreeView1.Nodes(0).Nodes.Add(New TreeNode("Failed"))
            TreeView1.Nodes(0).Nodes(TreeView1.Nodes(0).Nodes.Count - 1).ForeColor = Color.LightGray
            TreeView1.Nodes(0).Nodes(TreeView1.Nodes(0).Nodes.Count - 1).Tag = "Not available"
            MsgBox({"Failed...", "失敗…", "失败…", "失敗しました..."}(language))
        End Try
    End Sub

    Private Sub Button2_Click(sender As Object, e As EventArgs) Handles Button2.Click
        Dim s As TreeNode = TreeView1.SelectedNode
        If s.Level = 2 Then
            If s.Tag = "Not available" Then
                MsgBox({"Not available", "無可用資料", "无可用数据", "データなし"}(language))
            Else
                opensong(s)
                Offset.ShowDialog()
                If Offset.successful Then
                    Dim game As New Gameplay
                    game.mysong = SelectedSong
                    game.ShowDialog()
                End If
            End If
        End If
    End Sub

    Private Sub opensong(item As TreeNode)
        Dim hosts As TreeNode = item
        For i = 1 To item.Level
            hosts = hosts.Parent
        Next
        Dim hostname As String = hosts.Text
        If item.Tag = "Not available" Then
            MsgBox({"Not available", "無可用資料", "无可用数据", "データなし"}(language))
        Else
            SelectedSong = New Song
            SelectedSong.websource = True
            SelectedSong.webhost = hostname
            SelectedSong.hasaudio = True
            Select Case Strings.Split(item.Text, "(")(0)
                Case "Easy"
                    SelectedSong.ApproachRate = 2
                Case "Normal"
                    SelectedSong.ApproachRate = 4
                Case "Hard"
                    SelectedSong.ApproachRate = 6
                Case "Expert"
                    SelectedSong.ApproachRate = 8
                Case "Master"
                    SelectedSong.ApproachRate = 9
            End Select
            Dim content As String = getsource(hostname & "" & item.Tag)
            SelectedSong.Bgcode = CInt(findintext(content, "bg: k + 'background/b_liveback_", ".png")(0))
            SelectedSong.Title = item.Parent.Text
            SelectedSong.ImageFilename = Strings.Mid(item.Parent.Tag, 36)
            SelectedSong.AudioFilename = findintext(content, "sound: '/asset/assets/sound/music/", "'")(0)
            Dim ranklist() As String = Strings.Split(findintext(content, "rank: [", "]")(0), ", ")
            Dim ranks(3) As Integer
            For i = 0 To 3
                ranks(i) = CInt(ranklist(i))
            Next
            SelectedSong.Grade = ranks
            SelectedSong.Speed = Val(findintext(content, "notes_speed: ", ",")(0))
            Dim hocontent As String = findintext(content, "notes_list: [", "]")(0)
            cutcontent(hocontent)
        End If
    End Sub
    Private Sub cutcontent(s As String)
        s = Strings.Mid(s, 2, Len(s) - 2)
        Dim element As Integer = 0
        Dim parts = Strings.Split(s, "},{")
        Dim times(parts.Length - 1) As Double
        Dim repeat(parts.Length - 1) As Boolean
        Array.Resize(SelectedSong.Hit_Object, parts.Length)
        For i = 0 To parts.Length - 1
            SelectedSong.Hit_Object(i) = New HitObject
            Dim part2 = Strings.Split(parts(i), ",")
            Dim t, ev As Double
            Dim n1, n2, e, p As Integer
            For j = 0 To part2.Length - 1
                Dim part3 = Strings.Split(part2(j), ":")
                Select Case Strings.Mid(part3(0), 2, Len(part3(0)) - 2)
                    Case "timing_sec"
                        t = Val(part3(1))
                    Case "notes_attribute"
                        n1 = CInt(part3(1))
                        element = n1
                    Case "notes_level"
                        n2 = CInt(part3(1))
                    Case "effect"
                        e = CInt(part3(1))
                    Case "effect_value"
                        ev = Val(part3(1))
                    Case "position"
                        p = 10 - CInt(part3(1))
                End Select
            Next
            SelectedSong.Hit_Object(i).time = CInt(t * 1000)
            SelectedSong.Hit_Object(i).Element = {"All", "Smile", "Pure", "Cool"}(element)
            SelectedSong.Hit_Object(i).locationsif = p
            SelectedSong.Hit_Object(i).ApproachRate = SelectedSong.ApproachRate
            times(i) = t
            If e = 3 Then
                SelectedSong.Hit_Object(i).type = 2
                SelectedSong.Hit_Object(i).endtime = CInt((t + ev) * 1000)
            Else
                SelectedSong.Hit_Object(i).type = 1
                SelectedSong.Hit_Object(i).endtime = CInt(t * 1000)
            End If
            'parallel
            If i > 0 Then
                If Math.Abs(times(i - 1) - times(i)) < 0.0001 Then
                    repeat(i) = True
                    repeat(i - 1) = True
                Else
                    repeat(i) = False
                End If
            Else
                repeat(i) = False
            End If
            'star
            SelectedSong.Hit_Object(i).star = (e = 4)
            If e = 4 Then
                SelectedSong.starcount += 1
            Else
            End If
            'event
            SelectedSong.Hit_Object(i).events = (e = 2)
        Next
        For i = 0 To parts.Length - 1
            SelectedSong.Hit_Object(i).parallel = repeat(i)
            SelectedSong.Hit_Object(i).processed1 = False
            SelectedSong.Hit_Object(i).processed2 = False
        Next
        SelectedSong.Element = element
        Dim cbs(3) As Integer
        For i = 0 To 3
            cbs(i) = CInt(Math.Ceiling(parts.Length * {0.3, 0.5, 0.7, 1}(i)))
        Next
        SelectedSong.ComboGrade = cbs
        SelectedSong.Element = {"All", "Smile", "Pure", "Cool"}(element)
        SelectedSong.objcount = SelectedSong.Hit_Object.Length
    End Sub

    Private Sub TreeView1_AfterSelect(sender As Object, e As TreeViewEventArgs) Handles TreeView1.AfterSelect
        Dim s As TreeNode = TreeView1.SelectedNode
        If s.Level = 2 Then
            PictureBox1.ImageLocation = ComboBox1.SelectedItem & s.Parent.Tag
        ElseIf s.Level = 1 Then
            PictureBox1.ImageLocation = ComboBox1.SelectedItem & s.Tag
        End If
    End Sub

    Private Sub CardExplorer_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        Select Case LLSIFMenu.language
            Case "zh_trad"
                language = 1
            Case "zh_simp"
                language = 2
            Case "en"
                language = 0
            Case "ja"
                language = 3
            Case Else
                language = 0
        End Select
        Label1.Text = {"Select Server: ", "選擇伺服器：", "选择服务器：", "サーバーを選択："}(language)
        Button1.Text = {"Fetch", "捕取", "捕取", "フェッチ"}(language)
        Button2.Text = {"Select", "選擇", "选择", "選択する"}(language)
    End Sub
End Class