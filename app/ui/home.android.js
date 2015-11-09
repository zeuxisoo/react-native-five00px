'use strict';

var React = require('react-native');
var DrawerMenuUI = require('./shared/DrawerMenu');
var PhotoList = require('./home/PhotoList.android');

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
