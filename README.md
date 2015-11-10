## Run

Install apk to android device

    react-native run-android

Run packager if not start

    npm run start

Connect via USB

    cd ~/AndroidSDK/platform-tools
    ./adb reverse tcp:8081 tcp:8081

Connect via WiFi

    https://facebook.github.io/react-native/docs/running-on-device-android.html#configure-device-to-connect-to-the-dev-server-via-wi-fi

## Release

Create or edit `gradle.properties`

    vim ~/.gradle/gradle.properties

        FIVE00PX_RELEASE_STORE_FILE=/path/to/your.keystore
        FIVE00PX_RELEASE_KEY_ALIAS=__YOUR__KEY__ALIAS__
        FIVE00PX_RELEASE_STORE_PASSWORD=*****
        FIVE00PX_RELEASE_KEY_PASSWORD=*****

Add sign config to app's gradle file

    vim ./android/app/build.gradle

        signingConfigs {
            release {
                storeFile file(FIVE00PX_RELEASE_STORE_FILE)
                storePassword FIVE00PX_RELEASE_STORE_PASSWORD
                keyAlias FIVE00PX_RELEASE_KEY_ALIAS
                keyPassword FIVE00PX_RELEASE_KEY_PASSWORD
            }
        }
        buildTypes {
            release {
                ...
                signingConfig signingConfigs.release
                ...
            }
        }

Generate APK file

    make release-apk

Install generated apk file

    make release-install

Reference

    https://facebook.github.io/react-native/docs/signed-apk-android.html#content
