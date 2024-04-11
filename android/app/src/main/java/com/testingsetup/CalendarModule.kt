package com.testingsetup; // replace your-apps-package-name with your app’s package name
import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.util.Log
import android.widget.Toast
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.util.Timer
import java.util.TimerTask

class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    // add to CalendarModule.kt
    override fun getName() = "CalendarModule"
    val intervalMillis = 5000L // Change this to set the interval in milliseconds
    val timer = Timer()
    var timerTask: TimerTask? = null

    @ReactMethod
    fun createCalendarEvent(promise: Promise) {
        Log.d("CalendarModule", "Create event called with name:")
        Toast.makeText(reactApplicationContext, "hello my babe!", Toast.LENGTH_SHORT).show()
         promise.resolve("toast shown!!");
    }

    override fun getConstants(): MutableMap<String, Any> =
        hashMapOf("FirstConstant" to "New Event")

    private fun sendEvent(reactContext: ReactContext, eventName: String, params: WritableMap?) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }
//    private var listenerCount = 0
//
//    @ReactMethod
//    fun addListener(eventName: String) {
//        if (listenerCount == 0) {
//            // Set up any upstream listeners or background tasks as necessary
//        }
//
//        listenerCount += 1
//    }
//
//    @ReactMethod
//    fun removeListeners(count: Int) {
//        listenerCount -= count
//        if (listenerCount == 0) {
//            // Remove upstream listeners, stop unnecessary background tasks
//        }
//    }

//    val params = Arguments.createMap().apply {
//        putString("eventProperty", "someValue")
//    }

    @ReactMethod
//    fun getEventsContinuously() {
//        val params = Arguments.createMap().apply {
//            putString("eventProperty", Math.random().toString())
//        }
//
//        val task = object : Runnable {
//            override fun run() {
//                // Call your method here
//                println("Method called")
//                sendEvent(reactApplicationContext, "EventReminder", params)
//            }
//        }
//
//        val intervalMillis = 2000L // Change this to set the interval in milliseconds
//
//        val handler = Handler(Looper.getMainLooper())
//        handler.postDelayed(task, intervalMillis)
//    }

     fun getEventsContinuously() {
             timerTask = object : TimerTask() {

                 override fun run() {
                     val params = Arguments.createMap().apply {
                         putString("eventProperty", Math.random().toString())
                     }
                     sendEvent(reactApplicationContext, "EventReminder", params)
                 }
             }
              timer.scheduleAtFixedRate(timerTask, 0, intervalMillis)
     }

    @ReactMethod
    fun stopContinuousEvents() {
        timerTask?.cancel()
    }

}