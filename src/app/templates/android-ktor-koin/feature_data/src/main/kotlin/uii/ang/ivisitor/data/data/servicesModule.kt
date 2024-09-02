package <%= basePackageName %>.data.data

import org.koin.core.qualifier.named
import org.koin.dsl.module
import <%= basePackageName %>.base.data.ktor.networkModule

val servicesModule = module {
  // TODO 运行时动态切换url地址
//  single<Interceptor> { DynamicBaseUrlInterceptor() }
  includes(networkModule)
//  single(named("HTTP_PROTOCOL")) { HttpConst.getProtocol() }
//  single(named("HTTP_URL")) { HttpConst.getHost() }
}