package im.ggd.react.view.swiperefresh.events;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class SwipeRefreshLayoutRefreshEvent extends Event<SwipeRefreshLayoutRefreshEvent> {

    public static final String EVENT_NAME = "topSwipeRefresh";

    public SwipeRefreshLayoutRefreshEvent(int viewTag) {
        super(viewTag);
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), serializeEventData());
    }

    private WritableMap serializeEventData() {
        WritableMap eventData = Arguments.createMap();

        return eventData;
    }

}
