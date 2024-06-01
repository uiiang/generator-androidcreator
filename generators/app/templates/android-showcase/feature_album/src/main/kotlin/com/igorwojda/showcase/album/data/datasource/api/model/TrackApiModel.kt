package <%= basePackageName %>.album.data.datasource.api.model

import <%= basePackageName %>.album.data.datasource.database.model.TrackEntityModel
import <%= basePackageName %>.album.domain.model.Track
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
internal data class TrackApiModel(
    @SerialName("name") val name: String,
    @SerialName("duration") val duration: Int? = null,
)

internal fun TrackApiModel.toDomainModel() = Track(
    name = this.name,
    duration = this.duration,
)

internal fun TrackApiModel.toEntityModel() = TrackEntityModel(
    name = this.name,
    duration = this.duration,
)
