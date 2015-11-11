package im.ggd.react;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import im.ggd.react.module.network.ReactNetworkModule;
import im.ggd.react.view.cardview.ReactCardViewManager;
import im.ggd.react.view.swiperefresh.ReactSwipeRefreshLayoutManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CustomReactPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new ReactNetworkModule(reactContext));

        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> result = new ArrayList<ViewManager>();

        result.add(new ReactCardViewManager());
        result.add(new ReactSwipeRefreshLayoutManager());

        return result;
    }

}
