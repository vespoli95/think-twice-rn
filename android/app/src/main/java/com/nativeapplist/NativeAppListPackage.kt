package com.nativeapplist

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class NativeAppListPackage : BaseReactPackage() {

  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
    if (name == NativeAppListModule.NAME) {
      NativeAppListModule(reactContext)
    } else {
      null
    }

  override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
    mapOf(
      NativeAppListModule.NAME to ReactModuleInfo(
        name = NativeAppListModule.NAME,
        className = NativeAppListModule.NAME,
        canOverrideExistingModule = false,
        needsEagerInit = false, 
        isCxxModule = false,
        isTurboModule = true
      )
    )
  }
}