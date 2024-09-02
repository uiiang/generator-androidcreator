package <%= basePackageName %>.data.data.repository

public interface LocalCfgRepository {
  fun saveDataString(key: String, value: String)
  fun saveDataBoolean(key: String, value: Boolean)
  fun getDataString(key: String): String
  fun getDataBoolean(key: String): Boolean
  fun removeKey(saveKey: String)
}