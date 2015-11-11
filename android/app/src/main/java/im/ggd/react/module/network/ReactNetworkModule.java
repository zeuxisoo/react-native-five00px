package im.ggd.react.module.network;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;

public class ReactNetworkModule extends ReactContextBaseJavaModule {

    private static final String TAG = "ReactNetworkModule";

    public ReactNetworkModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "NetworkAndroid";
    }

    @ReactMethod
    public void isConnected(Callback callback) {
        callback.invoke(ReactNetworkProvider.isConnected(getReactApplicationContext()));
    }

    @ReactMethod
    public void isWifiConnected(Callback callback) {
        callback.invoke(ReactNetworkProvider.isWifiConnected(getReactApplicationContext()));
    }

    @ReactMethod
    public void isMobileConnected(Callback callback) {
        callback.invoke(ReactNetworkProvider.isMobileConnected(getReactApplicationContext()));
    }

    @ReactMethod
    public void getConnectedType(Callback callback) {
        callback.invoke(ReactNetworkProvider.getConnectedType(getReactApplicationContext()));
    }

    private void debug(String message) {
        Log.d(TAG, message);
    }

}
