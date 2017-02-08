import React, { Component } from 'react';
import {
    StyleSheet,
    DrawerLayoutAndroid,
    View,
    ToolbarAndroid,
    Text,
    Dimensions
} from 'react-native';

import DrawerMenuList from './DrawerMenuList';

var DRAWER_REF = 'drawer';

var toolbarActions = [
    { title: 'About', icon: require('../../assets/img/menu-info.png'), show: 'never' },
];

var DrawerMenuUI = React.createClass({
    getInitialState: function() {
        return {
        }
    },

    onToolbarActionSelected: function(position) {
        var navigation = this.props.navigation;

        if (position === 0) {
            navigation.push({
                name: 'about'
            });
        }
    },

    onSelectDrawerMenuRowItem: function(rowData) {
        this.refs[DRAWER_REF].closeDrawer();

        if (rowData.route === 'home') {
            this.props.navigation.replace({
                name: rowData.route
            });
        }else{
            this.props.navigation.push({
                name: rowData.route
            });
        }
    },

    renderNavigationView: function() {
        return (
            <DrawerMenuList onSelectMenuItem={this.onSelectDrawerMenuRowItem} />
        );
    },

    render: function() {
        var navigation = this.props.navigation;

        return (
            <DrawerLayoutAndroid
                ref={DRAWER_REF}
                keyboardDismissMode="on-drag"
                drawerWidth={Dimensions.get('window').width - 56}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={this.renderNavigationView}>
                <View style={styles.container}>
                    <ToolbarAndroid
                        style={styles.toolbar}
                        navIcon={require('../../assets/img/menu-white.png')}
                        title={this.props.toolbarTitle}
                        titleColor="white"
                        subtitleColor="white"
                        actions={toolbarActions}
                        onActionSelected={this.onToolbarActionSelected}
                        onIconClicked={() => this.refs[DRAWER_REF].openDrawer()}
                        overflowIcon={require('../../assets/img/menu-overflow-icon.png')}>
                    </ToolbarAndroid>
                    {this.props.children}
                </View>
            </DrawerLayoutAndroid>
        )
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FAFAFA',
    },
    toolbar: {
        backgroundColor: '#886aea',
        height: 56,
    },
});

module.exports = DrawerMenuUI;
