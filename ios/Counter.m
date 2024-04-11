//
//  Counter.m
//  TestingSetup
//
//  Created by Jigar Rajput on 09/04/24.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(Counter, NSObject)

RCT_EXTERN_METHOD(increment: 
                  (RCTResponseSenderBlock)callback)

@end
