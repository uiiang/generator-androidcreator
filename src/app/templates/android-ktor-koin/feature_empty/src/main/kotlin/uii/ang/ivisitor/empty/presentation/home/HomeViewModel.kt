package <%= basePackageName %>.<%= librarys[idx].libraryName %>.presentation.home

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
import <%= basePackageName %>.data.domain.model.Results
import <%= basePackageName %>.data.domain.usecase.GetBookGroupByNameUseCaseGen
import java.io.IOException

class HomeViewModel(
  application: Application,
  private val bookGroupByNameUseCaseGen: GetBookGroupByNameUseCaseGen,
  private val commonConfig: CommonConfig,
  private val localCfgRepository: LocalCfgRepository,
) : AndroidViewModel(application) {
  var bookGroupStates by mutableStateOf(BookGroupState())
    private set

  fun onEvent(event: HomeEvents) {
    when (event) {
      is HomeEvents.LoadHomeContent -> loadContent()
    }
  }

  private fun loadContent() {
    Timber.d("HomeViewModel loadContent")
    fetchBookGroup()
  }

  private var fetchBookGroupJob: Job? = null
  private fun fetchBookGroup() {
    Timber.d("HomeViewModel fetchBookGroup")
    fetchBookGroupJob = viewModelScope.launch(Dispatchers.IO) {
      bookGroupStates = bookGroupStates.copy(loading = true)
      try {
        Timber.d("HomeViewModel start fetch bookGroup")
        bookGroupByNameUseCaseGen("jiandieguojiajia")
          .distinctUntilChanged()
          .collect { result ->

            Timber.d("HomeViewModel fetch bookGroup get")
            bookGroupStates = bookGroupStates.copy(
              loading = false,
              success = MutableStateFlow(result.value!!)
            )
          }
      } catch (ioe: IOException) {
        bookGroupStates = bookGroupStates.copy(
          loading = false,
          error = "Unknown Error",
        )
      }
    }
  }
}

data class BookGroupState(
  val loading: Boolean = false,
  val success: MutableStateFlow<Results>? = null,
  val error: String? = null
)

data class HomeDisplay(
  val showDebug: Boolean = true,
)
