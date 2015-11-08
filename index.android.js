/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    BackAndroid,
    Navigator,
    View
} = React;

var HomeUI = require('./app/ui/home.android');
var PhotoUI = require('./app/ui/photo.android');
var BlogsUI = require('./app/ui/blogs.android');
var BlogPostUI = require('./app/ui/blog-post.android');
var SearchUI = require('./app/ui/search.android');

var navigation;
BackAndroid.addEventListener('hardwareBackPress', function() {
    if (navigation && navigation.getCurrentRoutes().length > 1) {
        navigation.pop();
        return true;
    }

    return false;
});

var Five00px = React.createClass({
    routeMapper: function(route, navigationOperations, onComponentRef) {
        navigation = navigationOperations;

        if (route.name === 'home') {
            return (
                <View style={styles.container}>
                    <HomeUI navigation={navigation}></HomeUI>
                </View>
            );
        }

        if (route.name === 'photo') {
            return (
                <View style={styles.container}>
                    <PhotoUI navigation={navigation} photo={route.rowData}></PhotoUI>
                </View>
            );
        }

        if (route.name === 'blogs') {
            return (
                <View style={styles.container}>
                    <BlogsUI navigation={navigation}></BlogsUI>
                </View>
            )
        }

        if (route.name === 'blog-post') {
            return (
                <View style={styles.container}>
                    <BlogPostUI navigation={navigation} blogPost={route.rowData}></BlogPostUI>
                </View>
            )
        }

        if (route.name === 'search') {
            return (
                <View style={styles.container}>
                    <SearchUI navigation={navigation}></SearchUI>
                </View>
            )
        }
    },

    render: function() {
        var initialRoute = { name: 'home' };

        return (
            <Navigator
                style={styles.container}
                initialRoute={initialRoute}
                configureScene={() => Navigator.SceneConfigs.FadeAndroid}
                renderScene={this.routeMapper} />
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    }
});

AppRegistry.registerComponent('Five00px', () => Five00px);
