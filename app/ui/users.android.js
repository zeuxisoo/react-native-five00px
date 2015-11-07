'use strict';

var React = require('react-native');
var DrawerMenuUI = require('./shared/drawer-menu-ui');

var {
    View,
    Text
} = React;

var UsersUI = React.createClass({
    render: function() {
        var navigation = this.props.navigation;

        return (
            <DrawerMenuUI toolbarTitle="Users" navigation={navigation}>
                <View>
                    <Text>Users UI</Text>
                </View>
            </DrawerMenuUI>
        )
    }
});

module.exports = UsersUI;
