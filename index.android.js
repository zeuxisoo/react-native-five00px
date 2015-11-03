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
                    <HomeUI></HomeUI>
                </View>
            );
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
