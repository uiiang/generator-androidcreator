package <%= basePackageName %>.album.data.datasource.api.model

import <%= basePackageName %>.album.data.datasource.database.model.ImageEntityModel
import <%= basePackageName %>.album.domain.model.Image
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
internal data class ImageApiModel(
    @SerialName("#text") val url: String,
    @SerialName("size") val size: ImageSizeApiModel,
)

internal fun ImageApiModel.toDomainModel() = Image(
    url = this.url,
    size = this.size.toDomainModel(),
)

internal fun ImageApiModel.toEntityModel() =
    this.size.toEntityModel()?.let { ImageEntityModel(this.url, it) }
