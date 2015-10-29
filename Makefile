all:
	@echo "make run"

watch:
	export ANDROID_HOME=/Users/zeuxis/Documents/AndroidSDK
	react-native run-android
	/Users/zeuxis/Documents/AndroidSDK/platform-tools/adb reverse tcp:8081 tcp:8081
	npm run start
