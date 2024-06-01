package <%= basePackageName %>.album.domain.usecase

import <%= basePackageName %>.album.domain.model.Album
import <%= basePackageName %>.album.domain.repository.AlbumRepository
import <%= basePackageName %>.base.domain.result.Result
import <%= basePackageName %>.base.domain.result.mapSuccess

internal class GetAlbumListUseCase(
    private val albumRepository: AlbumRepository,
) {

    suspend operator fun invoke(query: String?): Result<List<Album>> {
        val result = albumRepository
            .searchAlbum(query)
            .mapSuccess {
                val albumsWithImages = value.filter { it.getDefaultImageUrl() != null }

                copy(value = albumsWithImages)
            }

        return result
    }
}
