package <%= basePackageName %>.konsisttest

import androidx.lifecycle.ViewModel
import com.lemonappdev.konsist.api.Konsist
import com.lemonappdev.konsist.api.ext.list.withParentClassOf
import com.lemonappdev.konsist.api.verify.assert
import org.junit.jupiter.api.Test

// Check Android specific coding rules.
class AndroidKonsistTest {
    @Test
    fun `classes extending 'ViewModel' should have 'ViewModel' suffix`() {
        Konsist.scopeFromProject()
            .classes()
            .withParentClassOf(ViewModel::class)
            .assert { it.name.endsWith("ViewModel") }
    }
}
