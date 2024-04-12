//
//  Counter.m
//  TestingSetup
//
//  Created by Jigar Rajput on 09/04/24.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(Counter, RCTEventEmitter)

RCT_EXTERN_METHOD(increment: 
                  (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(startEventsContinuously)
RCT_EXTERN_METHOD(stopSendingContinuously)
RCT_EXTERN_METHOD(decrement: (RCTPromiseResolveBlock)resolve reject: (RCTPromiseRejectBlock)reject)

@end
