package im.ggd.react.view.swiperefresh;

import android.os.SystemClock;
import android.support.v4.widget.SwipeRefreshLayout;
import android.view.View;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.events.EventDispatcher;

import java.util.Map;

import javax.annotation.Nullable;

import im.ggd.react.view.swiperefresh.events.SwipeRefreshLayoutRefreshEvent;

public class ReactSwipeRefreshLayoutManager extends ViewGroupManager<ReactSwipeRefreshLayout> {

    private static final String REACT_CLASS = "AndroidSwipeRefreshLayout";

    private static final int REFRESH_START = 1;
    private static final int REFRESH_STOP = 2;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected ReactSwipeRefreshLayout createViewInstance(ThemedReactContext reactContext) {
        return new ReactSwipeRefreshLayout(reactContext);
    }

    @Nullable
    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
            SwipeRefreshLayoutRefreshEvent.EVENT_NAME, MapBuilder.of("registrationName", "onSwipeRefresh")
        );
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
            "startSwipeRefresh", REFRESH_START,
            "stopSwipeRefresh", REFRESH_STOP
        );
    }

    @Override
    public void receiveCommand(ReactSwipeRefreshLayout root, int commandId, @Nullable ReadableArray args) {
        switch(commandId) {
            case REFRESH_START:
                root.setRefreshing(true);
                break;
            case REFRESH_STOP:
                root.setRefreshing(false);
                break;
        }
    }

    @Override
    public boolean needsCustomLayoutForChildren() {
        return true;
    }

    @Override
    public void addView(ReactSwipeRefreshLayout parent, View child, int index) {
        if (getChildCount(parent) >= 2) {
            throw new JSApplicationIllegalArgumentException("The SwipeRefreshLayout cannot have more than two children");
        }

        parent.addView(child, index);
    }

    @Override
    protected void addEventEmitters(ThemedReactContext reactContext, ReactSwipeRefreshLayout view) {
        view.setOnRefreshListener(
            new SwipeRefreshLayoutEventEmitter(
                view,
                reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher()
            )
        );
    }

    public static class SwipeRefreshLayoutEventEmitter implements SwipeRefreshLayout.OnRefreshListener {

        private final ReactSwipeRefreshLayout mReactSwipeRefreshLayout;
        private final EventDispatcher mEventDispatcher;

        public SwipeRefreshLayoutEventEmitter(ReactSwipeRefreshLayout view, EventDispatcher eventDispatcher) {
            mReactSwipeRefreshLayout = view;
            mEventDispatcher = eventDispatcher;
        }

        @Override
        public void onRefresh() {
            mEventDispatcher.dispatchEvent(
                new SwipeRefreshLayoutRefreshEvent(mReactSwipeRefreshLayout.getId())
            );
        }

    }

}
