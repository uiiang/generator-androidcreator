rootProject.name = "<%= applicationName %>"

include(
    ":app",
    ":feature_base",
    // 在此处添加自定义library
    // 例如: ":feature_[libraryName]"
<% librarys.forEach(item=>{ %>
    ":feature_<%= item.libraryName %>",
<% }) %>
    ":library_test_utils",
    ":konsist_test",
)

pluginManagement {
    repositories {
        gradlePluginPortal()
        google()
        mavenCentral()
    }
}

@Suppress("UnstableApiUsage")
dependencyResolutionManagement {
    repositories {
        google()
        // Added for testing local Konsist artifacts
        mavenLocal()
        mavenCentral()
    }
}

// Generate type safe accessors when referring to other projects eg.
// Before: implementation(project(":feature_album"))
// After: implementation(projects.featureAlbum)
enableFeaturePreview("TYPESAFE_PROJECT_ACCESSORS")
