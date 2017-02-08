'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableNativeFeedback,
    StyleSheet
} from 'react-native';

import ResponsiveImage from 'react-native-responsive-image';
import WebIntent from 'react-native-webintent';
import DrawerMenuUI from './shared/DrawerMenu';
import CardView from './shared/CardView';

var AboutUI = React.createClass({
    onPressBodyLink: function(information) {
        WebIntent.open(information.body);
    },

    render: function() {
        var navigation = this.props.navigation;

        let informations = [{
            "name": "Our Name",
            "body": "GG Develop",
            "type": "text"
        },
        {
            "name": "Our Website",
            "body": "https://www.ggd.im/",
            "type": "link"
        },
        {
            "name": "Facebook",
            "body": "https://www.facebook.com/ggdevelop",
            "type": "link"
        },
        {
            "name": "Twitter",
            "body": "https://www.twitter.com/ggdevim",
            "type": "link"
        }];

        let blocks = []
        for(let i=0; i<informations.length; i++) {
            let information = informations[i];

            let body, block;
            switch(information.type) {
                case 'text':
                    body =
                        <View style={styles.body}>
                            <Text>{information.body}</Text>
                        </View>
                    break;

                case 'link':
                    body =
                        <TouchableNativeFeedback onPress={() => this.onPressBodyLink(information)}>
                            <View style={styles.body}>
                                <Text>{information.body}</Text>
                            </View>
                        </TouchableNativeFeedback>
                    break;
            }

            block =
                <CardView key={'r_' + i}>
                    <View style={styles.columnContainer}>
                        <View style={styles.heading}>
                            <Text style={styles.headingText}>{information.name}</Text>
                        </View>
                        {body}
                    </View>
                </CardView>

            blocks.push(block)
        }

        return (
            <DrawerMenuUI toolbarTitle="About" navigation={navigation}>
                <CardView>
                    <ResponsiveImage source={require('../assets/img/about-logo.png')} initWidth="330" initHeight="220" />
                </CardView>

                {blocks}
            </DrawerMenuUI>
        )
    }
});

var styles = StyleSheet.create({
    columnContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    heading: {
        backgroundColor: '#a891f3',
        padding: 5
    },
    headingText: {
        color: '#FFFFFF',
    },
    body: {
        padding: 10
    }
});

module.exports = AboutUI;
