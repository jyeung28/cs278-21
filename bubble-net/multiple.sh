#!/bin/bash
declare -a simulators=("72778CC6-0748-46DF-A05E-B9DBBFA35961" "B84BFAB1-868D-4306-AC66-DE5449655A83" )

for i in "${simulators[@]}"
do
    xcrun instruments -w $i
    #xcrun simctl install $i ~/.expo/ios-simulator-app-cache/Exponent-2.14.0.app
    xcrun simctl openurl $i exp://127.0.0.1:19000      
done