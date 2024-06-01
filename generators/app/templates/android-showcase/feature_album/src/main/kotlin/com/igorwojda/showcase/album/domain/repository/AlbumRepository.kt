package <%= basePackageName %>.album.domain.repository

import <%= basePackageName %>.album.domain.model.Album
import <%= basePackageName %>.base.domain.result.Result

internal interface AlbumRepository {

    suspend fun getAlbumInfo(artistName: String, albumName: String, mbId: String?): Result<Album>

    suspend fun searchAlbum(phrase: String?): Result<List<Album>>
}
