package <%= basePackageName %>.app.presentation

import android.os.Bundle
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.compose.rememberNavController
import com.ramcosta.composedestinations.DestinationsNavHost
import com.ramcosta.composedestinations.generated.navgraphs.RootNavGraph
import org.koin.android.ext.android.inject
import <%= basePackageName %>.base.data.storage.ILocalPreferencesStorage
import <%= basePackageName %>.base.data.storage.Preference
import <%= basePackageName %>.base.presentation.activity.BaseActivity
import <%= basePackageName %>.base.presentation.ui.theme.<%= applicationNameCU %>MaterialTheme
import <%= basePackageName %>.base.utils.localization.LocalLang
import <%= basePackageName %>.base.utils.localization.LocalizationHelper

class MainActivity : BaseActivity() {

  //  private lateinit var navController: NavHostController
  private val prefs: ILocalPreferencesStorage by inject()
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val lang = prefs.getString(Preference.LANGUAGE_KEY, LocalizationHelper.EN)

    setContent {
      <%= applicationNameCU %>MaterialTheme {
        CompositionLocalProvider(LocalLang provides lang) {
          StartAppCompose()
        }
      }
    }
  }
}

@Composable
fun StartAppCompose() {
  val navController = rememberNavController()
  val start = RootNavGraph.defaultStartDirection
  DestinationsNavHost(
    navController = navController,
    navGraph = RootNavGraph,
    modifier = Modifier
      .padding(10.dp)
      .fillMaxSize(),
    start = start
  )
}