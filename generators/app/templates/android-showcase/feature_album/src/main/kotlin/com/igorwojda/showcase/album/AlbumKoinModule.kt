package <%= basePackageName %>.album

import <%= basePackageName %>.album.domain.domainModule
import <%= basePackageName %>.album.presentation.presentationModule

val featureAlbumModules = listOf(
    presentationModule,
    domainModule,
    <%= basePackageName %>.album.data.dataModule,
)
