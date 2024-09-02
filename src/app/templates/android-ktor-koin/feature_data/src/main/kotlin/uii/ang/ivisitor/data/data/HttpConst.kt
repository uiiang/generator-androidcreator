package <%= basePackageName %>.data.data

import org.koin.java.KoinJavaComponent.inject
import <%= basePackageName %>.data.data.repository.LocalCfgRepository

object HttpConst {

    private val localCfgRepository: LocalCfgRepository by inject(
        LocalCfgRepository::class.java
    )
    private var baseUrl: String = "www.baidu.com"
    private var protocol: String = "https"

    fun getProtocol() = protocol
    fun getHost() = baseUrl

    fun updateProtocol(newProtocol: String) {
        protocol = newProtocol
    }

    fun updateHost(newUrl: String) {
        baseUrl = newUrl
    }
}