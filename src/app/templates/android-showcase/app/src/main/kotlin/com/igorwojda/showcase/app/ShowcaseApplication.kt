package <%= basePackageName %>.app

import android.app.Application
import com.google.android.material.color.DynamicColors
import <%= basePackageName %>.BuildConfig
import <%= basePackageName %>.base.baseModule
// 在此处添加其它模块的引用
<% librarys.forEach(item=>{ %>
import <%= basePackageName %>.<%= item.libraryName %>.feature<%= item.libraryNameCU %>Modules
<% }) %>
import org.koin.android.ext.koin.androidContext
import org.koin.android.ext.koin.androidLogger
import org.koin.core.context.GlobalContext
import timber.log.Timber

class <%= applicationNameCU %>Application : Application() {

    override fun onCreate() {
        super.onCreate()

        initKoin()
        initTimber()
        initDynamicColorScheme()
    }

    private fun initDynamicColorScheme() {
        // Apply dynamic colors to all Activities, Fragments, Views
        // (Material 3 library helper class)
        DynamicColors.applyToActivitiesIfAvailable(this)
    }

    private fun initKoin() {
        GlobalContext.startKoin {
            androidLogger()
            androidContext(this@<%= applicationNameCU %>Application)

            modules(appModule)
            modules(baseModule)
            // 在此处添加引用模块
            <% librarys.forEach(item=>{ %>
            modules(feature<%= item.libraryNameCU %>Modules)
            <% }) %>
            
        }
    }

    private fun initTimber() {
        if (BuildConfig.DEBUG) {
            Timber.plant(Timber.DebugTree())
        }
    }
}
