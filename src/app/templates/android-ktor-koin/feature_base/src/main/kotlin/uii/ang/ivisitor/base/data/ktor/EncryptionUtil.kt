package <%= basePackageName %>.base.data.ktor

import java.io.UnsupportedEncodingException
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException

object EncryptionUtil {
  fun getSHA256(str: String): String {
    val messageDigest: MessageDigest
    var encodestr = ""
    try {
      messageDigest = MessageDigest.getInstance("SHA-256")
      messageDigest.update(str.toByteArray(charset("UTF-8")))
      encodestr = byte2HexSHA(messageDigest.digest())
    } catch (e: NoSuchAlgorithmException) {
      e.printStackTrace()
    } catch (e: UnsupportedEncodingException) {
      e.printStackTrace()
    }
    //        log.i("getSHA256 encodestr == " + encodestr);
    return encodestr
  }

  private fun byte2HexSHA(bytes: ByteArray): String {
    val stringBuffer = StringBuffer()
    var temp: String? = null
    for (i in bytes.indices) {
      temp = Integer.toHexString(bytes[i].toInt() and 0xFF)
      if (temp.length == 1) {
        stringBuffer.append("0")
      }
      stringBuffer.append(temp)
    }
    return stringBuffer.toString()
  }
}