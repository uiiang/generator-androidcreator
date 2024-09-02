package <%= basePackageName %>.base.presentation.ui.theme

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

data class Shapes(
  val cornerRadius: Dp = 4.dp,
  val noCornerShape: RoundedCornerShape =
    RoundedCornerShape(
      topStart = 0.dp,
      topEnd = 0.dp,
      bottomStart = 0.dp,
      bottomEnd = 0.dp
    ),
  val cornerShapeStart: RoundedCornerShape =
    RoundedCornerShape(
      topStart = cornerRadius,
      topEnd = 0.dp,
      bottomStart = cornerRadius,
      bottomEnd = 0.dp
    ),
  val cornerShapeEnd: RoundedCornerShape = RoundedCornerShape(
    topStart = 0.dp,
    topEnd = cornerRadius,
    bottomStart = 0.dp,
    bottomEnd = cornerRadius
  ),
  val cornerShapeTop: RoundedCornerShape =
    RoundedCornerShape(
      topStart = cornerRadius,
      topEnd = cornerRadius,
      bottomStart = 0.dp,
      bottomEnd = 0.dp
    ),
  val cornerShapeBottom: RoundedCornerShape =
    RoundedCornerShape(
      topStart = 0.dp,
      topEnd = 0.dp,
      bottomStart = cornerRadius,
      bottomEnd = cornerRadius
    ),
  val cornerShapeAll: RoundedCornerShape =
    RoundedCornerShape(
      topStart = cornerRadius,
      topEnd = cornerRadius,
      bottomStart = cornerRadius,
      bottomEnd = cornerRadius
    ),
  val homeButtonShape: RoundedCornerShape = RoundedCornerShape(100.dp),
  val borderShape: BorderStroke = BorderStroke(1.dp, Color.Red)
)

val CompactSmallShapes = Shapes()
val CompactMediumShapes = Shapes()
val CompactShapes = Shapes()
val MediumShapes = Shapes()
val ExpandedShapes = Shapes()