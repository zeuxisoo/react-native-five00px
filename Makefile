all:
	@echo "make run"

run:
	react-native run-android
	./adb reverse tcp:8081 tcp:8081

release-apk:
	cd android && ./gradlew assembleRelease && cd -

release-install:
	cd android && ./gradlew installRelease && cd -
