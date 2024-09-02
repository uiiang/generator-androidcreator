package <%= basePackageName %>.data.data

import <%= basePackageName %>.base.data.storage.SpUtils

object CommonDataManager {

  fun saveDataString(key: String, value: String) {
    SpUtils.put(key, value)
  }

  fun saveDataBoolean(key: String, value: Boolean) {
    SpUtils.put(key, value)
  }

  fun getDataString(key: String): String {
    return SpUtils.getString(key) ?: ""
  }

  fun getDataBoolean(key: String): Boolean {
    return SpUtils.getBoolean(key) ?: false
  }

  fun removeKey(saveKey: String) {
    SpUtils.removeKey(saveKey)
  }
}