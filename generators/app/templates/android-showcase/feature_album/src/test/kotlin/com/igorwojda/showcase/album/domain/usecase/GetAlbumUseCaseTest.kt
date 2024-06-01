package <%= basePackageName %>.album.domain.usecase

import <%= basePackageName %>.album.data.repository.AlbumRepositoryImpl
import <%= basePackageName %>.album.domain.model.Album
import <%= basePackageName %>.base.domain.result.Result
import io.mockk.coEvery
import io.mockk.coVerify
import io.mockk.mockk
import kotlinx.coroutines.runBlocking
import org.amshove.kluent.shouldBeEqualTo
import org.junit.jupiter.api.Test

class GetAlbumUseCaseTest {

    private val mockAlbumRepository: AlbumRepositoryImpl = mockk()

    private val cut = GetAlbumUseCase(mockAlbumRepository)

    @Test
    fun `return album`() {
        // given
        val albumName = "Thriller"
        val artistName = "Michael Jackson"
        val mbId = "123"

        val album = mockk<Album>()
        coEvery { mockAlbumRepository.getAlbumInfo(artistName, albumName, mbId) } answers { Result.Success(album) }

        // when
        val actual = runBlocking { cut(artistName, albumName, mbId) }

        // then
        actual shouldBeEqualTo Result.Success(album)
    }

    @Test
    fun `return error`() {
        // given
        val albumName = "Thriller"
        val artistName = "Michael Jackson"
        val mbId = "123"
        val resultFailure = mockk<Result.Failure>()

        coEvery { mockAlbumRepository.getAlbumInfo(artistName, albumName, mbId) } returns
            resultFailure

        // when
        val actual = runBlocking { cut(artistName, albumName, mbId) }

        // then
        coVerify { mockAlbumRepository.getAlbumInfo(artistName, albumName, mbId) }
        actual shouldBeEqualTo resultFailure
    }
}
