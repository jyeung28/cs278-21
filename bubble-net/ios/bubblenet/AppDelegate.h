#import <Foundation/Foundation.h>
#import <EXUpdates/EXUpdatesAppController.h>
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <Firebase.h>
#import <UMCore/UMAppDelegateWrapper.h>
@import Firebase;
@interface AppDelegate : UMAppDelegateWrapper <RCTBridgeDelegate, EXUpdatesAppControllerDelegate>

@end
