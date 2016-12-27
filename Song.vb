Public Class Song
    Public format As Integer = 13 'osu file format
    Public sifformat As Integer = 13 'sif file format
    Public Filename As String = ""
    Public FullAudioFilename As String = ""
    'osu general
    Public hasaudio As Boolean = True
    Public hasvideo As Boolean = False
    Public midiAudio As Boolean = False
    Public AudioFilename As String = "" 'the location of the audio file relative to the current folder
    Public VideoFilename As String = "" 'LLSIF the location of the audio file relative to the current folder
    Public ImageFilename As String = "" 'LLSIF the location of the audio file relative to the current folder
    Public Picture As String = "" 'LLSIF the location of the audio file relative to the current folder
    Public Image(100) As String 'LLSIF the location of the audio file relative to the current folder
    Public AudioLeadIn As Integer = 0 '(ms) the amount of time added before the audio file begins playing.
    Public AudioHash As String = "" 'audio hash (deprecated)
    Public Element As String = "All" 'LLSIF: Smile|Pure|Cool
    Public PreviewTime As Integer = -1 '(ms) when the audio file should begin playing when selected in the song selection menu
    Public Countdown As Boolean = False '(0|1)whether or not a countdown occurs before the first hit object appears.
    Public SampleSet As String = "Normal" '(Normal|Soft|Drum)which set of hit sounds will be used throughout the beatmap
    Public StackLeniency As Double = 0.7 'how often closely placed hit objects will be stacked together.
    Public Mode As Integer = 0 '(0=osu!, 1=Taiko, 2=Catch the Beat, 3=osu!mania) the game mode of the beatmap
    Public LetterboxInBreaks As Boolean = False '(0|1)whether the letterbox appears during breaks
    Public WidescreenStoryboard As Boolean = False '(0|1)whether or not the storyboard should be widescreen
    Public EpilepsyWarning As Boolean = False 'whether to show an epilepsy warning
    'Metadata
    Public Title As String = "" 'the title of the song limited to ASCII characters
    Public TitleUnicode As String = "" '(title) the title of the song with unicode support
    Public Artist As String = "" 'the name of the song's artist limited to ASCII characters
    Public ArtistUnicode As String = "" '(artist)the name of the song's artist with unicode support
    Public Lyrics As String = "" 'LLSIF
    Public Compose As String = "" 'LLSIF
    Public Arrange As String = "" 'LLSIF
    Public People As String = "" 'LLSIF
    Public Numrow As Integer = 9 'LLSIF
    Public LeftText As String = "" 'LLSIF
    Public RightText As String = "" 'LLSIF
    Public Creator As String = "" 'the username of the mapper
    Public Version As String = "" 'the name of the beatmap's difficulty
    Public Source As String = "" 'the origin of the song
    Public Tags() As String = {} 'a collection of words describing the song which are searchable in both the online listings and in the song selection menu
    Public BeatmapID As Integer = 0 'the ID of the single beatmap
    Public BeatmapSetID As Integer = 0 'the ID of the beatmap set
    Public Bgcode As Integer  'LLSIF (1 to 12)
    'Difficulty
    Public HPDrainRate As Double = 5 '(0~10)the HP Drain difficulty
    Public Speed As Double = 1 'LLSIF
    Public Grade() As Integer = {50000, 100000, 150000, 200000}
    Public ComboGrade() As Integer = {100, 200, 300, 400}
    Public CircleSize As Double = 4 '(2-7)the size of hit object circles
    Public OverallDifficulty As Double = 5 '(0~10)the amount of time allowed to click a hit object on time
    Public ApproachRate As Double = 5 '(0~10)the amount of time taken for the approach circle and hit object to appear
    Public SliderMultiplier As Double = 1.4 'a multiplier for the (slider velocity)
    Public SliderTickRate As Double = 6 'how often slider ticks appear (N per beat)
    'Timimg
    Public Timing_Point() As TimingPoint = {}
    'Colours
    Public ComboColor() As Color = {Color.FromArgb(0, 202, 0), Color.FromArgb(18, 124, 255), Color.FromArgb(242, 24, 57), Color.FromArgb(255, 192, 0)}
    'Hit Objects
    Public Hit_Object() As HitObject = {}
    Public Effect() As Effect = {}
    'Others
    Public objcount As Integer = 0
    Public slidercount As Integer = 0
    Public circlecount As Integer = 0
    Public spinnercount As Integer = 0
    Public starcount As Integer = 0
    Public Function ComboMultiplier(c As Integer) As Double
        Dim combomulti() As Integer = {1, 51, 51, 101, 201, 401, 601, 801}
        Dim p = -1
        For i = 0 To combomulti.Length - 1
            If c >= combomulti(i) Then
                p += 1
            End If
        Next
        Return 1 + 0.05 * p
    End Function
    Public Function scoreapprox() As Integer
        Dim s As Integer = 0
        For i As Integer = 0 To Hit_Object.Length - 1
            Dim t As HitObject = Hit_Object(i)
            If t.type = 2 Then
                s += CInt(Math.Floor(50000 * 0.01890625 * ComboMultiplier(i + 1)))
            Else
                s += CInt(Math.Floor(50000 * 0.015125 * ComboMultiplier(i + 1)))
            End If
        Next
        Return s
    End Function
End Class
Public Class HitObject
    Public location As Point 'in osupixel (1:1 in 640x480) (x:0~512, y:0~384)
    Public locationsif As Integer '1 to 9
    Public locationsif2 As Double '(uses degree), for type 3
    Public c1 As Integer
    Public c2 As Integer
    Public processed1 As Boolean = False
    Public processed2 As Boolean = False
    Public large As Boolean = False 'LLSIF ver 4
    Public parallel As Boolean = False
    Public star As Boolean = False
    Public events As Boolean = False
    Public Element As String = "All" 'LLSIF: Smile|Pure|Cool
    Public time As Double '(ms) from the beginning of the song
    Public [type] As Integer 'circle = 1 slider = 2 new combo = 4 spinner = 8 moving circle = 3
    Public hitsound As Integer 'whistle = 2 finish = 4 clap = 8
    Public endtime As Double 'Spinner only
    Public slidertype As String 'Slider only
    Public slidercurve(0) As Point 'Slider only
    Public repeat As Integer 'Slider only
    Public pixelLength As Integer 'Slider only
    Public edgeHitsound As String 'Slider only
    Public edgeAddition As String 'Slider only
    Public addition As String = "0:0:0:0:" 'Optional
    Public ApproachRate As Double = 5 '(0~10)the amount of time taken for the approach circle and hit object to appear
End Class
Public Class Effect
    Public starttime As Integer
    Public endtime As Integer
    Public eventcode As Integer
    Public parameter() As Integer
End Class
Public Class TimingPoint
    Public Offset As Integer = 0 '(ms) when the Timing Point takes effect
    Public MillisecondsPerBeat As Double = 120 'defines the beats per minute of the song
    Public Meter As Integer = 4 'the number of beats in a measure
    Public SampleType As Integer 'the type of hit sound samples that are used
    Public SampleSet As Integer 'the set of hit sounds that are used
    Public Volume As Integer = 100 '(0~100) the volume of hit sounds
    Public Inherited As Boolean = True '(0~100) the volume of hit sounds
    Public KiaiMode As Boolean = False '(0~100) the volume of hit sounds
End Class