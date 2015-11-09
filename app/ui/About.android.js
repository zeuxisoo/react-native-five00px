'use strict';

var React = require('react-native');
var ResponsiveImage = require('react-native-responsive-image');
var WebIntent = require('react-native-webintent');
var DrawerMenuUI = require('./shared/DrawerMenu');
var CardView = require('./shared/CardView');

var {
    View,
    Text,
    TouchableNativeFeedback,
    StyleSheet
} = React;

var AboutUI = React.createClass({
    onPressBodyLink: function(information) {
        WebIntent.open(information.body);
    },

    render: function() {
        var navigation = this.props.navigation;
        var informations = [
            {
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
            },
        ];

        var blocks = [];
        for(var i=0; i<informations.length; i++) {
            let information = informations[i];

            var body;
            if (information.type === 'link') {
                body =
                    <TouchableNativeFeedback onPress={() => this.onPressBodyLink(information)}>
                        <View style={styles.body}>
                            <Text>{information.body}</Text>
                        </View>
                    </TouchableNativeFeedback>
            }else{
                body =
                    <View style={styles.body}>
                        <Text>{information.body}</Text>
                    </View>
            }

            var block =
                <CardView key={'r_' + i}>
                    <View style={styles.columnContainer}>
                        <View style={styles.heading}>
                            <Text style={styles.headingText}>{information.name}</Text>
                        </View>
                        {body}
                    </View>
                </CardView>

            blocks.push(block);
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
        flex: 1,
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
