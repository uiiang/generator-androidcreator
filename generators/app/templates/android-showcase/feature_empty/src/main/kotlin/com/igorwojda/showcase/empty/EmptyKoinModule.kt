package <%= basePackageName %>.<%= libraryName %>

import <%= basePackageName %>.<%= libraryName %>.data.dataModule
import <%= basePackageName %>.<%= libraryName %>.domain.domainModule
import <%= basePackageName %>.<%= libraryName %>.presentation.presentationModule

val feature<%= libraryNameCU %>Modules = listOf(
    presentationModule,
    domainModule,
    dataModule,
)
