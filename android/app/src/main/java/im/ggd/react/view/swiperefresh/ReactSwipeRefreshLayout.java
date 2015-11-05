package im.ggd.react.view.swiperefresh;

import android.content.Context;
import android.support.v4.widget.SwipeRefreshLayout;
import android.util.AttributeSet;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ScrollView;

import com.facebook.react.uimanager.events.NativeGestureUtil;

public class ReactSwipeRefreshLayout extends SwipeRefreshLayout {

    private ScrollView mScrollViewChild = null;

    public ReactSwipeRefreshLayout(Context context) {
        super(context);
    }

    public ReactSwipeRefreshLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        // If has ScrollView child and not in the top position
        if (mScrollViewChild != null && mScrollViewChild.getScrollY() > 0) {
            return false;
        }

        if (super.onInterceptTouchEvent(ev)) {
            NativeGestureUtil.notifyNativeGestureStarted(this, ev);
            return true;
        }

        return false;
    }

    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        super.onLayout(changed, left, top, right, bottom);

        mScrollViewChild = findScrollViewChild(this);
    }

    private ScrollView findScrollViewChild(View root) {
        View child = root;

        while(child instanceof ViewGroup) {
            child = ((ViewGroup) child).getChildAt(0);

            if (child instanceof ScrollView) {
                return (ScrollView) child;
            }
        }

        return null;
    }
}
