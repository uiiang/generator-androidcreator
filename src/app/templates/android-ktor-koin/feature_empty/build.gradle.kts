import com.android.build.api.dsl.ApplicationDefaultConfig
import java.util.Locale

plugins {
  id("local.library")
  id("kotlin-parcelize")
  alias(libs.plugins.compose.compiler)
}

android {
  namespace = "<%= basePackageName %>.<%= librarys[idx].libraryName %>"
  defaultConfig {
    testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
  }
  buildFeatures {
    compose = true
  }
}

ksp {
    arg("creator_base_package_name",  "<%= basePackageName %>")
    arg("creator_module_package_name",  "<%= librarys[idx].libraryName %>")
}
dependencies {
  api(libs.bundles.third.pack)
  ksp(libs.compose.destinations.ksp)
  api(libs.bundles.koin)
  api(libs.tencent.mmkv)
  api(libs.bundles.jetpack)

  ksp(libs.creator)

  api(projects.featureBase)
  api(projects.featureData)

  androidTestImplementation(libs.bundles.test)
  debugImplementation(libs.bundles.android.test)
}

