package <%= basePackageName %>.album.domain.model

import <%= basePackageName %>.album.domain.enum.ImageSize

internal data class Image(
    val url: String,
    val size: ImageSize,
)
