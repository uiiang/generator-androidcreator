plugins {
    id("local.library")
    alias(libs.plugins.compose.compiler)
}

android {
    namespace = "<%= basePackageName %>.konsistTest"
}

dependencies {
    implementation(projects.featureBase)

    testImplementation(projects.libraryTestUtils)
    testImplementation(libs.bundles.test)

    testRuntimeOnly(libs.junitJupiterEngine)
}
