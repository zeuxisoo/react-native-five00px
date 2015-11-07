'use strict';

var React = require('react-native');
var DrawerMenuUI = require('./shared/drawer-menu-ui');

var {
    View,
    Text
} = React;

var BlogsUI = React.createClass({
    render: function() {
        var navigation = this.props.navigation;

        return (
            <DrawerMenuUI toolbarTitle="Blogs" navigation={navigation}>
                <View>
                    <Text>Blogs UI</Text>
                </View>
            </DrawerMenuUI>
        )
    }
});

module.exports = BlogsUI;
