package <%= basePackageName %>.album.domain.usecase

import <%= basePackageName %>.album.domain.model.Album
import <%= basePackageName %>.album.domain.repository.AlbumRepository
import <%= basePackageName %>.base.domain.result.Result

internal class GetAlbumUseCase(
    private val albumRepository: AlbumRepository,
) {

    suspend operator fun invoke(
        artistName: String,
        albumName: String,
        mbId: String?,
    ): Result<Album> = albumRepository.getAlbumInfo(artistName, albumName, mbId)
}
