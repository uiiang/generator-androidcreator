package <%= basePackageName %>.base.utils

import android.content.Context
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.net.wifi.WifiManager
import android.util.Patterns
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.net.HttpURLConnection
import java.net.URL

object NetworkUtils {

  suspend fun checkUrlConnection(testUrl: String): Boolean {
      try {
        val url = URL(testUrl)
        val connection: HttpURLConnection =
          withContext(Dispatchers.IO) {
            url.openConnection()
          } as HttpURLConnection
        val code = connection.responseCode
        return true
      } catch (exp: Exception) {
        exp.printStackTrace()
        return false
      }
  }

  /**
   * is ip address
   */
  fun isIpAddress(value: String): Boolean {
    try {
      var addr = value
      if (addr.isEmpty() || addr.isBlank()) {
        return false
      }
      //CIDR
      if (addr.indexOf("/") > 0) {
        val arr = addr.split("/")
        if (arr.count() == 2 && Integer.parseInt(arr[1]) > -1) {
          addr = arr[0]
        }
      }

      // "::ffff:192.168.173.22"
      // "[::ffff:192.168.173.22]:80"
      if (addr.startsWith("::ffff:") && '.' in addr) {
        addr = addr.drop(7)
      } else if (addr.startsWith("[::ffff:") && '.' in addr) {
        addr = addr.drop(8).replace("]", "")
      }

      // addr = addr.toLowerCase()
      val octets = addr.split('.').toTypedArray()
      if (octets.size == 4) {
        if (octets[3].indexOf(":") > 0) {
          addr = addr.substring(0, addr.indexOf(":"))
        }
        return isIpv4Address(addr)
      }

      // Ipv6addr [2001:abc::123]:8080
      return isIpv6Address(addr)
    } catch (e: Exception) {
      e.printStackTrace()
      return false
    }
  }

  fun isPureIpAddress(value: String): Boolean {
    return isIpv4Address(value) || isIpv6Address(value)
  }

  fun isIpv4Address(value: String): Boolean {
    val regV4 =
      Regex("^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$")
    return regV4.matches(value)
  }

  fun isIpv6Address(value: String): Boolean {
    var addr = value
    if (addr.indexOf("[") == 0 && addr.lastIndexOf("]") > 0) {
      addr = addr.drop(1)
      addr = addr.dropLast(addr.count() - addr.lastIndexOf("]"))
    }
    val regV6 =
      Regex("^((?:[0-9A-Fa-f]{1,4}))?((?::[0-9A-Fa-f]{1,4}))*::((?:[0-9A-Fa-f]{1,4}))?((?::[0-9A-Fa-f]{1,4}))*|((?:[0-9A-Fa-f]{1,4}))((?::[0-9A-Fa-f]{1,4})){7}$")
    return regV6.matches(addr)
  }

  private fun isCoreDNSAddress(s: String): Boolean {
    return s.startsWith("https") || s.startsWith("tcp") || s.startsWith("quic")
  }

  /**
   * is valid url
   */
  fun isValidUrl(value: String?): Boolean {
    try {
      if (value != null && Patterns.WEB_URL.matcher(value).matches()) {
        return true
      }
    } catch (e: Exception) {
      e.printStackTrace()
      return false
    }
    return false
  }

  //判断网络状态，有网络返回true
  fun isConnected(context: Context): Boolean {
    return isNetworkConnected(context) || isWiFiConnected(context)
  }

  //判断手机是否有网络连接
  fun isNetworkConnected(context: Context?): Boolean {
    if (context != null) {
      val mConnectivityManager =
        context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
      val mNetworkInfo = mConnectivityManager.activeNetworkInfo
      if (mNetworkInfo != null) {
        return mNetworkInfo.isAvailable
      }
    }
    return false
  }

  fun isWiFiOn(context: Context): Boolean {
    // require permission：ACCESS_WIFI_STATE
    val manger = context.getSystemService(Context.WIFI_SERVICE) as WifiManager
    return manger.wifiState == WifiManager.WIFI_STATE_ENABLED
  }

  fun isWiFiConnected(context: Context): Boolean {
    // require permission：ACCESS_NETWORK_STATE
    val connectivityManager =
      context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
    connectivityManager.getNetworkCapabilities(connectivityManager.activeNetwork)?.run {
      return this.hasTransport(NetworkCapabilities.TRANSPORT_WIFI)
    }

    return false
  }
}
