package <%= basePackageName %>.base.presentation.ui.theme

import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.SwitchDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

object WidgetColor {

  @Composable
  fun getPrimaryButton1Color() = ButtonDefaults
    .buttonColors(
      containerColor = MaterialTheme.colorScheme.primaryContainer,
      contentColor = homeButton1ContentLight,
//      disabledContainerColor = MaterialTheme.colorScheme.inversePrimary,
//      disabledContentColor = MaterialTheme.colorScheme.onSurfaceVariant
    )
  @Composable
  fun getPrimaryButton2Color() = ButtonDefaults
    .buttonColors(
      containerColor = MaterialTheme.colorScheme.secondaryContainer,
      contentColor = homeButton2ContentLight,
//      disabledContainerColor = MaterialTheme.colorScheme.inversePrimary,
//      disabledContentColor = MaterialTheme.colorScheme.onSurfaceVariant
    )

  @Composable
  fun getSecondButtonColor() = ButtonDefaults
    .buttonColors(
      containerColor = MaterialTheme.colorScheme.secondaryContainer,
      contentColor = secondButtonContentLight,
//      disabledContainerColor = MaterialTheme.colorScheme.inversePrimary,
//      disabledContentColor = MaterialTheme.colorScheme.onSurfaceVariant
    )

  @Composable
  fun getSwitchButtonColor() = SwitchDefaults
    .colors().copy(
      checkedThumbColor = MaterialTheme.colorScheme.primaryContainer,
      checkedTrackColor = switchCheckedTrackColor,
//      disabledContainerColor = MaterialTheme.colorScheme.inversePrimary,
//      disabledContentColor = MaterialTheme.colorScheme.onSurfaceVariant
    )

  @Composable
  fun getCardTitleBackgroundColor() =
    CardDefaults.cardColors().copy(containerColor = MaterialTheme.colorScheme.tertiaryContainer)

  @Composable
  fun getDropMenuBackgroundLight() = Color.White

  @Composable
  fun getHomeTitleColor() = MaterialTheme.colorScheme.onPrimary
}