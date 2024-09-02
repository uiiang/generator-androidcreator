package <%= basePackageName %>.app

// 在此处添加其它模块的引用
import <%= basePackageName %>.BuildConfig
import <%= basePackageName %>.base.baseModule
<% librarys.forEach(item=>{ %>
import <%= basePackageName %>.<%= item.libraryName %>.feature<%= item.libraryNameCU %>Modules
<% }) %>
import org.koin.android.ext.koin.androidContext
import org.koin.android.ext.koin.androidLogger
import org.koin.core.context.startKoin
import <%= basePackageName %>.app.di.customModule
import <%= basePackageName %>.base.BaseApplication
import <%= basePackageName %>.data.featureDataModules

class <%= applicationNameCU %>Application : BaseApplication() {

    override fun onCreate() {
        super.onCreate()
        initKoin()
//        LocalePlugin.init(this, LocaleConstant.RECREATE_CURRENT_ACTIVITY)
    }

    private fun initKoin() {
        startKoin {
            androidLogger()
            androidContext(this@<%= applicationNameCU %>Application)

            modules(appModule)
            modules(baseModule)

            modules(featureDataModules)
            modules(customModule)

            // 在此处添加引用模块
            <% librarys.forEach(item=>{ %>
            modules(feature<%= item.libraryNameCU %>Modules)
            <% }) %>
        }
    }
}
