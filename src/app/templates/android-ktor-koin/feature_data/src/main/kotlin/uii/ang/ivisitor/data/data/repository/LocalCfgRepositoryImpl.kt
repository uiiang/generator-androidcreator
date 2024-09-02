package <%= basePackageName %>.data.data.repository

import <%= basePackageName %>.data.data.CommonDataManager

class LocalCfgRepositoryImpl : LocalCfgRepository {
  override fun saveDataString(key: String, value: String) {
    CommonDataManager.saveDataString(key, value)
  }

  override fun saveDataBoolean(key: String, value: Boolean) {
    CommonDataManager.saveDataBoolean(key, value)
  }

  override fun getDataString(key: String): String {
    return CommonDataManager.getDataString(key)
  }

  override fun getDataBoolean(key: String): Boolean {
    return CommonDataManager.getDataBoolean(key)
  }

  override fun removeKey(saveKey: String) {
    CommonDataManager.removeKey(saveKey)
  }
}