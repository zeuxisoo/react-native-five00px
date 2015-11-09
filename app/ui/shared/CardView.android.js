'use strict';

var React = require('react-native');

var {
    View,
    StyleSheet
} = React;

var CardView = require('../../component/CardView.android');

var CustomCardView = React.createClass({
    render: function() {
        var photo = this.props.photo;

        return (
            <View style={styles.cardviewContainer}>
                <CardView
                    backgroundColor="#a891f3"
                    elevation={4}
                    radius={4}
                    contentPadding={2}
                    useCompatPadding={true}
                    preventCornerOverlap={true}>
                    {this.props.children}
                </CardView>
            </View>
        )
    }
});

var styles = StyleSheet.create({
    cardviewContainer: {
        padding: 5
    }
});

module.exports = CustomCardView;
