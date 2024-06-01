package <%= basePackageName %>.album.data.repository

import <%= basePackageName %>.album.data.datasource.api.model.toDomainModel
import <%= basePackageName %>.album.data.datasource.api.model.toEntityModel
import <%= basePackageName %>.album.data.datasource.api.service.AlbumRetrofitService
import <%= basePackageName %>.album.data.datasource.database.AlbumDao
import <%= basePackageName %>.album.data.datasource.database.model.toDomainModel
import <%= basePackageName %>.album.domain.model.Album
import <%= basePackageName %>.album.domain.repository.AlbumRepository
import <%= basePackageName %>.base.data.retrofit.ApiResult
import <%= basePackageName %>.base.domain.result.Result
import timber.log.Timber

internal class AlbumRepositoryImpl(
    private val albumRetrofitService: AlbumRetrofitService,
    private val albumDao: AlbumDao,
) : AlbumRepository {

    override suspend fun searchAlbum(phrase: String?): Result<List<Album>> =
        when (val apiResult = albumRetrofitService.searchAlbumAsync(phrase)) {
            is ApiResult.Success -> {
                val albums = apiResult
                    .data
                    .results
                    .albumMatches
                    .album
                    .also { albumsApiModels ->
                        val albumsEntityModels = albumsApiModels.map { it.toEntityModel() }
                        albumDao.insertAlbums(albumsEntityModels)
                    }
                    .map { it.toDomainModel() }

                Result.Success(albums)
            }
            is ApiResult.Error -> {
                Result.Failure()
            }
            is ApiResult.Exception -> {
                Timber.e(apiResult.throwable)

                val albums = albumDao
                    .getAll()
                    .map { it.toDomainModel() }

                Result.Success(albums)
            }
        }

    override suspend fun getAlbumInfo(artistName: String, albumName: String, mbId: String?): Result<Album> =
        when (val apiResult = albumRetrofitService.getAlbumInfoAsync(artistName, albumName, mbId)) {
            is ApiResult.Success -> {
                val album = apiResult
                    .data
                    .album
                    .toDomainModel()

                Result.Success(album)
            }
            is ApiResult.Error -> {
                Result.Failure()
            }
            is ApiResult.Exception -> {
                Timber.e(apiResult.throwable)

                val album = albumDao
                    .getAlbum(artistName, albumName, mbId)
                    .toDomainModel()

                Result.Success(album)
            }
        }
}
