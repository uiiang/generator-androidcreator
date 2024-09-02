package <%= basePackageName %>.<%= librarys[idx].libraryName %>.presentation

import org.koin.androidx.viewmodel.dsl.viewModelOf
import org.koin.dsl.module
import <%= basePackageName %>.<%= librarys[idx].libraryName %>.presentation.home.HomeViewModel

// 需要手动添加ViewModel的import，IDE可能无法自动import
val viewModelsModule = module {
  viewModelOf(::HomeViewModel)
}