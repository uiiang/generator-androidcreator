package <%= basePackageName %>.album.presentation.screen.albumdetail

import androidx.compose.runtime.Immutable
import androidx.lifecycle.viewModelScope
import <%= basePackageName %>.album.domain.model.Album
import <%= basePackageName %>.album.domain.model.Tag
import <%= basePackageName %>.album.domain.model.Track
import <%= basePackageName %>.album.domain.usecase.GetAlbumUseCase
import <%= basePackageName %>.album.presentation.screen.albumdetail.AlbumDetailViewModel.Action
import <%= basePackageName %>.album.presentation.screen.albumdetail.AlbumDetailViewModel.Action.AlbumLoadFailure
import <%= basePackageName %>.album.presentation.screen.albumdetail.AlbumDetailViewModel.Action.AlbumLoadSuccess
import <%= basePackageName %>.album.presentation.screen.albumdetail.AlbumDetailViewModel.UiState
import <%= basePackageName %>.album.presentation.screen.albumdetail.AlbumDetailViewModel.UiState.Content
import <%= basePackageName %>.album.presentation.screen.albumdetail.AlbumDetailViewModel.UiState.Loading
import <%= basePackageName %>.base.domain.result.Result
import <%= basePackageName %>.base.presentation.viewmodel.BaseAction
import <%= basePackageName %>.base.presentation.viewmodel.BaseState
import <%= basePackageName %>.base.presentation.viewmodel.BaseViewModel
import kotlinx.coroutines.launch

internal class AlbumDetailViewModel(
    private val getAlbumUseCase: GetAlbumUseCase,
) : BaseViewModel<UiState, Action>(Loading) {

    fun onEnter(args: AlbumDetailFragmentArgs) {
        getAlbum(args)
    }

    private fun getAlbum(args: AlbumDetailFragmentArgs) {
        viewModelScope.launch {
            getAlbumUseCase(args.artistName, args.albumName, args.mbId).also {
                when (it) {
                    is Result.Success -> {
                        sendAction(AlbumLoadSuccess(it.value))
                    }
                    is Result.Failure -> sendAction(AlbumLoadFailure)
                }
            }
        }
    }

    internal sealed interface Action : BaseAction<UiState> {
        class AlbumLoadSuccess(private val album: Album) : Action {
            override fun reduce(state: UiState) = Content(
                artistName = album.artist,
                albumName = album.name,
                coverImageUrl = album.getDefaultImageUrl() ?: "",
                tracks = album.tracks,
                tags = album.tags,
            )
        }

        object AlbumLoadFailure : Action {
            override fun reduce(state: UiState) = UiState.Error
        }
    }

    @Immutable
    internal sealed interface UiState : BaseState {
        data class Content(
            val albumName: String = "",
            val artistName: String = "",
            val coverImageUrl: String = "",
            val tracks: List<Track>? = emptyList(),
            val tags: List<Tag>? = emptyList(),
        ) : UiState

        object Loading : UiState
        object Error : UiState
    }
}
