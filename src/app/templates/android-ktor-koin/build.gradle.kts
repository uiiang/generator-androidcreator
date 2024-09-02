plugins {
    alias(libs.plugins.compose.compiler) apply false
}
apply(from = "publish.gradle.kts")