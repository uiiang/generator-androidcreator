package <%= basePackageName %>.<%= presentationForLibrary %>.presentation.<%= presentationBaseClassName %>


sealed interface <%= presentationBaseClassNameCU %>Events {
  data object LoadContent : <%= presentationBaseClassNameCU %>Events
}