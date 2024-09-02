package <%= basePackageName %>.base

import android.app.Application
import com.google.android.material.color.DynamicColors
import com.tencent.mmkv.MMKV
import timber.log.Timber

open class BaseApplication : Application() {
  override fun onCreate() {
    super.onCreate()

    initTimber()
    // 客户定制不需要动态颜色
//        initDynamicColorScheme()
    MMKV.initialize(this)
  }

  private fun initDynamicColorScheme() {
    // Apply dynamic colors to all Activities, Fragments, Views
    // (Material 3 library helper class)
    DynamicColors.applyToActivitiesIfAvailable(this)
  }

  private fun initTimber() {
    if (BuildConfig.DEBUG) {
      Timber.plant(Timber.DebugTree())
    }
  }
}