'use strict';

import React, { Component } from 'react';

import DrawerMenuUI from './shared/DrawerMenu';
import PhotoCommentList from './home/PhotoCommentList.android';

var PhotoCommentsUI = React.createClass({
    render: function() {
        var navigation = this.props.navigation,
            photo = this.props.photo;

        return (
            <DrawerMenuUI toolbarTitle="Photo Comments" navigation={navigation}>
                <PhotoCommentList navigation={navigation} photo={photo} />
            </DrawerMenuUI>
        )
    }
});

module.exports = PhotoCommentsUI;
