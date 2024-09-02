package <%= basePackageName %>.<%= librarys[idx].libraryName %>.presentation.home

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import coil.compose.AsyncImage
import coil.compose.SubcomposeAsyncImage
import coil.request.CachePolicy
import coil.request.ImageRequest
import com.ramcosta.composedestinations.annotation.Destination
import com.ramcosta.composedestinations.annotation.RootGraph
import com.ramcosta.composedestinations.navigation.DestinationsNavigator
import org.koin.androidx.compose.koinViewModel
import timber.log.Timber
import <%= basePackageName %>.<%= librarys[idx].libraryName %>.R

/**
 * 首页屏幕
 */
@Destination<RootGraph>(start = true)
@Composable
fun HomeScreen(
  navigator: DestinationsNavigator,
  vm: HomeViewModel = koinViewModel(),
) {
  val bookGroupStates = vm.bookGroupStates
  val fireEvent = vm::onEvent
  val bookGroup = bookGroupStates.success?.collectAsState()
  LaunchedEffect(key1 = bookGroupStates) {
    if (bookGroupStates.success == null) {
      Timber.d("HomeScreen LaunchedEffect")
      fireEvent(HomeEvents.LoadHomeContent)
    }
  }
  bookGroup?.let { book ->
    book.value.comic?.let {
      Row {
        AsyncImage(
          model = it.cover,
          contentDescription = null,
        )
        Column {
          Text(text = it.name)
          Text(text = it.alias)
          Text(text = it.brief)
        }
      }
    }
  }
}
