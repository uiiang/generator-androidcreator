package <%= basePackageName %>.<%= librarys[idx].libraryName %>

import <%= basePackageName %>.<%= librarys[idx].libraryName %>.data.dataModule
import <%= basePackageName %>.<%= librarys[idx].libraryName %>.domain.domainModule
import <%= basePackageName %>.<%= librarys[idx].libraryName %>.presentation.viewModelsModule

val feature<%= librarys[idx].libraryNameCU %>Modules = listOf(
//    presentationModule,
    viewModelsModule,
    domainModule,
    dataModule,
)
