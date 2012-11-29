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
@synthesize locationManager;

- (void) nativeFunction:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
    
    //get the callback id
    NSString *callbackId = [arguments pop];
    
    NSLog(@"Hello, this is a native function called from PhoneGap/Cordova!");
    
//    I want to get this to run...
//    RegionsViewController *viewController;
//    [viewController addRegion];
    
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
    
    if ([CLLocationManager regionMonitoringAvailable]) {
        CLLocationCoordinate2D coord = CLLocationCoordinate2DMake(42.0,-78.0);
        CLRegion *newRegion = [[CLRegion alloc] initCircularRegionWithCenter:coord
																	  radius:1000.0
																  identifier:[NSString stringWithFormat:@"%f, %f", 42.0, -78.0]];
		
		// Start monitoring the newly created region.
		[self.locationManager startMonitoringForRegion:newRegion desiredAccuracy:kCLLocationAccuracyBest];
		NSLog(@"HI");
        
	}
	else {
		NSLog(@"Region monitoring is not available.");
	}

    
}


@end