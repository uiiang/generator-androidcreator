package <%= basePackageName %>.base.presentation.ui.theme

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.runtime.remember
import androidx.compose.ui.platform.LocalConfiguration

@Composable
fun ProvideAppUtils(
  appDimens: Dimens,
  appShapes: Shapes,
  content: @Composable () -> Unit,
) {
  val appDimens = remember { appDimens }
  val appShapes = remember { appShapes }
  CompositionLocalProvider(LocalAppDimens provides appDimens, LocalAppShapes provides appShapes) {
    content()
  }
}

val LocalAppShapes = compositionLocalOf { CompactShapes }
val LocalAppDimens = compositionLocalOf { CompactDimens }

val ScreenOrientation
  @Composable
  get() = LocalConfiguration.current.orientation