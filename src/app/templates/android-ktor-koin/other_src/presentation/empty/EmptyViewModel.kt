package <%= basePackageName %>.<%= presentationForLibrary %>.presentation.<%= presentationBaseClassName %>

import android.app.Application
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.launch
import timber.log.Timber
import <%= basePackageName %>.base.custom.CommonConfig
import <%= basePackageName %>.data.data.repository.LocalCfgRepository
import <%= basePackageName %>.<%= presentationForLibrary %>.domain.model.ListElement
import <%= basePackageName %>.<%= presentationForLibrary %>.domain.usecase.GetEventListUseCaseGen
import java.io.IOException

class <%= presentationBaseClassNameCU %>ViewModel(
  application: Application,
  private val commonConfig: CommonConfig,
  private val localCfgRepository: LocalCfgRepository,
) : AndroidViewModel(application) {
  var eventListStates by mutableStateOf(EventListState())
    private set

  fun onEvent(event: <%= presentationBaseClassNameCU %>Events) {
    when (event) {
      is <%= presentationBaseClassNameCU %>Events.LoadContent -> loadContent()
    }
  }

  private fun loadContent() {
    Timber.d("<%= presentationBaseClassNameCU %>ViewModel loadContent")
  }
}