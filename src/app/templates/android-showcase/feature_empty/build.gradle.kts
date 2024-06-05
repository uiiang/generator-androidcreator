plugins {
    id("local.library")
}

android {
    namespace = "<%= basePackageName %>.<%= librarys[idx].libraryName %>"
}

dependencies {
    api(projects.featureBase)

    testImplementation(projects.libraryTestUtils)
    testImplementation(libs.bundles.test)

    testRuntimeOnly(libs.junitJupiterEngine)
}
