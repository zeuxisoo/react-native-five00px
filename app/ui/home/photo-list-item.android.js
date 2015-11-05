'use strict';

var React = require('react-native');
var ResponsiveImage = require('react-native-responsive-image');
var CardView = require('../../component/card-view.android');

var {
    View,
    TouchableNativeFeedback,
    Text,
    Image,
    StyleSheet
} = React;

var PhotoListItem = React.createClass({
    render: function() {
        var highlightRow = this.props.onHighlight,
            unHighlightRow = this.props.onUnhighlight,
            rowData = this.props.rowData;

        return (
            <View>
                <TouchableNativeFeedback
                    onShowUnderlay={highlightRow}
                    onHideUnderlay={unHighlightRow}>
                    <View style={styles.cardviewContainer}>
                        <CardView
                            backgroundColor="#a891f3"
                            elevation={4}
                            radius={4}
                            contentPadding={2}
                            useCompatPadding={true}
                            preventCornerOverlap={true}
                            style={styles.cardview}>
                                <View style={styles.rowItem}>
                                    <View style={styles.rowHeading}>
                                        <Text style={styles.rowItemName}>{rowData.name}</Text>
                                    </View>
                                    <View style={styles.rowBody}>
                                        <View style={styles.rowItemUser}>
                                            <Image source={{ uri: rowData.user.userpic_url }} style={styles.rowItemUserAvatar} />
                                            <View>
                                                <Text style={styles.rowItemuserFullname}>{rowData.user.fullname}</Text>
                                                <Text style={styles.rowItemUserUsername}>@{rowData.user.username}</Text>
                                            </View>
                                        </View>
                                        <ResponsiveImage source={{ uri: rowData.image_url }} initWidth="330" initHeight="220" style={styles.rowItemImage} />
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
    cardview: {
        paddingBottom: 10
    },
    rowItem: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    rowHeading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a891f3',
        padding: 10
    },
    rowBody: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    rowItemName: {
        color: '#ffffff'
    },
    rowItemUser: {
        flexDirection: 'row',
        paddingTop: 16,
        paddingBottom: 16
    },
    rowItemUserAvatar: {
        width: 40,
        height: 40,
        marginRight: 8
    },
    rowItemuserFullname: {
        color: '#000000'
    },
    rowItemUserUsername: {
        fontSize: 12,
        color: '#777777'
    },
    rowItemImage: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

module.exports = PhotoListItem;
