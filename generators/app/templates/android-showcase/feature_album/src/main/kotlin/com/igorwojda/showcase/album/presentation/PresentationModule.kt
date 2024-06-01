package <%= basePackageName %>.album.presentation

import coil.ImageLoader
import <%= basePackageName %>.album.presentation.screen.albumdetail.AlbumDetailViewModel
import <%= basePackageName %>.album.presentation.screen.albumlist.AlbumListViewModel
import org.koin.androidx.viewmodel.dsl.viewModelOf
import org.koin.dsl.module

internal val presentationModule = module {

    // AlbumList
    viewModelOf(::AlbumListViewModel)

    single { ImageLoader(get()) }

    // AlbumDetails
    viewModelOf(::AlbumDetailViewModel)
}
