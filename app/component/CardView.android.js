'use strict';

import React, { Component } from 'react';
import {
    View
} from 'react-native';

import createReactNativeComponentClass from 'createReactNativeComponentClass';
import ReactNativeViewAttributes from 'ReactNativeViewAttributes';

var CardView = React.createClass({
    propTypes: {
        backgroundColor: React.PropTypes.string,
        elevation: React.PropTypes.number,
        radius: React.PropTypes.number,
        contentPadding: React.PropTypes.number,
        useCompatPadding: React.PropTypes.bool,
        preventCornerOverlap: React.PropTypes.bool
    },

    render: function() {
        return (
            <NativeCardView {...this.props}>
                <View>
                    {this.props.children}
                </View>
            </NativeCardView>
        )
    }
});

var NativeCardView = createReactNativeComponentClass({
    validAttributes: {
        ...ReactNativeViewAttributes.UIView
    },
    uiViewClassName: 'AndroidCardView',
});

module.exports = CardView;
