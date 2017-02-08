'use strict';

import React, { Component } from 'react';
import {
    View,
    TouchableNativeFeedback,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import TimeAgo from 'react-native-timeago';
import CardView from '../shared/CardView.android';

var PhotoCommentListItem = React.createClass({
    onPressUser: function() {
        var navigation = this.props.navigation,
            rowData = this.props.rowData;

        navigation.push({
            name   : 'user-profile',
            rowData: rowData.user
        });
    },

    render: function() {
        var navigation = this.props.navigation,
            highlightRow = this.props.onHighlight,
            unHighlightRow = this.props.onUnhighlight,
            rowData = this.props.rowData;

        return (
            <View style={styles.cardviewContainer}>
                <CardView>
                    <View style={styles.columnContainer}>
                        <TouchableNativeFeedback
                            onShowUnderlay={highlightRow}
                            onHideUnderlay={unHighlightRow}
                            onPress={() => this.onPressUser()}>
                            <View style={styles.rowContainer}>
                                <Image source={{ uri: rowData.user.userpic_url }} style={styles.userAvatar} />
                                <View style={styles.baseInfo}>
                                    <Text style={styles.userFullname}>{rowData.user.fullname}</Text>
                                    <Text style={styles.userUsername}>@{rowData.user.username}</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                        <View style={styles.rowContainer}>
                            <Text style={styles.content} numberOfLines={3}>{rowData.body}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <TimeAgo style={styles.timeago} time={rowData.created_at} />
                        </View>
                    </View>
                </CardView>
            </View>
        )
    }
});

var styles = StyleSheet.create({
    cardviewContainer: {
        padding: 5
    },
    columnContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
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
        color: '#777777',
        fontSize: 12
    },
    content: {
        flex: 1
    },
    timeago: {
        flex: 1,
        color: '#777777',
        fontSize: 12,
        textAlign: 'right'
    }
});

module.exports = PhotoCommentListItem;
