plugins {
    id("local.library")
}

android {
    namespace = "<%= basePackageName %>.album"
}

dependencies {
    implementation(projects.featureBase)

    ksp(libs.roomCompiler)

    testImplementation(projects.libraryTestUtils)
    testImplementation(libs.bundles.test)

    testRuntimeOnly(libs.junitJupiterEngine)
}
