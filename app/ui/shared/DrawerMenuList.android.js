import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ListView,
    TouchableNativeFeedback,
    Text,
    Image
} from 'react-native';

var DrawerMenuList = React.createClass({
    getInitialState: function() {
        var dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        return {
            dataSource: dataSource
        };
    },

    componentDidMount: function() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows([
                { 'name': 'Home',    'icon': require('../../assets/img/menu-home.png'),    'route': 'home'   },
                { 'name': 'Blogs',   'icon': require('../../assets/img/menu-blogs.png'),   'route': 'blogs'  },
                { 'name': 'Search',  'icon': require('../../assets/img/menu-search.png'),  'route': 'search' },
                { 'name': 'Privacy', 'icon': require('../../assets/img/menu-privacy.png'), 'route': 'privacy' },
            ])
        });
    },

    renderHeader: function() {
        return (
            <View style={styles.header}>
                <TouchableNativeFeedback onPress={() => this.props.onSelectMenuItem(null)}>
                    <View style={styles.headerUserInfo}>
                        <Image source={require('../../assets/img/menu-user-avatar.png')} style={styles.headerUserAvatar} />
                        <Text style={styles.headerUserMessage}>
                            Hello, Master
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    },

    renderRow: function(rowData, sectionID, rowID, highlightRow) {
        return (
            <View>
                <TouchableNativeFeedback
                    onShowUnderlay={highlightRow}
                    onHideUnderlay={highlightRow}
                    onPress={() => this.props.onSelectMenuItem(rowData)}>
                    <View style={styles.rowItem}>
                        <Image source={rowData.icon} style={styles.rowItemIcon}/>
                        <Text style={styles.rowItemName}>
                            {rowData.name}
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    },

    render: function() {
        return (
            <View style={styles.container} {...this.props}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderHeader={this.renderHeader}
                    renderRow={this.renderRow}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                    style={styles.menuList}>
                </ListView>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },

    menuList: {
        flex:1,
        backgroundColor: 'white'
    },

    header: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#886aea'
    },

    headerUserInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16
    },

    headerUserAvatar: {
        width: 40,
        height: 40,
        marginLeft: 8,
        marginRight: 8
    },

    headerUserMessage: {
        fontSize: 14,
        color: 'white'
    },

    rowItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },

    rowItemName: {
        fontSize: 16,
        marginLeft: 16,
        color: '#886aea'
    },

    rowItemIcon: {
        width: 16,
        height: 16,
        marginLeft: 10
    }
});

module.exports = DrawerMenuList;
