package <%= basePackageName %>.base.data.ktor

import io.ktor.client.HttpClient
import io.ktor.client.engine.okhttp.OkHttp
import io.ktor.client.plugins.DefaultRequest
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.defaultRequest
import io.ktor.client.plugins.logging.LogLevel
import io.ktor.client.plugins.logging.Logger
import io.ktor.client.plugins.logging.Logging
import io.ktor.client.plugins.observer.ResponseObserver
import io.ktor.client.request.accept
import io.ktor.client.request.header
import io.ktor.http.ContentType
import io.ktor.http.HttpHeaders
import io.ktor.http.URLProtocol
import io.ktor.http.contentType
import io.ktor.http.path
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.json.Json
import okhttp3.Interceptor
import timber.log.Timber
import java.util.concurrent.TimeUnit

object KtorClientFactory {
  private const val CONNECT_TIMEOUT = 15L
  private const val READ_TIMEOUT = 60L
  private const val WRITE_TIMEOUT = 15L

  private const val LOG_MAX_LENGTH = 1000

  @OptIn(ExperimentalSerializationApi::class)
  fun getInstance(interceptors: List<Interceptor>): HttpClient {
    synchronized(this) {
      val httpClient = HttpClient(OkHttp) {
        engine {
          config {
            connectTimeout(CONNECT_TIMEOUT, TimeUnit.SECONDS)
            writeTimeout(WRITE_TIMEOUT, TimeUnit.SECONDS)
            readTimeout(READ_TIMEOUT, TimeUnit.SECONDS)
//            addInterceptor(AuthenticationInterceptor(appId, appSecret))
//            addInterceptor()
            interceptors.forEach {
              addInterceptor(it)
            }
          }
        }
        install(ContentNegotiation) {
          json(
            Json {
              prettyPrint = true
              isLenient = true
              useAlternativeNames = true
              ignoreUnknownKeys = true
              encodeDefaults = false
              explicitNulls = false
            }
          )
        }

        install(Logging) {
          logger = object : Logger {
            override fun log(message: String) {
              val showLog = if (message.length > LOG_MAX_LENGTH) {
                message.substring(0, LOG_MAX_LENGTH)
              } else {
                message
              }
              Timber.v("Logger Ktor => $showLog")
            }
          }
          level = LogLevel.BODY
        }

        install(ResponseObserver) {
          onResponse { response ->
            Timber.tag("HTTP status:").d(response.status.value.toString())
          }
        }

        install(DefaultRequest) {
          header(
            HttpHeaders.ContentType,
            ContentType.Application.Json
          )
        }

        defaultRequest {
          url {
            host = "api.copymanga.tv"
            protocol = URLProtocol.HTTPS
//            port = 3000
//            path("/api/v3")
          }

//                    bearerAuth(token = token)
          contentType(ContentType.Application.Json)
          accept(ContentType.Application.Json)
        }
      }
      return httpClient
    }
  }
}