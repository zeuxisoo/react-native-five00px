package im.ggd.react.view.cardview;

import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

public class ReactCardViewManager extends ViewGroupManager<ReactCardView> {

    private static final String REACT_CLASS = "AndroidCardView";
    private static final String TAG = "ReactCardViewManager";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected ReactCardView createViewInstance(ThemedReactContext reactContext) {
        return new ReactCardView(reactContext);
    }

    @ReactProp(name = "backgroundColor", customType = "Color")
    public void setBackgroundColor(ReactCardView view, @Nullable Integer color) {
        if (color != null) {
            // debug("color : " + color);

            view.setCardBackgroundColor(color);
        }
    }

    @ReactProp(name = "elevation", defaultFloat = 0.0f)
    public void setElevation(ReactCardView view, float elevation) {
        // debug("elevation : " + elevation);

        view.setCardElevation(elevation);
    }

    @ReactProp(name = "radius", defaultFloat = 0.0f)
    public void setRadius(ReactCardView view, float radius) {
        // debug("radius : " + radius);

        view.setRadius(radius);
    }

    @ReactProp(name = "contentPadding")
    public void setContentPadding(ReactCardView view, @Nullable Integer padding) {
        if (padding != null) {
            // debug("padding : " + padding);

            view.setContentPadding(padding, padding, padding, padding);
        }
    }

    @ReactProp(name = "useCompatPadding", defaultBoolean = true)
    public void setUseCompatPadding(ReactCardView view, Boolean status) {
        // debug("useCompatPadding : " + status);

        view.setUseCompatPadding(status);
    }

    @ReactProp(name = "preventCornerOverlap", defaultBoolean = true)
    public void setPreventCornerOverlap(ReactCardView view, Boolean status) {
        // debug("preventCornerOverlap : " + status);

        view.setPreventCornerOverlap(status);
    }

    private void debug(String message) {
        Log.d(TAG, message);
    }

}
