package <%= basePackageName %>.<%= librarys[idx].libraryName %>.presentation.screen.<%= librarys[idx].libraryName %>

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.tooling.preview.Preview
import <%= basePackageName %>.base.presentation.activity.BaseFragment
import <%= basePackageName %>.base.presentation.compose.composable.UnderConstructionAnim

class <%= librarys[idx].libraryNameCU %>Fragment : BaseFragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return ComposeView(requireContext()).apply {
            setContent {
                <%= librarys[idx].libraryNameCU %>Screen()
            }
        }
    }
}

@Preview
@Composable
private fun <%= librarys[idx].libraryNameCU %>Screen() {
    UnderConstructionAnim()
}
