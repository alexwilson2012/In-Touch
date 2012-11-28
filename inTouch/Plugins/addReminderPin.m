//
//  addReminderPin.m
//  inTouch
//
//  Created by Alex Wilson on 11/28/12.
//
//

#import "RegionsAppDelegate.h"
#import "RegionsViewController.h"
#import "RegionAnnotationView.h"
#import "RegionAnnotation.h"
#import "addReminderPin.h"

@implementation addReminderPin

@synthesize viewController;

- (void) nativeFunction:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
    
    //get the callback id
    NSString *callbackId = [arguments pop];
    
    NSLog(@"Hello, this is a native function called from PhoneGap/Cordova!");
    
//    I want to get this to run...
    RegionsViewController *viewController;
    [viewController addRegion];
    
    NSString *resultType = [arguments objectAtIndex:0];
    CDVPluginResult *result;
    
//    if ( [resultType isEqualToString:@"success"] ) {
        NSString *myString = @"";
        NSString *catString = [myString stringByAppendingString:resultType];
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: catString];
        [self writeJavascript:[result toSuccessCallbackString:callbackId]];
//    }
//    else {
//        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString: @"Error :("];
//        [self writeJavascript:[result toErrorCallbackString:callbackId]];
//    }
}

@end