'use strict';

var React = require('react-native');
var ResponsiveImage = require('react-native-responsive-image');
var TimeAgo = require('react-native-timeago');
var CardView = require('../shared/CardView.android');

var {
    View,
    TouchableNativeFeedback,
    Text,
    Image,
    StyleSheet
} = React;

var BlogListItem = React.createClass({
    onPress: function() {
        var navigation = this.props.navigation,
            rowData = this.props.rowData;

        navigation.push({
            title  : rowData.title,
            name   : 'blog-post',
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
                                <Image source={{ uri: rowData.user.userpic_url }} style={styles.userAvatar} />
                                <View style={styles.baseInfo}>
                                    <Text style={styles.userFullname}>{rowData.user.fullname}</Text>
                                    <Text style={styles.blogTitle} numberOfLines={1}>{rowData.title}</Text>
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
        padding: 5
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
    blogTitle: {
        flex: 1,
        color: '#777777'
    }
});

module.exports = BlogListItem;
