package com.obalauncher

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import android.telephony.SignalStrength
import android.telephony.TelephonyManager
import androidx.core.app.ActivityCompat
import com.facebook.react.bridge.*

class SignalModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "SignalModule"

  @ReactMethod
  fun getCurrentLevel(promise: Promise) {
    try {
      val tm = reactContext.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager

      if (ActivityCompat.checkSelfPermission(
          reactContext,
          Manifest.permission.ACCESS_FINE_LOCATION
        ) != PackageManager.PERMISSION_GRANTED &&
        ActivityCompat.checkSelfPermission(
          reactContext,
          Manifest.permission.READ_PHONE_STATE
        ) != PackageManager.PERMISSION_GRANTED
      ) {
        // sem permissão → devolve 0 (sem sinal)
        promise.resolve(0)
        return
      }

      val strength: SignalStrength? =
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
          tm.signalStrength          // API 28+
        } else {
          tm.signalStrength          // compatibilidade; em alguns devices pode ser null
        }

      val level = strength?.level ?: 0   // 0..4
      promise.resolve(level)
    } catch (e: Exception) {
      promise.resolve(0)
    }
  }
}
