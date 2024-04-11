//
//  Counter.swift
//  TestingSetup
//
//  Created by Jigar Rajput on 09/04/24.
//

import Foundation

@objc(Counter)
class Counter: NSObject {
  
  private var count = 0
  
  @objc
  func increment(_ callback: RCTResponseSenderBlock) {
    count+=1
//    print(count)
    callback([count])
  }
  
  // This method is should return true if your module should be initialzed before any piece of javascript code
  // executes. if it is okay to you that module initialization can occur regardless of javascript execution you
  // can return false
  
  // The scenario when you will like to have your module initialized before javascript is when your are exporting any
  // constants. second case is when your module creates some UI using UIKit
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  func constantsToExport() -> [String: Any]! {
    return ["initialCount": 0]
  }
}
