package <%= basePackageName %>.album.data.datasource.database.model

import <%= basePackageName %>.album.domain.model.Image
import kotlinx.serialization.Serializable

@Serializable
internal data class ImageEntityModel(
    val url: String,
    val size: ImageSizeEntityModel,
)

internal fun ImageEntityModel.toDomainModel() =
    this.size.toDomainModel()?.let { Image(this.url, it) }
