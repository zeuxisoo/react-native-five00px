'use strict';

var React = require('react-native');

var {
    StyleSheet,
    DrawerLayoutAndroid,
    View,
    ToolbarAndroid,
    Text,

    Dimensions
} = React;

var DrawerMenuList = require('./drawer-menu-list');

var DRAWER_REF = 'drawer';

var HomeUI = React.createClass({
    getInitialState: function() {
        return {
            rowData: null
        }
    },

    onSelectDrawerMenuRowItem: function(rowData) {
        this.refs[DRAWER_REF].closeDrawer();
        this.setState({
            rowData: rowData
        });
    },

    renderNavigationView: function() {
        return (
            <DrawerMenuList onSelectMenuItem={this.onSelectDrawerMenuRowItem} />
        );
    },

    render: function() {
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
                        navIcon={require('image!ic_menu_white')}
                        title="首页"
                        titleColor="white"
                        onIconClicked={() => this.refs[DRAWER_REF].openDrawer()}>
                    </ToolbarAndroid>
                    <View>
                        <Text>This is a test</Text>
                    </View>
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
        backgroundColor: '#00a2ed',
        height: 56,
    },
});

module.exports = HomeUI;
