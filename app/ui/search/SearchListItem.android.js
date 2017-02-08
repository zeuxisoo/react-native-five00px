'use strict';

import React, { Component } from 'react';
import {
    View,
    TouchableNativeFeedback,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import CardView from '../shared/CardView.android';

var SearchListItem = React.createClass({
    onPress: function() {
        var navigation = this.props.navigation,
            rowData = this.props.rowData;

        navigation.push({
            title  : rowData.title,
            name   : 'user-profile',
            rowData: rowData
        });
    },

    render: function() {
        var navigation = this.props.navigation,
            highlightRow = this.props.onHighlight,
            unHighlightRow = this.props.onUnhighlight,
            rowData = this.props.rowData;

        return (
            <View>
                <TouchableNativeFeedback
                    onShowUnderlay={highlightRow}
                    onHideUnderlay={unHighlightRow}
                    onPress={() => this.onPress()}>
                    <View style={styles.cardviewContainer}>
                        <CardView>
                            <View style={styles.rowContainer}>
                                <Image source={{ uri: rowData.userpic_url }} style={styles.userAvatar} />
                                <View style={styles.baseInfo}>
                                    <Text style={styles.userFullname}>{rowData.fullname}</Text>
                                    <Text style={styles.userUsername}>@{rowData.username}</Text>
                                </View>
                            </View>
                        </CardView>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
});

var styles = StyleSheet.create({
    cardviewContainer: {
        padding: 0
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 8
    },
    baseInfo: {
        flex: 1
    },
    userAvatar: {
        width: 40,
        height: 40,
        marginRight: 8
    },
    userFullname: {
        color: '#000000'
    },
    userUsername: {
        flex: 1,
        color: '#777777',
        fontSize: 12
    }
});

module.exports = SearchListItem;
