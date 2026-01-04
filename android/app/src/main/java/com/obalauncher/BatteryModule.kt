package com.obalauncher

import android.content.Context
import android.os.BatteryManager
import com.facebook.react.bridge.*

class BatteryModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "BatteryModule"

  @ReactMethod
  fun getBatteryLevel(promise: Promise) {
    try {
      val bm = reactContext.getSystemService(Context.BATTERY_SERVICE) as BatteryManager
      val level = bm.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
      // BATTERY_PROPERTY_CAPACITY → porcentagem 0–100 em muitos devices.[web:143][web:141]
      promise.resolve(level)
    } catch (e: Exception) {
      promise.resolve(0)
    }
  }
}
