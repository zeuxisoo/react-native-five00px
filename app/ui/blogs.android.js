'use strict';

var React = require('react-native');
var DrawerMenuUI = require('./shared/drawer-menu-ui');
var BlogList = require('./blogs/blog-list.android');

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
