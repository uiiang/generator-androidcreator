package <%= basePackageName %>.app

import org.koin.core.qualifier.named
import org.koin.dsl.module
import <%= basePackageName %>.BuildConfig

val appModule = module {
    // APP授权认证
    // single(named("APP_ID")) { BuildConfig.GRADLE_APP_ID }
    // single(named("APP_SECRET")) { BuildConfig.GRADLE_APP_SECRET }
}
