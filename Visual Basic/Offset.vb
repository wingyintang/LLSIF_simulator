Public Class Offset
    Public joffset As Integer = 0
    Public goffset As Integer = 0
    Public playeroffset As Integer = 15
    Public playerspeed As Double = 1
    Dim judgement_offset As String = "Judgement Offset: "
    Dim graphics_offset As String = "Graphics Offset: "
    Dim Non_MIDI_offset As String = "Non-MIDI Offset: "
    Dim speed As String = "Speed: "
    Public successful As Boolean = False
    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        successful = True
        Me.Close()
    End Sub

    Private Sub CheckBox1_CheckedChanged() Handles Autoplay.CheckedChanged
        Allmiss.Enabled = Autoplay.Checked
        If Not Autoplay.Checked Then
            Allmiss.Checked = False
        End If
    End Sub

    Private Sub TrackBar1_Scroll() Handles Juoffset.Scroll
        Joffset = Juoffset.Value * 10
        Label1.Text = judgement_offset & {"", "", "+"}(Math.Sign(Juoffset.Value) + 1) & Juoffset.Value
    End Sub

    Private Sub TrackBar2_Scroll() Handles Groffset.Scroll
        goffset = Groffset.Value * 10
        Label2.Text = graphics_offset & {"", "", "+"}(Math.Sign(Groffset.Value) + 1) & Groffset.Value
    End Sub

    Private Sub TrackBar3_Scroll() Handles Mioffset.Scroll
        playeroffset = Mioffset.Value
        Label3.Text = Non_MIDI_offset & {"", "", "+"}(Math.Sign(Mioffset.Value) + 1) & Mioffset.Value / 10
    End Sub

    Private Sub TrackBar4_Scroll() Handles SpeedBar.Scroll
        playerspeed = 2 ^ (SpeedBar.Value / 100)
        Label4.Text = speed & CInt(playerspeed * 100).ToString & "%"
    End Sub

    Private Sub Offset_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        successful = False
        Dim Autoplay_text As String = "Auto Play"
        Dim Allmiss_text As String = "All Miss"
        Select Case LLSIFMenu.language
            Case "zh_trad"
                Autoplay_text = "自動播放"
                Allmiss_text = "全部Miss"
                judgement_offset = "判定偏差："
                graphics_offset = "圖像偏差："
                Non_MIDI_offset = "非MIDI檔偏差："
                speed = "速度："
            Case "zh_simp"
                Autoplay_text = "自动播放"
                Allmiss_text = "全部Miss"
                judgement_offset = "判定偏差："
                graphics_offset = "图像偏差："
                Non_MIDI_offset = "非MIDI档偏差："
                speed = "速度："
            Case "en"
                Autoplay_text = "Auto Play"
                Allmiss_text = "All Miss"
                judgement_offset = "Judgement Offset: "
                graphics_offset = "Graphics Offset: "
                Non_MIDI_offset = "Non-MIDI Offset: "
                speed = "Speed: "
            Case "ja"
                Autoplay_text = "自動再生"
                Allmiss_text = "全部Missになる"
                judgement_offset = "判定オフセット："
                graphics_offset = "画像オフセット："
                Non_MIDI_offset = "非MIDIオフセット："
                speed = "速度："
            Case Else
                Autoplay_text = "Auto Play"
                Allmiss_text = "All Miss"
                judgement_offset = "Judgement Offset: "
                graphics_offset = "Graphics Offset: "
                Non_MIDI_offset = "Non-MIDI Offset: "
                speed = "Speed: "
        End Select
        Autoplay.Text = Autoplay_text
        Allmiss.Text = Allmiss_text
        Label1.Text = judgement_offset & {"", "", "+"}(Math.Sign(Juoffset.Value) + 1) & Juoffset.Value
        Label2.Text = graphics_offset & {"", "", "+"}(Math.Sign(Groffset.Value) + 1) & Groffset.Value
        Label3.Text = Non_MIDI_offset & {"", "", "+"}(Math.Sign(Mioffset.Value) + 1) & Mioffset.Value / 10
        Label4.Text = speed & CInt(playerspeed * 100).ToString & "%"
    End Sub
End Class
