import React, { Component } from 'react';
import DrawerMenuUI from './shared/DrawerMenu';
import PhotoList from './home/PhotoList.android';

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
