#!/bin/bash

# ----
# Text Colors and Messaging Functions

textReset=$(tput sgr0)
textRed=$(tput setaf 1)
textGreen=$(tput setaf 2)
textYellow=$(tput setaf 3)

message_info () {
  echo "$textGreen[project]$textReset $1"
}
message_warn () {
  echo "$textYellow[project]$textReset $1"
}
message_error () {
  echo "$textRed[project]$textReset $1"
}

# ----
# Help Output

show_help () {
  echo ""
  message_info "This script performs the necessary command-line operations for this app."
  message_info ""
  message_info "The following options are available:"
  message_info ""
  message_info "    -c (--clean): Removes generated directories and content. Combine with -i."
  message_info "    -h (--help): Displays this help message."
  message_info "    -i (--init): Runs all operations necessary for initialization."
  message_info "    -n (--icons): Copies icon and splash screen images to platform directories."
  message_info "    -p (--plugins): (Re)Installs all plugins."
  message_info "    -u (--update): Update platform codebase, runs 'cordova prepare'."
  message_info ""
  message_info "Examples:"
  message_info ""
  message_info "    ./project.sh   # This is the same as using the -i option."
  message_info "    ./project.sh -c -i"
  echo ""
}

# ----
# Script Option Parsing

init=0;
plugins=0;
icons=0;
clean=0;
update=0;

while :; do
  case $1 in
    -h | --help | -\?)
      show_help
      exit 0
      ;;
    -i | --init)
      init=1
      ;;
    -p | --plugins)
      plugins=1
      ;;
    -n | --icons)
      icons=1
      ;;
    -c | --clean)
      clean=1
      ;;
    -u | --update)
      update=1
      ;;
    --) # End of all options
      break
      ;;
    -*)
      echo ""
      message_error "WARN: Unknown option (ignored): $1"
      show_help
      exit 1
      ;;
    *)  # no more options. Stop while loop
      break
      ;;
  esac
  shift
done

if [[ $plugins = 0 ]] && [[ $icons = 0 ]] && [[ $clean = 0 ]] && [[ $update = 0 ]] ; then
  # If no options specified then we're doing initialization.
  init=1
fi

# ----
# Clean

if [[ $clean = 1 ]] ; then
  if [[ -d "plugins" ]] ; then
    message_info "Removing 'plugins' directory."
    rm -rf plugins
  fi

  if [[ -d "platforms" ]] ; then
    message_info "Removing 'platforms' directory."
    rm -rf platforms
  fi
fi

if [[ $plugins = 0 ]] && [[ $icons = 0 ]] && [[ $init = 0 ]] && [[ $update = 0 ]] ; then
  exit 0
fi

# ----
# Make sure necessary directories exist, regardless of options.

if [[ ! -d "plugins" ]] ; then
  message_info "Creating 'plugins' directory."
  mkdir plugins
fi

if [[ ! -d "platforms" ]] ; then
  message_info "Creating 'platforms' directory."
  mkdir platforms
fi

# ----
# Add platforms

if [[ $init = 1 ]] ; then
  # TODO Check if platforms have already been added
  # 'cordova platforms'

  message_info "Adding Android platform..."
  cordova platform add android

  # message_info "Adding iOS platform..."
  # cordova platform add ios

  # Overriding platform config files
  cp www/res/config/android/AndroidManifest.xml platforms/android/AndroidManifest.xml
fi

# ----
# Copy App Icons and Splash Screen Images

if [[ $init = 1 ]] || [[ $icons = 1 ]] ; then
  # This would probably be better if we parsed www/config.xml,
  # but for now we know the files and where they need to go.

  message_info "Copying Android app icons and splash screen images..."
  cp www/res/icon/android/icon-48.png platforms/android/res/drawable-ldpi/icon.png
  cp www/res/icon/android/icon-48.png platforms/android/res/drawable-mdpi/icon.png
  cp www/res/icon/android/icon-72.png platforms/android/res/drawable-hdpi/icon.png
  cp www/res/icon/android/icon-96.png platforms/android/res/drawable-xhdpi/icon.png
  cp www/res/icon/android/icon-96.png platforms/android/res/drawable/icon.png

  cp www/res/screen/android/screen-ldpi-portrait.png platforms/android/res/drawable-port-ldpi/screen.png
  cp www/res/screen/android/screen-mdpi-portrait.png platforms/android/res/drawable-port-mdpi/screen.png
  cp www/res/screen/android/screen-hdpi-portrait.png platforms/android/res/drawable-port-hdpi/screen.png
  cp www/res/screen/android/screen-xhdpi-portrait.png platforms/android/res/drawable-port-xhdpi/screen.png
  cp www/res/screen/android/screen-xhdpi-portrait.png platforms/android/res/drawable/screen.png

  # message_info "Copying iOS app icons and splash screen images..."
  # cp www/res/icon/ios/*.png platforms/ios/GlobeCat\ Scan/Resources/icons/

  # cp www/res/screen/ios/screen-iphone-portrait.png platforms/ios/GlobeCat\ Scan/Resources/splash/Default~iphone.png
  # cp www/res/screen/ios/screen-iphone-portrait-2x.png platforms/ios/GlobeCat\ Scan/Resources/splash/Default@2x~iphone.png
  # cp www/res/screen/ios/screen-iphone-portrait-568h-2x.png platforms/ios/GlobeCat\ Scan/Resources/splash/Default-568h@2x~iphone.png

fi

# ----
# Add Plugins

if [[ $init = 1 ]] || [[ $plugins = 1 ]] ; then

  message_info "Adding Device Plugin..."
  cordova plugin add https://github.com/apache/cordova-plugin-device.git

  message_info "Adding Sensing Ability Plugin..."
  cordova plugin add https://github.com/pmrazovic/cordova-sensing-ability-plugin.git

  message_info "Adding Console Plugin..."
  cordova plugin add https://github.com/apache/cordova-plugin-console.git

  message_info "Adding Ionic Keyboard Plugin..."
  cordova plugin add https://github.com/driftyco/ionic-plugins-keyboard.git

  message_info "Adding Push Plugin..."
  cordova plugin add https://github.com/phonegap-build/PushPlugin.git

  message_info "Adding Dialogs Plugin..."
  cordova plugin add https://github.com/apache/cordova-plugin-dialogs.git

  message_info "Adding Geolocation Plugin"
  cordova plugin add https://github.com/apache/cordova-plugin-geolocation.git

  message_info "Adding Device Motion Plugin"
  cordova plugin add https://github.com/apache/cordova-plugin-device-motion.git

  message_info "Adding Device Orientation Plugin"
  cordova plugin add https://github.com/apache/cordova-plugin-device-orientation.git
fi

# ----
# Prepare Platforms
if [[ $init = 1 ]] || [[ $update = 1 ]] ; then
  message_info "Syncing 'www' with Android platform..."
  cordova prepare android

  # message_info "Syncing 'www' with iOS platform..."
  # cordova prepare ios
fi
