package <%= basePackageName %>.album.domain.model

internal data class Track(
    val name: String,
    val duration: Int? = null,
)
