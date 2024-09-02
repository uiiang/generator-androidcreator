package <%= basePackageName %>.base.data.ktor

import okhttp3.Interceptor
import okhttp3.RequestBody
import okhttp3.Response
import okio.Buffer
import timber.log.Timber

class AuthenticationInterceptor(private val appId: String, private val appSecret: String) : Interceptor {

    override fun intercept(chain: Interceptor.Chain): Response = chain.request().let {
        val request = chain.request()
        val timestamp = currentTime()
        val bodyJson = request.body?.let { body -> bodyToString(body) } ?: ""
        Timber.d("request bodyJson $bodyJson")
        val paramStr =
            "$bodyJson.$appId.${timestamp}.$appSecret"
        val shA256Str = EncryptionUtil.getSHA256(paramStr)

        val url = it.url.newBuilder()
            .addQueryParameter("_sign", shA256Str)
            .addQueryParameter("_appid", appId)
            .addQueryParameter("_timestamp", timestamp.toString())
            .addQueryParameter("_plaintext", "1")
            .build()

        val newRequest = it.newBuilder()
            .url(url)
            .addHeader("Content-Type", "application/json")
            .build()
        Timber.d("${newRequest.url}")
        chain.proceed(newRequest)
    }

    private fun bodyToString(body: RequestBody): String {
        val buffer = Buffer()
        body.writeTo(buffer)
        return buffer.readUtf8()
    }

    private fun currentTime() = System.currentTimeMillis() / 1000
}
