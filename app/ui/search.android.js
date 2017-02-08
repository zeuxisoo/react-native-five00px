'use strict';

import React, { Component } from 'react';

import DrawerMenuUI from './shared/DrawerMenu';
import SearchList from './search/SearchList.android';

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
