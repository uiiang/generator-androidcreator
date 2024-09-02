package <%= basePackageName %>.data.data.api

import okhttp3.HttpUrl
import okhttp3.Interceptor
import okhttp3.Response
import timber.log.Timber
import <%= basePackageName %>.base.utils.NetworkUtils
import <%= basePackageName %>.data.data.HttpConst

class DynamicBaseUrlInterceptor : Interceptor {
  //  val baseUrls: Map<String, String> = emptyMap()
  override fun intercept(chain: Interceptor.Chain): Response {
    Timber.d("in DynamicBaseUrlInterceptor")
    val originalRequest = chain.request()
    val protocol = HttpConst.getProtocol()
    val baseUrl = HttpConst.getHost()

    Timber.d("in DynamicBaseUrlInterceptor 获取protocol=$protocol url=$baseUrl")
    val urls = baseUrl.split(":")
    val url = if (urls.count() > 1) {
      urls[0]
    } else {
      baseUrl
    }
    val port = if (NetworkUtils.isIpv4Address(url)) {
      if (urls.count() > 1) {
        urls[1]
      } else {
        ""
      }
    } else {
      ""
    }
    if (baseUrl.isNotEmpty()) {
      val newHttpUrl = originalRequest.url.newBuilder()
        .scheme(protocol)
        .host(url)
      if (port.isNotEmpty()) {
        newHttpUrl.port(port.toInt())
      } else {
        newHttpUrl.port(HttpUrl.defaultPort(protocol))
      }

      val httpUrl = newHttpUrl.build()
      Timber.d("httpUrl = ${httpUrl.scheme}://${httpUrl.host}:${httpUrl.port}-$port")
      val newRequest = originalRequest.newBuilder()
        .url(httpUrl)
        .addHeader("Content-Type", "application/json")
        .build()
      return chain.proceed(newRequest)
    }
    return chain.proceed(originalRequest)
  }
}