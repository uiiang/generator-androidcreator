package <%= basePackageName %>.data.data.response

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
abstract class BaseResponseObj {
  @SerialName("message")
  open val message: String = ""

  @SerialName("code")
  open val code: Long = 0L
}

fun checkResponseSuccess(result: BaseResponseObj): Boolean {
  return result.code == 200L
}