'use strict';

var React = require('react-native');
var DrawerMenuUI = require('./shared/drawer-menu-ui');
var PhotoList = require('./home/photo-list.android');

var {
    View,
    Text
} = React;

var PhotoUI = React.createClass({
    render: function() {
        var navigation = this.props.navigation;

        return (
            <DrawerMenuUI toolbarTitle="Home">
                <View>
                    <Text>Photo UI</Text>
                </View>
            </DrawerMenuUI>
        )
    }
});

module.exports = PhotoUI;
