package <%= basePackageName %>.base.data.storage

import android.content.Context
import com.tencent.mmkv.MMKV

class MmkvStorage constructor(val context: Context) : ILocalPreferencesStorage {

  fun initSP() {
    MMKV.initialize(context)
  }

  override fun putInt(key: String, value: Int) {
    SpUtils.put(key, value)
  }

  override fun getInt(key: String, defaultValue: Int): Int {
    return SpUtils.getInt(key) ?: defaultValue
  }

  override fun putLong(key: String, value: Long) {
    SpUtils.put(key, value)
  }

  override fun getLong(key: String, defaultValue: Long): Long {
    return SpUtils.getLong(key) ?: defaultValue
  }

  override fun putString(key: String, value: String) {
    SpUtils.put(key, value)
  }

  override fun getString(key: String, defaultValue: String): String {
    return SpUtils.getString(key) ?: defaultValue
  }

  override fun putBoolean(key: String, value: Boolean) {
    SpUtils.put(key, value)
  }

  override fun getBoolean(key: String, defaultValue: Boolean): Boolean {
    return SpUtils.getBoolean(key) ?: defaultValue
  }

}