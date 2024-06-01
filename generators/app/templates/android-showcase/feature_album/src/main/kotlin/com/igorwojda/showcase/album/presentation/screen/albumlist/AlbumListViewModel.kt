package <%= basePackageName %>.album.presentation.screen.albumlist

import androidx.compose.runtime.Immutable
import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.viewModelScope
import <%= basePackageName %>.album.domain.model.Album
import <%= basePackageName %>.album.domain.usecase.GetAlbumListUseCase
import <%= basePackageName %>.album.presentation.screen.albumlist.AlbumListViewModel.Action
import <%= basePackageName %>.album.presentation.screen.albumlist.AlbumListViewModel.UiState
import <%= basePackageName %>.album.presentation.screen.albumlist.AlbumListViewModel.UiState.Content
import <%= basePackageName %>.album.presentation.screen.albumlist.AlbumListViewModel.UiState.Error
import <%= basePackageName %>.album.presentation.screen.albumlist.AlbumListViewModel.UiState.Loading
import <%= basePackageName %>.base.domain.result.Result
import <%= basePackageName %>.base.presentation.nav.NavManager
import <%= basePackageName %>.base.presentation.viewmodel.BaseAction
import <%= basePackageName %>.base.presentation.viewmodel.BaseState
import <%= basePackageName %>.base.presentation.viewmodel.BaseViewModel
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch

internal class AlbumListViewModel(
    private val savedStateHandle: SavedStateHandle,
    private val navManager: NavManager,
    private val getAlbumListUseCase: GetAlbumListUseCase,
) : BaseViewModel<UiState, Action>(Loading) {

    companion object {
        const val DEFAULT_QUERY_NAME = "Jackson"
        private const val SAVED_QUERY_KEY = "query"
    }

    fun onEnter(query: String? = (savedStateHandle.get(SAVED_QUERY_KEY) as? String) ?: DEFAULT_QUERY_NAME) {
        getAlbumList(query)
    }

    private var job: Job? = null

    private fun getAlbumList(query: String?) {
        if (job != null) {
            job?.cancel()
            job = null
        }

        savedStateHandle[SAVED_QUERY_KEY] = query

        job = viewModelScope.launch {
            getAlbumListUseCase(query).also { result ->
                val action = when (result) {
                    is Result.Success -> {
                        if (result.value.isEmpty()) {
                            Action.AlbumListLoadFailure
                        } else {
                            Action.AlbumListLoadSuccess(result.value)
                        }
                    }
                    is Result.Failure -> {
                        Action.AlbumListLoadFailure
                    }
                }
                sendAction(action)
            }
        }
    }

    fun onAlbumClick(album: Album) {
        val navDirections =
            AlbumListFragmentDirections.actionAlbumListToAlbumDetail(album.artist, album.name, album.mbId)

        navManager.navigate(navDirections)
    }

    internal sealed interface Action : BaseAction<UiState> {
        class AlbumListLoadSuccess(private val albums: List<Album>) : Action {
            override fun reduce(state: UiState) = Content(albums)
        }

        object AlbumListLoadFailure : Action {
            override fun reduce(state: UiState) = Error
        }
    }

    @Immutable
    internal sealed interface UiState : BaseState {
        data class Content(val albums: List<Album>) : UiState
        object Loading : UiState
        object Error : UiState
    }
}
