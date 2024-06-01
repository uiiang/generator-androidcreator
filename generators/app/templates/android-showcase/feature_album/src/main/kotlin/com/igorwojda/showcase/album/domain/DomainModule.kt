package <%= basePackageName %>.album.domain

import <%= basePackageName %>.album.domain.usecase.GetAlbumListUseCase
import <%= basePackageName %>.album.domain.usecase.GetAlbumUseCase
import org.koin.core.module.dsl.singleOf
import org.koin.dsl.module

internal val domainModule = module {

    singleOf(::GetAlbumListUseCase)

    singleOf(::GetAlbumUseCase)
}
