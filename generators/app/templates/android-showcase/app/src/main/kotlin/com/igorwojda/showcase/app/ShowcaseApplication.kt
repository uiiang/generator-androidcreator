package <%= basePackageName %>.app

import android.app.Application
import com.google.android.material.color.DynamicColors
import <%= basePackageName %>.BuildConfig
import <%= basePackageName %>.base.baseModule
import <%= basePackageName %>.<%= libraryName %>.feature<%= libraryNameCU %>Modules
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
            modules(feature<%= libraryNameCU %>Modules)
        }
    }

    private fun initTimber() {
        if (BuildConfig.DEBUG) {
            Timber.plant(Timber.DebugTree())
        }
    }
}
