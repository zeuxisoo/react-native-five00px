/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  BackAndroid,
  Navigator,
  View,
  Text
} from 'react-native';

import HomeUI from './app/ui/Home.android';
import PhotoUI from './app/ui/Photo.android';
import PhotoCommentsUI from './app/ui/PhotoComments.android';
import BlogsUI from './app/ui/Blogs.android';
import BlogPostUI from './app/ui/BlogPost.android';
import SearchUI from './app/ui/Search.android';
import UserProfileUI from './app/ui/UserProfile.android';
import AboutUI from './app/ui/About.android';
import PrivacyUI from './app/ui/Privacy.android';

import Network from './app/helper/Network.android';

var navigation;
BackAndroid.addEventListener('hardwareBackPress', function() {
    if (navigation && navigation.getCurrentRoutes().length > 1) {
        navigation.pop();
        return true;
    }

    return false;
});

var Five00px = React.createClass({
    getInitialState() {
        return {
            hasNetwork: false,
        };
    },

    componentDidMount: function() {
        Network.isConnected((state) => {
            this.setState({
                hasNetwork: state
            });
        });
    },

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

        if (route.name === 'privacy') {
            return (
                <View style={styles.container}>
                    <PrivacyUI navigation={navigation}></PrivacyUI>
                </View>
            )
        }
    },

    render: function() {
        var initialRoute = { name: 'home' };

        if (this.state.hasNetwork === false) {
            return (
                <View style={styles.centerBlock}>
                    <Text>- Five00px -</Text>
                    <Text>........................</Text>
                    <Text>No network connection :(</Text>
                </View>
            );
        }else{
            return (
                <Navigator
                    style={styles.container}
                    initialRoute={initialRoute}
                    configureScene={() => Navigator.SceneConfigs.FadeAndroid}
                    renderScene={this.routeMapper} />
            );
        }
    }
});

var styles = StyleSheet.create({
    centerBlock: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'column'
    }
});

AppRegistry.registerComponent('Five00px', () => Five00px);
