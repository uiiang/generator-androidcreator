package <%= basePackageName %>.base.presentation.activity

import android.content.Context
import androidx.activity.ComponentActivity
import org.koin.android.ext.android.inject
import <%= basePackageName %>.base.data.storage.ILocalPreferencesStorage
import <%= basePackageName %>.base.data.storage.Preference
import <%= basePackageName %>.base.utils.localization.AppContextWrapper
import <%= basePackageName %>.base.utils.localization.LocalizationHelper
import java.util.Locale

open class BaseActivity : ComponentActivity() {
    private val prefs: ILocalPreferencesStorage by inject()

    override fun attachBaseContext(baseContext: Context) {
        val lang = prefs.getString(Preference.LANGUAGE_KEY, LocalizationHelper.EN)
        val initialLocale = Locale(lang, LocalizationHelper.country(lang))

        super.attachBaseContext(AppContextWrapper.wrap(baseContext, initialLocale))
    }
}