package <%= basePackageName %>.base.presentation.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.windowsizeclass.ExperimentalMaterial3WindowSizeClassApi
import androidx.compose.material3.windowsizeclass.WindowWidthSizeClass
import androidx.compose.material3.windowsizeclass.calculateWindowSizeClass
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat
import timber.log.Timber
import <%= basePackageName %>.base.presentation.activity.BaseActivity

@OptIn(ExperimentalMaterial3WindowSizeClassApi::class)
@Composable
fun <%= applicationNameCU %>MaterialTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    // Dynamic color is available on Android 12+
    dynamicColor: Boolean = false,
    activity: Activity = LocalContext.current as BaseActivity,
    content: @Composable () -> Unit,
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }

        darkTheme -> lightScheme
        else -> lightScheme
    }
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.primary.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = darkTheme
        }
    }

    // 根据屏幕大小决定使用哪种主题配置
    val window = calculateWindowSizeClass(activity = activity)
    val config = LocalConfiguration.current

    // 字体排版
    var typography = CompactTypography
    // 边距尺寸
    var appDimens = CompactDimens
    var appShapes = CompactShapes

    Timber.d("获取屏幕宽度类型为: ${window.widthSizeClass}")
    when (window.widthSizeClass) {
        WindowWidthSizeClass.Compact -> {
            Timber.d("当前屏幕为紧凑型，宽度值为: ${config.screenWidthDp}.dp")
            if (config.screenWidthDp <= 360) {
                Timber.d("\t采用主题配置 CompactSmall")
                appDimens = CompactSmallDimens
                typography = CompactSmallTypography
                appShapes = CompactSmallShapes
            } else if (config.screenWidthDp < 599) {
                Timber.d("\t采用主题配置 CompactMedium")
                appDimens = CompactMediumDimens
                typography = CompactMediumTypography
                appShapes= CompactMediumShapes
            } else {
                Timber.d("\t采用主题配置 Compact")
                appDimens = CompactDimens
                typography = CompactTypography
                appShapes = CompactShapes
            }
        }

        WindowWidthSizeClass.Medium -> {
            Timber.d("当前屏幕为Medium")
            appDimens = MediumDimens
            typography = MediumTypography
            appShapes = MediumShapes
        }

        WindowWidthSizeClass.Expanded -> {
            Timber.d("当前屏幕为Expanded")
            appDimens = ExpandedDimens
            typography = ExpandedTypography
            appShapes = ExpandedShapes
        }

        else -> {
            Timber.d("当前屏幕为Expanded")
            appDimens = ExpandedDimens
            typography = ExpandedTypography
            appShapes = ExpandedShapes
        }
    }

    ProvideAppUtils(appDimens = appDimens, appShapes = appShapes) {
        MaterialTheme(
            colorScheme = colorScheme,
            typography = typography,
            content = content
        )
    }

}
val MaterialTheme.dimens
    @Composable
    get() = LocalAppDimens.current

val MaterialTheme.shape
    @Composable
    get() = LocalAppShapes.current
