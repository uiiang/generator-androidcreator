package <%= basePackageName %>.<%= librarys[idx].libraryName %>.presentation.home


sealed interface HomeEvents {
  data object LoadHomeContent : HomeEvents
}