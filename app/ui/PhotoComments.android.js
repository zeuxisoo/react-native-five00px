'use strict';

var React = require('react-native');
var DrawerMenuUI = require('./shared/DrawerMenu');
var PhotoCommentList = require('./home/PhotoCommentList.android');

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
