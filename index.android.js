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

var HomeUI = require('./app/ui/Home.android');
var PhotoUI = require('./app/ui/Photo.android');
var PhotoCommentsUI = require('./app/ui/PhotoComments.android');
var BlogsUI = require('./app/ui/Blogs.android');
var BlogPostUI = require('./app/ui/BlogPost.android');
var SearchUI = require('./app/ui/Search.android');
var UserProfileUI = require('./app/ui/UserProfile.android');
var AboutUI = require('./app/ui/About.android');

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

        if (route.name === 'photo-comments') {
            return (
                <View style={styles.container}>
                    <PhotoCommentsUI navigation={navigation} photo={route.rowData}></PhotoCommentsUI>
                </View>
            )
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

        if (route.name === 'user-profile') {
            return (
                <View style={styles.container}>
                    <UserProfileUI navigation={navigation} userProfile={route.rowData}></UserProfileUI>
                </View>
            )
        }

        if (route.name === 'about') {
            return (
                <View style={styles.container}>
                    <AboutUI navigation={navigation}></AboutUI>
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
