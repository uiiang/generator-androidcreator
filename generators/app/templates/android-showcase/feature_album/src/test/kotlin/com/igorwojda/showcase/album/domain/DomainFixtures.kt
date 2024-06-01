package <%= basePackageName %>.album.domain

import <%= basePackageName %>.album.domain.enum.ImageSize
import <%= basePackageName %>.album.domain.model.Album
import <%= basePackageName %>.album.domain.model.Image
import <%= basePackageName %>.album.domain.model.Tag
import <%= basePackageName %>.album.domain.model.Track

object DomainFixtures {

    internal fun getAlbum(
        name: String = "albumName",
        artist: String = "artistName",
        mbId: String? = "mbId",
        images: List<Image> = listOf(getImage()),
        tracks: List<Track> = listOf(getTrack()),
        tags: List<Tag> = listOf(getTag()),
    ): Album = Album(name, artist, mbId, images, tracks, tags)

    internal fun getImage(
        url: String = "url_${ImageSize.EXTRA_LARGE}",
        size: ImageSize = ImageSize.EXTRA_LARGE,
    ) = Image(url, size)

    private fun getTrack(
        name: String = "track",
        duration: Int = 12,
    ) = Track(name, duration)

    private fun getTag(
        name: String = "tag",
    ) = Tag(name)
}
