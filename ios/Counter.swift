//
//  Counter.swift
//  TestingSetup
//
//  Created by Jigar Rajput on 09/04/24.
//

import Foundation

@objc(Counter)
class Counter: RCTEventEmitter {
  
  private var count = 1
  
  @objc
  func increment(_ callback: RCTResponseSenderBlock) {
    count+=1
//    print(count)
    callback([count])
    sendEvent(withName: "onIncrement", body: ["count increase", count])
  }
  
  @objc
  func sayHello()
  {
    NSLog("say hello is getting called")
    sendEvent(withName: "continuousEvent", body: ["hello", Int.random(in: 1...100)])
  }
  
  var timer: Timer?
  
  @objc
  func startEventsContinuously() {
    DispatchQueue.main.async {
      NSLog("continuously wala call hua")
      self.timer = Timer.scheduledTimer(timeInterval: 1, target: self, selector: #selector(self.sayHello), userInfo: nil, repeats: true)
      NSLog("Schedule toh ho raha hai")
    }
  }
  
  @objc
  func stopSendingContinuously() {
    timer?.invalidate()
  }
  
  @objc
  func decrement(_ resolve: RCTPromiseResolveBlock,
                 reject: RCTPromiseRejectBlock)
  {
    var error = NSError(domain: "", code: 200, userInfo: nil)
    
    if(count == 0) {
     reject("Error count", "count can not be negetive", error)
    }
    
    else {
      count-=1;
      resolve("count is \(count)")
      sendEvent(withName: "onDecrement", body: ["count decrease", count])
    }
  }
  
  override func supportedEvents() -> [String]! {
    return ["onIncrement", "onDecrement", "continuousEvent"]
  }
  
  // This method is should return true if your module should be initialzed before any piece of javascript code
  // executes. if it is okay to you that module initialization can occur regardless of javascript execution you
  // can return false
  
  // The scenario when you will like to have your module initialized before javascript is when your are exporting any
  // constants. second case is when your module creates some UI using UIKit
  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  override func constantsToExport() -> [AnyHashable: Any]! {
    return ["initialCount": 0]
  }
}
