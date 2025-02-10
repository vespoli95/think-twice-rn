package com.nativeapplist

import com.facebook.react.bridge.ReactApplicationContext
import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
import com.nativeapplist.NativeAppListSpec

class NativeAppListModule(reactContext: ReactApplicationContext) : NativeAppListSpec(reactContext) {

  override fun getName() = NAME

  override fun getInstalledApps(): WritableArray {
    val packageManager: PackageManager = reactApplicationContext.packageManager
    val writableArray: WritableArray = WritableNativeArray()

    val appList = packageManager.getInstalledApplications(PackageManager.GET_META_DATA)

    for (appInfo in appList) {
      val appMap = WritableNativeMap().apply {
        // Basic app information
        putString("packageName", appInfo.packageName)
        putString("name", appInfo.loadLabel(packageManager).toString())
        putDouble("flags", appInfo.flags.toDouble())
        putString("sourceDir", appInfo.sourceDir)

        // Metadata from AndroidManifest.xml
        appInfo.metaData?.let { bundle ->
          val metaDataMap = WritableNativeMap()
          for (key in bundle.keySet()) {
            bundle.getString(key)?.let { value ->
              metaDataMap.putString(key, value)
            }
          }
          putMap("metaData", metaDataMap)
        }

        // Additional useful fields
        putString("processName", appInfo.processName)
        putDouble("targetSdkVersion", appInfo.targetSdkVersion.toDouble())
        putString("dataDir", appInfo.dataDir)
      }
      writableArray.pushMap(appMap)
    }

    return writableArray
  }

  companion object {
    const val NAME = "NativeAppList"
  }
}