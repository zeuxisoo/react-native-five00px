'use strict';

var React = require('react-native');

var {
  requireNativeComponent,
  PropTypes,
  View
} = React;

var CardView = React.createClass({
    name: 'CardView',

    propTypes: {
        scaleX: PropTypes.number,
        scaleY: PropTypes.number,
        translateX: PropTypes.number,
        translateY: PropTypes.number,
        rotation: React.PropTypes.number,

        backgroundColor: PropTypes.string,
        elevation: PropTypes.number,
        radius: PropTypes.number,
        contentPadding: PropTypes.number,
        useCompatPadding: PropTypes.bool,
        preventCornerOverlap: PropTypes.bool
    },

    render: function() {
        return (
            <RCTCardView {...this.props}>
                <View>
                    {this.props.children}
                </View>
            </RCTCardView>
        )
    }
});

var RCTCardView = requireNativeComponent('RCTCardView', CardView);

module.exports = RCTCardView;
