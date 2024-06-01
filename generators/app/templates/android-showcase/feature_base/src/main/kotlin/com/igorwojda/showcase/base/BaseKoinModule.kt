package <%= basePackageName %>.base

import <%= basePackageName %>.base.presentation.nav.NavManager
import org.koin.dsl.module

val baseModule = module {

    single { NavManager() }
}
