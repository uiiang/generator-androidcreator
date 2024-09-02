package <%= basePackageName %>.base.presentation.ui.theme

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

data class Dimens(
  val extraSmall: Dp = 0.dp,
  val small1: Dp = 5.dp,
  val small2: Dp = 10.dp,
  val small3: Dp = 15.dp,
  val small4: Dp = 20.dp,
  val small5: Dp = 25.dp,
  val medium1: Dp = 30.dp,
  val medium2: Dp = 40.dp,
  val medium3: Dp = 60.dp,
  val medium4: Dp = 70.dp,
  val large: Dp = 110.dp,
  val logoSize: Dp = 55.dp,
  // 按钮高度
  val buttonHeight: Dp = 40.dp,
  // 首页按钮左右边距
  val homeBtnPadding: Dp = 200.dp,
  // 首页标题与按钮间距
  val homeBtnPaddingTitle: Dp = 70.dp,
  // 签出成功页，两行文字上下间距
  val checkOutSuccessTitlePadding: Dp = 40.dp,
  // 首页按钮内容与边框的边距
  val homeButtonContentPadding: PaddingValues = PaddingValues(
    top = small4,
    bottom = small3,
    start = medium2,
    end = small4
  ),
  // 屏幕与卡片之间的间距
  val screenPaddingCard: PaddingValues = PaddingValues(
    start = small4,
    top = small2,
    end = small4,
    bottom = small4
  ),
  // 卡片与内容之间的间距
  val cardPaddingContent: Dp = 10.dp,
  // 列表高度
  val listHeight: Dp = 250.dp,
  // 弹出下拉菜单高度
  val dropMenuHeight: Dp = 500.dp,
  // 弹出下拉菜单宽度
  val dropMenuWidth: Dp = 200.dp,
  // 输入框高度
  val textFieldHeight: Dp = medium2,
  // 输入框与文字之间的边距
  val textFieldPadding: PaddingValues = PaddingValues(horizontal = small2, vertical = extraSmall)
)

val CompactSmallDimens = Dimens(
  small1 = 0.dp,
  small2 = 5.dp,
  small3 = 10.dp,
  medium1 = 15.dp,
  medium2 = 26.dp,
  medium3 = 30.dp,
  large = 45.dp,
  buttonHeight = 30.dp,
  logoSize = 36.dp,
  homeBtnPadding = 30.dp,
  homeBtnPaddingTitle = 30.dp,
  screenPaddingCard = PaddingValues(10.dp),
  cardPaddingContent = 5.dp
)

val CompactMediumDimens = Dimens(
  small1 = 8.dp,
  small2 = 13.dp,
  small3 = 17.dp,
  medium1 = 25.dp,
  medium2 = 10.dp,
  medium3 = 35.dp,
  large = 65.dp,
  homeBtnPadding = 20.dp,
  homeBtnPaddingTitle = 10.dp,
  screenPaddingCard = PaddingValues(10.dp),
  cardPaddingContent = 10.dp,
  // 首页按钮内容与边框的边距
  homeButtonContentPadding = PaddingValues(
    top = 10.dp,
    bottom = 10.dp,
    start = 20.dp,
    end = 20.dp
  ),
  textFieldHeight = 40.dp
)

val CompactDimens = Dimens(
  small1 = 10.dp,
  small2 = 15.dp,
  small3 = 20.dp,
  medium1 = 30.dp,
  medium2 = 36.dp,
  medium3 = 40.dp,
  large = 80.dp,
  homeBtnPadding = 30.dp,
  homeBtnPaddingTitle = 30.dp,
  screenPaddingCard = PaddingValues(10.dp),
  cardPaddingContent = 10.dp
)

val MediumDimens = Dimens(
  small1 = 5.dp,
  small2 = 10.dp,
  small3 = 15.dp,
  small4 = 20.dp,
  small5 = 25.dp,
  medium1 = 30.dp,
  medium2 = 40.dp,
  medium3 = 60.dp,
  medium4 = 70.dp,
  large = 110.dp,
  logoSize = 55.dp,
  homeBtnPadding = 150.dp,
  homeBtnPaddingTitle = 70.dp,
  screenPaddingCard = PaddingValues(start = 20.dp, top = 10.dp, end = 20.dp),
  cardPaddingContent = 20.dp,
  listHeight = 250.dp,
  dropMenuHeight = 500.dp,
  dropMenuWidth = 200.dp,
)

val ExpandedDimens = Dimens(
  small1 = 15.dp,
  small2 = 20.dp,
  small3 = 25.dp,
  medium1 = 35.dp,
  medium2 = 70.dp,
  medium3 = 45.dp,
  large = 130.dp,
  logoSize = 72.dp,
  homeBtnPadding = 180.dp,
  homeBtnPaddingTitle = 120.dp,
)
