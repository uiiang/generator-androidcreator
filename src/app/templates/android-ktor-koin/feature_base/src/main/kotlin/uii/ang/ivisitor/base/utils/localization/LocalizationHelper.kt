package <%= basePackageName %>.base.utils.localization

object LocalizationHelper {
  const val ZH = "zh"
  const val EN = "en"

  val langOptions = listOf("简体中文", "English")

  fun code(lang: String): String {
    return when (lang) {
      langOptions[0] -> ZH
      langOptions[1] -> EN
      else -> ZH
    }
  }

//  fun icon(lang: String): Int {
//    return when (lang) {
//      langOptions[0] -> R.drawable.ic_arabic_lang
//      langOptions[1] -> R.drawable.ic_english_lang
//      else -> R.drawable.ic_arabic_lang
//    }
//  }

  fun lang(code: String): String {
    return when (code) {
      ZH -> langOptions[0]
      EN -> langOptions[1]
      else -> langOptions[0]
    }
  }

  fun country(code: String): String {
    return when (code) {
      ZH -> "CN"
      EN -> "US"
      else -> "CN"
    }
  }

//  中文（中国）：values-zh-rCN
//  中文（台湾）：values-zh-rTW
//  中文（香港）：values-zh-rHK
//  英语（美国）：values-en-rUS
//  英语（英国）：values-en-rGB
//  英文（澳大利亚）：values-en-rAU
//  英文（加拿大）：values-en-rCA
//  英文（爱尔兰）：values-en-rIE
  fun fullLocal(code: String): String {
    return when (code) {
      ZH -> "zh-rCN"
      EN -> "en-GB"
      else -> "zh-rCN"
    }
  }
}