package <%= basePackageName %>.base.presentation.ui.theme


import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.ui.graphics.Color

val primaryLight = Color(0xFF005389)


val homeTitleLight = Color(0xFF013F64)
val homeButton1BackgroundLight = Color(0xFF014399)
val homeButton2BackgroundLight = Color(0xFF2B7CA6)
val cardTitleBackgroundLight = Color(0xFFefefef)
val secondButtonBackgroundLight = Color(0xFF013F64)
val appTitleBackgroundLight = Color(0xFF013F64)
val dropMenuBackgroundLight = Color(0xFFFFFFFF)
val homeButton1ContentLight = Color(0xFFFFFFFF)
val homeButton2ContentLight = Color(0xFFFFFFFF)
val secondButtonContentLight = Color(0xFFFFFFFF)
val switchCheckedThumbColor = Color(0xFF013F64)
val switchCheckedTrackColor = Color(0xFF2B7CA6)

val lightScheme = lightColorScheme(
  primary = primaryLight,
  onPrimary = homeTitleLight,
  primaryContainer = homeButton1BackgroundLight,
  secondaryContainer = homeButton2BackgroundLight,
  tertiaryContainer = cardTitleBackgroundLight,
)