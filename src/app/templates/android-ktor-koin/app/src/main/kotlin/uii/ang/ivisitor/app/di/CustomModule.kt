package <%= basePackageName %>.app.di

import org.koin.dsl.module
import <%= basePackageName %>.app.custom.CommonConfigImpl
import <%= basePackageName %>.base.custom.CommonConfig


val customModule = module {
  single<CommonConfig> { CommonConfigImpl }
}