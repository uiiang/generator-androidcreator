package <%= basePackageName %>.base.presentation.ui

import android.app.Activity
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable

interface ICustomTheme {
  @Composable
  fun MaterialTheme(darkTheme: Boolean,
                    dynamicColor: Boolean,
                    activity: Activity,
                    content: @Composable () -> Unit)
}

interface ICustomColor{}