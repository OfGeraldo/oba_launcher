package com.obalauncher

import android.content.Intent
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SystemActionsModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName() = "SystemActionsModule"

   @ReactMethod
  fun openSamsungLauncher() {
    try {
      // Opção 1: Tentar abrir o seletor de Home explicitamente
      val intent = Intent(Intent.ACTION_MAIN)
      intent.addCategory(Intent.CATEGORY_HOME)
      intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
      
      // Isso força o sistema a perguntar qual launcher usar, 
      // ou abre o outro se você remover o seu como padrão antes.
      reactContext.startActivity(intent)

      // DICA: Se você quer abrir o da Samsung DIRETAMENTE, tente este pacote alternativo
      // Alguns Samsungs usam este nome de pacote:
      /*
      val samsungPkg = "com.sec.android.app.launcher" 
      val launchIntent = reactContext.packageManager.getLaunchIntentForPackage(samsungPkg)
      if (launchIntent != null) {
          launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
          reactContext.startActivity(launchIntent)
      }
      */
      
    } catch (e: Exception) {
      e.printStackTrace()
    }
  }

  @ReactMethod
  fun openDefaultAppsSettings() {
    try {
      val intent = Intent(android.provider.Settings.ACTION_HOME_SETTINGS)
      intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
      reactContext.startActivity(intent)
    } catch (e: Exception) {
      // Fallback para configurações gerais se a tela específica falhar
      val intent = Intent(android.provider.Settings.ACTION_SETTINGS)
      intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
      reactContext.startActivity(intent)
    }
  }
}
