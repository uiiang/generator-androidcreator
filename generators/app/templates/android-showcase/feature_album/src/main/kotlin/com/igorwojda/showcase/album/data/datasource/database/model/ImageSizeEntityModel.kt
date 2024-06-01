package <%= basePackageName %>.album.data.datasource.database.model

import <%= basePackageName %>.album.domain.enum.ImageSize

internal enum class ImageSizeEntityModel {
    MEDIUM, SMALL, LARGE, EXTRA_LARGE, MEGA
}

internal fun ImageSizeEntityModel.toDomainModel() =
    ImageSize.values().firstOrNull { it.ordinal == this.ordinal }
