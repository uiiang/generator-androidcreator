package <%= basePackageName %>.data.data.response

import <%= basePackageName %>.base.data.ktor.ErrorModel

open class CallFailure(val errorModel: ErrorModel) : Throwable()
fun getCallFailure(result: BaseResponseObj): CallFailure {
    return CallFailure(
        ErrorModel(
            code = result.code,
            errorMessage = "ApiServer error"
        )
    )
}