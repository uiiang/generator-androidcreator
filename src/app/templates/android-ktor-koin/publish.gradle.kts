//https://juejin.cn/post/7288155765499478079
//将打印机.aar上传到本地maven
//./gradlew publishToMavenLocal
import org.gradle.api.publish.PublishingExtension
import org.gradle.kotlin.dsl.*

object RepoConfig {
  const val group = "com.brother"
  const val version = "4.7.2"
  const val artifactId = "print"
}

apply(plugin = "maven-publish")

configure<PublishingExtension> {
  repositories {
    mavenLocal()
  }
}


//configurations.maybeCreate("default")
//def publishArtifact = artifacts.add("default", file('libs/BrotherPrintLibrary.aar'))
afterEvaluate {
  extensions.configure<PublishingExtension>("publishing") {
    publications {
      create<MavenPublication>("release") { //对应release 版 build variant
        groupId = RepoConfig.group
        artifactId = RepoConfig.artifactId
        version = RepoConfig.version
        artifact(file("libs/BrotherPrintLibrary.aar"))
      }
    }
  }
}