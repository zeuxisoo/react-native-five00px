'use strict';

var React = require('react-native');
var DrawerMenuUI = require('./shared/DrawerMenu');
var SearchList = require('./search/SearchList.android');

var SearchUI = React.createClass({
    render: function() {
        var navigation = this.props.navigation;

        return (
            <DrawerMenuUI toolbarTitle="Search" navigation={navigation}>
                <SearchList navigation={navigation} />
            </DrawerMenuUI>
        )
    }
});

module.exports = SearchUI;
