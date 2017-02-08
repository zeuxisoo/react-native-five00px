'use strict';

import React, { Component } from 'react';

import DrawerMenuUI from './shared/DrawerMenu';
import BlogList from './blogs/BlogList.android';

var BlogsUI = React.createClass({
    render: function() {
        var navigation = this.props.navigation;

        return (
            <DrawerMenuUI toolbarTitle="Blogs" navigation={navigation}>
                <BlogList navigation={navigation} />
            </DrawerMenuUI>
        )
    }
});

module.exports = BlogsUI;
