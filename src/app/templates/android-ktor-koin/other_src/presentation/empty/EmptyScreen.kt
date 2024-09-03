package <%= basePackageName %>.<%= presentationForLibrary %>.presentation.<%= presentationBaseClassName %>

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.ramcosta.composedestinations.annotation.Destination
import com.ramcosta.composedestinations.annotation.RootGraph
import com.ramcosta.composedestinations.navigation.DestinationsNavigator
import org.koin.androidx.compose.koinViewModel
import timber.log.Timber

@Destination<RootGraph>
@Composable
fun <%= presentationBaseClassNameCU %>Screen(
  navigator: DestinationsNavigator,
  vm: <%= presentationBaseClassNameCU %>ViewModel = koinViewModel(),
) {
  val eventListStates = vm.eventListStates
  val fireEvent = vm::onEvent
  val eventList = eventListStates.success?.collectAsState()
  LaunchedEffect(key1 = eventListStates) {
    if (eventListStates.success == null) {
      Timber.d("<%= presentationBaseClassNameCU %>Screen LaunchedEffect")
      fireEvent(<%= presentationBaseClassNameCU %>Events.LoadContent)
    }
  }
}