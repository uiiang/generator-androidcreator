package <%= basePackageName %>.base

import kotlinx.coroutines.Dispatchers
import org.koin.core.qualifier.named
import org.koin.dsl.module
import <%= basePackageName %>.base.data.storage.ILocalPreferencesStorage
import <%= basePackageName %>.base.data.storage.MmkvStorage

val baseModule = module {

  single(named("ioDispatcher")) { Dispatchers.IO }
  single(named("defaultDispatcher")) { Dispatchers.Default }

//  singleOf(::NavHostController)
  single<ILocalPreferencesStorage> {
    MmkvStorage(context = get())
  }
}
