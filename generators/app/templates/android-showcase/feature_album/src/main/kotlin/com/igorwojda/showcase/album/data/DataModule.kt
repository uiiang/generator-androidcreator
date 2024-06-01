package <%= basePackageName %>.album.data

import androidx.room.Room
import <%= basePackageName %>.album.data.datasource.api.service.AlbumRetrofitService
import <%= basePackageName %>.album.data.datasource.database.AlbumDatabase
import <%= basePackageName %>.album.data.repository.AlbumRepositoryImpl
import <%= basePackageName %>.album.domain.repository.AlbumRepository
import org.koin.dsl.module
import retrofit2.Retrofit

internal val dataModule = module {

    single<AlbumRepository> { AlbumRepositoryImpl(get(), get()) }

    single { get<Retrofit>().create(AlbumRetrofitService::class.java) }

    single {
        Room.databaseBuilder(
            get(),
            AlbumDatabase::class.java,
            "Albums.db",
        ).build()
    }

    single { get<AlbumDatabase>().albums() }
}
