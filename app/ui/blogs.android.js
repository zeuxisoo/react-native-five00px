'use strict';

var React = require('react-native');
var DrawerMenuUI = require('./shared/DrawerMenu');
var BlogList = require('./blogs/BlogList.android');

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
