package <%= basePackageName %>.data.data

import org.koin.dsl.module
import timber.log.Timber
import <%= basePackageName %>.data.data.repository.LocalCfgRepository
import <%= basePackageName %>.data.data.repository.LocalCfgRepositoryImpl

val dataModule = module {

    single<LocalCfgRepository> { LocalCfgRepositoryImpl() }

    Timber.d("in dataModule start create database")
}
