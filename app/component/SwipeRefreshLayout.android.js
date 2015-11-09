'use strict';

var React = require('react-native');
var createReactNativeComponentClass = require('createReactNativeComponentClass');
var ReactNativeViewAttributes = require('ReactNativeViewAttributes');
var ReactPropTypes = require('ReactPropTypes');
var NativeMethodsMixin = require('NativeMethodsMixin');
var RCTUIManager = require('NativeModules').UIManager;

var { View, StyleSheet } = React;

var RK_SWIPE_REFRESH_REF = 'swiperefreshlayout';
var INNER_VIEW_NODE_REF = 'innerviewnode';

var SwipeRefreshLayout = React.createClass({
    propTypes: {
        onRefresh: ReactPropTypes.func,
    },

    mixins: [NativeMethodsMixin],

    _getSwipeRefreshLayoutHandle: function() {
        return React.findNodeHandle(this.refs[RK_SWIPE_REFRESH_REF]);
    },

    _onRefresh: function() {
        if (this.props.onRefresh) {
            this.props.onRefresh();
        }
    },

    getInnerViewNode: function() {
        return this.refs[INNER_VIEW_NODE_REF].getInnerViewNode();
    },

    startRefresh: function() {
        RCTUIManager.dispatchViewManagerCommand(
            this._getSwipeRefreshLayoutHandle(),
            RCTUIManager.AndroidSwipeRefreshLayout.Commands.startRefresh,
            null
        );
    },

    stopRefresh: function() {
        RCTUIManager.dispatchViewManagerCommand(
            this._getSwipeRefreshLayoutHandle(),
            RCTUIManager.AndroidSwipeRefreshLayout.Commands.stopRefresh,
            null
        );
    },

    render: function() {
        return (
            <NativeSwipeRefreshLayout
                {...this.props}
                ref={RK_SWIPE_REFRESH_REF}
                style={styles.base}
                onRefresh={this._onRefresh}>
                <View ref={INNER_VIEW_NODE_REF} style={styles.mainSubview} collapsable={false}>
                    {this.props.children}
                </View>
            </NativeSwipeRefreshLayout>
        );
    }
});

var styles = StyleSheet.create({
    base: {
        flex: 1,
    },
    mainSubview: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});

var NativeSwipeRefreshLayout = createReactNativeComponentClass({
    validAttributes: {
        ...ReactNativeViewAttributes.UIView
    },
    uiViewClassName: 'AndroidSwipeRefreshLayout',
});

module.exports = SwipeRefreshLayout;
