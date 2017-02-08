'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  findNodeHandle
} from 'react-native';

import createReactNativeComponentClass from 'createReactNativeComponentClass';
import ReactNativeViewAttributes from 'ReactNativeViewAttributes';
import NativeMethodsMixin from 'NativeMethodsMixin';
import NativeModules from 'NativeModules';

var RCTUIManager = NativeModules.UIManager;

var RK_SWIPE_REFRESH_REF = 'swiperefreshlayout';
var INNER_VIEW_NODE_REF = 'innerviewnode';

var SwipeRefreshLayout = React.createClass({
    propTypes: {
        onSwipeRefresh: React.PropTypes.func,
    },

    mixins: [NativeMethodsMixin],

    _getSwipeRefreshLayoutHandle: function() {
        return findNodeHandle(this.refs[RK_SWIPE_REFRESH_REF]);
    },

    _onSwipeRefresh: function() {
        if (this.props.onSwipeRefresh) {
            this.props.onSwipeRefresh();
        }
    },

    getInnerViewNode: function() {
        return this.refs[INNER_VIEW_NODE_REF].getInnerViewNode();
    },

    startSwipeRefresh: function() {
        RCTUIManager.dispatchViewManagerCommand(
            this._getSwipeRefreshLayoutHandle(),
            RCTUIManager.AndroidSwipeRefreshLayout.Commands.startSwipeRefresh,
            null
        );
    },

    stopSwipeRefresh: function() {
        RCTUIManager.dispatchViewManagerCommand(
            this._getSwipeRefreshLayoutHandle(),
            RCTUIManager.AndroidSwipeRefreshLayout.Commands.stopSwipeRefresh,
            null
        );
    },

    render: function() {
        return (
            <NativeSwipeRefreshLayout
                {...this.props}
                ref={RK_SWIPE_REFRESH_REF}
                style={styles.base}
                onSwipeRefresh={this._onSwipeRefresh}>
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
