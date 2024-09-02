package <%= basePackageName %>.base.data.ktor

data class ErrorModel(
    val code: Long,
    val errorMessage: String
)