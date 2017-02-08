'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

var CenterBlockView = React.createClass({
    render: function() {
        return (
            <View style={styles.centerBlock}>
                <Text>{this.props.text}</Text>
            </View>
        )
    }
});

var styles = StyleSheet.create({
    centerBlock: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

module.exports = CenterBlockView;
