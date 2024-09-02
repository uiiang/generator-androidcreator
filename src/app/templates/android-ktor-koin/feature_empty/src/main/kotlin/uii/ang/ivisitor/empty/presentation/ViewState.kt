package <%= basePackageName %>.<%= librarys[idx].libraryName %>.presentation

data class ViewState<T>(
  val loading: Boolean = false,
  val success: T? = null,
  val error: String? = null
)