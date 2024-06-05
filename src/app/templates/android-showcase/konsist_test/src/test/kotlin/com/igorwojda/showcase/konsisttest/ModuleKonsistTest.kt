package <%= basePackageName %>.konsisttest

import com.lemonappdev.konsist.api.Konsist
import com.lemonappdev.konsist.api.verify.assert
import org.junit.jupiter.api.Test

// Check architecture coding rules.
class ModuleKonsistTest {

    @Test
    fun `every file in module reside in module specific package`() {
        Konsist.scopeFromProject()
            .files
            .assert {
                // <%= basePackageName %>.<%= mainLibraryName %>.presentation.screen.<%= mainLibraryName %>detail
                val modulePackageName = it.moduleName
                    .lowercase()
                    .replace("feature_", "")
                    .replace("library_", "")
                    .replace("_", "")

                val fullyQualifiedPackageName = "<%= basePackageName %>.$modulePackageName"

                it.packagee?.fullyQualifiedName?.startsWith(fullyQualifiedPackageName)
            }
    }
}
