import React, { Component } from 'react';
import {
    WebView,
    StyleSheet
} from 'react-native';

import DrawerMenuUI from './shared/DrawerMenu';

var PrivacyUI = React.createClass({
    render: function() {
        let navigation = this.props.navigation;

        return (
            <DrawerMenuUI toolbarTitle="Privacy" navigation={navigation}>
                <WebView
                    source={{ uri: 'http://www.ggd.im/privacy.php' }}
                    style={{ marginTop: 20 }}
                    startInLoadingState={true} />
            </DrawerMenuUI>
        )
    }
});

var styles = StyleSheet.create({

});

module.exports = PrivacyUI;
