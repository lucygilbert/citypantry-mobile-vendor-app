The City Pantry app
===================

Installation
------------

You will need to clone the git repository and install the Android SDK.

Run `npm install` and then `gulp import-libs` to copy over the citypantry-js-lib file to the www/lib directory. Run that command every time the library is updated.

Testing
-------

To run the tests, start up webdriver-manager in a seperate terminal tab (`webdriver-manager start`) and run `npm run protractor`.

Running
-------

To run the app on your local system, run `npm run run-local`.

To run the app on an Android phone, turn on developer mode on your Android phone (Settings > About device > Build number, click 7 times) and connect your phone via USB. Run `adb devices`, if your phone is in the list it should be correctly detected, then run `npm run run-android`.

If that doesn't work, run `adb kill-server` then `adb start-server`, then check `adb devices` for your phone and try `npm run run-android` again.

Publishing
----------

Run `cordova platform` and make sure Android is in the list of installed platforms, if not, run `cordova platform add android`.

Then run `cordova build --release android`. You should now find the unsigned APK file in `platforms/android/ant-build`.

Use `keytool -genkey -v -keystore KEYSTORENAME.keystore -alias ALIASNAME -keyalg RSA -keysize 2048 -validity 10000`, then answer the questions it asks to create a keystore. DO NOT LOSE THE KEYSTORE. BACKUP THE KEYSTORE. You cannot update the app unless the update is signed by the same key as the original.

Run `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore KEYSTOREFILENAME&PATH APKFILENAME&PATH ALIASNAME` to sign the APK.

Next run `zipalign -v 4 APKFILENAME&PATH NEWAPKFILENAME&PATH`. This may not work, if not, go to your Android SDK directory, into build-tools, into a folder with a version number (e.g. 21.1.2, but yours may be different). Once there run `./zipalign -v 4 APKFILENAME&PATH NEWAPKFILENAME&PATH`. NOTE: Optimizing the APK file with Zip Align IS NOT OPTIONAL. Google Play will not accept unoptimized files.

You now have a signed optimized APK file which can be uploaded to Google Play.
