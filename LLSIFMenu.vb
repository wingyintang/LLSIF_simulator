Public Class LLSIFMenu
    Public language As String = "en"
    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        If OpenFileDialog1.ShowDialog() = Windows.Forms.DialogResult.OK Then
            Dim filetype As String = If(Strings.InStr(OpenFileDialog1.FileName, ".") > 0, Strings.Mid(OpenFileDialog1.FileName, Strings.InStrRev(OpenFileDialog1.FileName, ".") + 1), "")
            Offset.ShowDialog()
            If Offset.successful Then
                Select Case filetype
                    Case "sif"
                        sifreader.readsif(OpenFileDialog1.FileName)
                    Case "osu"
                        osureader.readosu(OpenFileDialog1.FileName)
                    Case "mid"
                        'readmidi(OpenFileDialog1.FileName)
                    Case "midi"
                        'readmidi(OpenFileDialog1.FileName)
                End Select
            End If
        End If
    End Sub
    Private Sub changelanguage()
        Dim Button1_text As String = "Load files"
        Dim Button2_text As String = "Load from Card Explorer"
        Dim Label1_text As String = "LLSIF Simulator by TWY"
        Dim Label2_text As String = "Language Settings:"
        Dim LinkLabel1_text As String = "Translation Suggestion"
        Select Case language
            Case "zh_trad"
                Button1_text = "開啟檔案"
                Button2_text = "查卡器譜面"
                Label1_text = "模擬器開發者：TWY"
                Label2_text = "語言設定："
                LinkLabel1_text = "翻譯建議"
            Case "zh_simp"
                Button1_text = "选择档案"
                Button2_text = "查卡器谱面"
                Label1_text = "模拟器开发者：TWY"
                Label2_text = "语言设定："
                LinkLabel1_text = "翻译建议"
            Case "en"
                Button1_text = "Load files"
                Button2_text = "Load from Card Explorer"
                Label1_text = "LLSIF Simulator by TWY"
                Label2_text = "Language Settings:"
                LinkLabel1_text = "Translation Suggestion"
            Case "ja"
                Button1_text = "ファイルを選択"
                Button2_text = "部員データベースから"
                Label1_text = "TWYのスクフェスシミュレーター"
                Label2_text = "言語を選択："
                LinkLabel1_text = "語訳提案"
            Case Else
                Button1_text = "Load files"
                Button2_text = "Load from Card Explorer"
                Label1_text = "LLSIF Simulator by TWY"
                Label2_text = "Language Settings:"
                LinkLabel1_text = "Translation Suggestion"
        End Select
        Button1.Text = Button1_text
        Button2.Text = Button2_text
        Label1.Text = Label1_text
        Label2.Text = Label2_text
        LinkLabel1.Text = LinkLabel1_text
    End Sub
    Private Sub RadioButton1_CheckedChanged(sender As Object, e As EventArgs) Handles RadioButton1.CheckedChanged
        language = "zh_trad"
        changelanguage()
    End Sub

    Private Sub RadioButton2_CheckedChanged(sender As Object, e As EventArgs) Handles RadioButton2.CheckedChanged
        language = "zh_simp"
        changelanguage()
    End Sub

    Private Sub RadioButton3_CheckedChanged(sender As Object, e As EventArgs) Handles RadioButton3.CheckedChanged
        language = "en"
        changelanguage()
    End Sub

    Private Sub RadioButton4_CheckedChanged(sender As Object, e As EventArgs) Handles RadioButton4.CheckedChanged
        language = "ja"
        changelanguage()
    End Sub

    Private Sub LinkLabel1_LinkClicked(sender As Object, e As LinkLabelLinkClickedEventArgs) Handles LinkLabel1.LinkClicked
        System.Diagnostics.Process.Start(e.Link.LinkData.ToString())
    End Sub

    Private Sub LLSIFMenu_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        LinkLabel1.Links.Add(0, 100, "https://goo.gl/forms/aNxHNCtdgSskFfFM2")
    End Sub
End Class

