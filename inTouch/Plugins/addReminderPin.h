//
//  addReminderPin.h
//  inTouch
//
//  Created by Alex Wilson on 11/28/12.
//
//


#import <Cordova/CDV.h>

@interface addReminderPin : CDVPlugin

- (void) nativeFunction:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end