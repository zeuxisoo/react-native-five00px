'use strict';

var React = require('react-native');
var createReactNativeComponentClass = require('createReactNativeComponentClass');
var ReactNativeViewAttributes = require('ReactNativeViewAttributes');
var ReactPropTypes = require('ReactPropTypes');

var { View } = React;

var CardView = React.createClass({
    propTypes: {
        backgroundColor: ReactPropTypes.string,
        elevation: ReactPropTypes.number,
        radius: ReactPropTypes.number,
        contentPadding: ReactPropTypes.number,
        useCompatPadding: ReactPropTypes.bool,
        preventCornerOverlap: ReactPropTypes.bool
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
    uiViewClassName: 'RCTCardView',
});

module.exports = CardView;
