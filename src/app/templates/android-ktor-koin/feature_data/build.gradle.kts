import com.android.build.api.dsl.ApplicationDefaultConfig
import java.util.Locale

plugins {
  id("local.library")
  alias(libs.plugins.compose.compiler)
}

android {
  namespace = "<%= basePackageName %>.data"

  buildFeatures {
    compose = true
  }
}

ksp {
    arg("creator_base_package_name",  "<%= basePackageName %>")
    arg("creator_module_package_name",  "data")
}
dependencies {
  implementation(libs.creator)
  ksp(libs.creator)
  implementation(libs.bundles.room)
//  ksp(libs.roomCompiler)

  implementation(projects.featureBase)
  testImplementation(libs.bundles.test)

  testRuntimeOnly(libs.junitJupiterEngine)
}

/*
Takes value from Gradle project property and sets it as Android build config property eg.
apiToken variable present in the settings.gradle file will be accessible as BuildConfig.GRADLE_API_TOKEN in the app.
 */
fun ApplicationDefaultConfig.buildConfigFieldFromGradleProperty(gradlePropertyName: String) {
  val propertyValue = project.properties[gradlePropertyName] as? String
  checkNotNull(propertyValue) { "Gradle property $gradlePropertyName is null" }

  val androidResourceName =
    "GRADLE_${gradlePropertyName.toSnakeCase()}".uppercase(Locale.getDefault())
  buildConfigField("String", androidResourceName, propertyValue)
}

fun String.toSnakeCase() =
  this.split(Regex("(?=[A-Z])")).joinToString("_") { it.lowercase(Locale.getDefault()) }
