Imports System.Runtime.InteropServices
Public Class Overlaying_video
    Private m_InitialStyle As Integer
    Dim bw As Integer
    Dim bh As Integer
    Property URL
        Get
            Return AxWindowsMediaPlayer1.URL
        End Get
        Set(value)
            AxWindowsMediaPlayer1.URL = value
        End Set
    End Property
    Property Speed
        Get
            Return AxWindowsMediaPlayer1.settings.rate
        End Get
        Set(value)
            AxWindowsMediaPlayer1.settings.rate = value
        End Set
    End Property
    Sub [Stop]()
        AxWindowsMediaPlayer1.Ctlcontrols.stop()
    End Sub
    Sub [Play]()
        AxWindowsMediaPlayer1.settings.volume = 0
        AxWindowsMediaPlayer1.Ctlcontrols.play()
    End Sub
    Sub [Pause]()
        AxWindowsMediaPlayer1.Ctlcontrols.pause()
    End Sub

    Public Enum GWL As Integer
        ExStyle = -20
    End Enum

    Public Enum WS_EX As Integer
        Transparent = &H20
        Layered = &H80000
    End Enum

    <DllImport("user32", EntryPoint:="GetWindowLong")> _
    Public Shared Function GetWindowLong( _
            ByVal hWnd As IntPtr, _
            ByVal nIndex As GWL _
                ) As Integer
    End Function

    <DllImport("user32", EntryPoint:="SetWindowLong")> _
    Public Shared Function SetWindowLong( _
            ByVal hWnd As IntPtr, _
            ByVal nIndex As GWL, _
            ByVal dsNewLong As WS_EX _
                ) As Integer
    End Function

    Public Enum LWA As Integer
        ColorKey = &H1
        Alpha = &H2
    End Enum

    <DllImport("user32.dll", EntryPoint:="SetLayeredWindowAttributes")> _
    Public Shared Function SetLayeredWindowAttributes( _
            ByVal hWnd As IntPtr, _
            ByVal crKey As Integer, _
            ByVal alpha As Byte, _
            ByVal dwFlags As LWA _
                ) As Boolean
    End Function

    Private Sub Timer1_Tick(sender As Object, e As EventArgs) Handles Timer1.Tick
        Me.WindowState = LLSIFMenu.WindowState
        If LLSIFMenu.WindowState = FormWindowState.Normal Then
            Me.Location = LLSIFMenu.Location + New Point(bw, bh)
            Me.Size = LLSIFMenu.ClientSize
        End If
    End Sub

    Private Sub Overlaying_video_Load(sender As Object, e As EventArgs) Handles Me.Load
        m_InitialStyle = GetWindowLong(Me.Handle, GWL.ExStyle)
        SetWindowLong(Me.Handle, GWL.ExStyle, m_InitialStyle Or WS_EX.Layered Or WS_EX.Transparent)
        SetLayeredWindowAttributes(Me.Handle, 0, 255 * (20 / 100), LWA.Alpha)
        Me.TopMost = True
        AxWindowsMediaPlayer1.uiMode = "none"
        bw = (LLSIFMenu.Width - LLSIFMenu.ClientSize.Width) \ 2
        bh = LLSIFMenu.Height - LLSIFMenu.ClientSize.Height - bw
        Me.Location = LLSIFMenu.Location + New Point(bw, bh)
        Me.Size = LLSIFMenu.ClientSize
        Timer1.Start()
        Me.Hide()
    End Sub
End Class
