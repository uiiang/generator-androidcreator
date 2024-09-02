import com.android.build.api.dsl.ApplicationDefaultConfig
import java.util.Locale

plugins {
    id("local.app")
    id("kotlin-parcelize")
    alias(libs.plugins.compose.compiler)
}

android {
    val catalogs = extensions.getByType<VersionCatalogsExtension>()
    val libs = catalogs.named("libs")

    namespace = "<%= basePackageName %>"

    compileSdk = libs.findVersion("compileSdk").get().toString().toInt()

    defaultConfig {
        minSdk = libs.findVersion("minSdk").get().toString().toInt()

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    defaultConfig {
        applicationId = "<%= basePackageName %>"

        versionCode = 1
        versionName = "0.0.1" // SemVer (Major.Minor.Patch)
        minSdk = 28
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"

        multiDexEnabled = true

        vectorDrawables {
            useSupportLibrary = true
        }

        // buildConfigFieldFromGradleProperty("apiBaseUrl")
        // buildConfigFieldFromGradleProperty("appId")
        // buildConfigFieldFromGradleProperty("appSecret")
        // buildConfigFieldFromGradleProperty("apiToken")
    }

    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            proguardFiles("proguard-android.txt", "proguard-rules.pro")
        }
    }

    buildFeatures {
        buildConfig = true
        compose = true
    }

//    composeOptions {
//        kotlinCompilerExtensionVersion = libs.findVersion("kotlinCompilerExtensionVersion").get().toString()
//    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_17.toString()
    }

    @Suppress("UnstableApiUsage")
    testOptions {
        unitTests.isReturnDefaultValues = true
    }
}

dependencies {
    api(libs.bundles.koin)
    api(libs.bundles.compose)
//    api(libs.bundles.navigation)
    api(libs.bundles.lifecycle)
    api(libs.coroutines)
    api(libs.material)
    api(libs.composeMaterial)
    // Syntax utilizes Gradle TYPESAFE_PROJECT_ACCESSORS feature
    // 在此处添加引用模块代码
    // 例如: implementation(projects.feature[LibraryName])
//    implementation(projects.featureWidget)
    implementation(projects.featureData)
    <% librarys.forEach(item=>{ %>
    implementation(projects.feature<%= item.libraryNameCU %>)
    <% }) %>

    api(libs.tencent.mmkv)
}

/*
Takes value from Gradle project property and sets it as Android build config property eg.
apiToken variable present in the settings.gradle file will be accessible as BuildConfig.GRADLE_API_TOKEN in the app.
 */
fun ApplicationDefaultConfig.buildConfigFieldFromGradleProperty(gradlePropertyName: String) {
    val propertyValue = project.properties[gradlePropertyName] as? String
    checkNotNull(propertyValue) { "Gradle property $gradlePropertyName is null" }

    val androidResourceName = "GRADLE_${gradlePropertyName.toSnakeCase()}".uppercase(Locale.getDefault())
    buildConfigField("String", androidResourceName, propertyValue)
}

fun String.toSnakeCase() = this.split(Regex("(?=[A-Z])")).joinToString("_") { it.lowercase(Locale.getDefault()) }
