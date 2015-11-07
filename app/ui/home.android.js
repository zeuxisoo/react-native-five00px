'use strict';

var React = require('react-native');
var DrawerMenuUI = require('./shared/drawer-menu-ui');
var PhotoList = require('./home/photo-list.android');

var HomeUI = React.createClass({
    render: function() {
        var navigation = this.props.navigation;

        return (
            <DrawerMenuUI toolbarTitle="Home" navigation={navigation}>
                <PhotoList navigation={navigation} />
            </DrawerMenuUI>
        )
    }
});

module.exports = HomeUI;
