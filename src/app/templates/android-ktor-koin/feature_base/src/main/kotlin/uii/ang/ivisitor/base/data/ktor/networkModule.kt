package <%= basePackageName %>.base.data.ktor

import org.koin.core.qualifier.named
import org.koin.dsl.module


val networkModule = module {
  single {
    KtorClientFactory.getInstance(
      listOf(
      )
    )
  }
}