plugins {
    id("local.library")
    alias(libs.plugins.compose.compiler)
}

android {
    namespace = "<%= basePackageName %>.base"
    buildFeatures {
        compose = true
    }
}

dependencies {
    // See Dependency management section in the README.md
    // https://github.com/igorwojda/android-showcase#dependency-management
    api(libs.kotlin)
    // api(libs.playCore)
    api(libs.coreKtx)
    api(libs.fragmentKtx)
    api(libs.viewBindingPropertyDelegate)
    api(libs.timber)
    api(libs.constraintLayout)
    api(libs.appCompat)
    api(libs.recyclerView)
    api(libs.coroutines)
    api(libs.material)
    api(libs.composeMaterial)
    api(libs.accompanistFlowLayout)
    api(libs.bundles.koin)
    api(libs.bundles.retrofit)
    api(libs.bundles.navigation)
    api(libs.bundles.lifecycle)
    api(libs.bundles.room)
    api(libs.bundles.compose)

    testImplementation(projects.libraryTestUtils)
    testImplementation(libs.bundles.test)

    testRuntimeOnly(libs.junitJupiterEngine)
}
