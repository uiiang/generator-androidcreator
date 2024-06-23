plugins {
    id("local.library")
}

android {
    namespace = "<%= basePackageName %>.<%= librarys[idx].libraryName %>"
}

ksp {
    arg("creator_base_package_name",  "<%= basePackageName %>")
    arg("creator_module_package_name",  "<%= librarys[idx].libraryName %>")
}
dependencies {
    implementation(libs.creator)
    ksp(libs.creator)

    api(projects.featureBase)
    testImplementation(projects.libraryTestUtils)
    testImplementation(libs.bundles.test)

    testRuntimeOnly(libs.junitJupiterEngine)
}
