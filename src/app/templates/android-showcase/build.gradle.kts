plugins {
    id("local.detekt")
    id("local.spotless")
    alias(libs.plugins.compose.compiler) apply false
}
