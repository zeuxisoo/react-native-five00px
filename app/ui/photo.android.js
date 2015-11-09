'use strict';

var React = require('react-native');
var ResponsiveImage = require('react-native-responsive-image');
var Button = require('react-native-button');
var DrawerMenuUI = require('./shared/drawer-menu-ui');
var CardView = require('./shared/card-view.android');

var {
    ScrollView,
    TouchableNativeFeedback,
    View,
    Image,
    Text,
    StyleSheet
} = React;

var PhotoUI = React.createClass({
    onPressUser: function() {
        var navigation = this.props.navigation,
            photo = this.props.photo;

        navigation.push({
            name   : 'user-profile',
            rowData: photo.user
        });
    },

    onPressViewComments: function() {
        var navigation = this.props.navigation,
            photo = this.props.photo;

        navigation.push({
            name   : 'photo-comments',
            rowData: photo
        });
    },

    render: function() {
        var navigation = this.props.navigation,
            photo = this.props.photo;

        return (
            <DrawerMenuUI toolbarTitle="Photo" navigation={navigation}>
                <ScrollView>
                    <CardView>
                        <TouchableNativeFeedback onPress={rowData => this.onPressUser()}>
                            <View style={styles.rowContainer}>
                                <Image source={{ uri: photo.user.userpic_url }} style={styles.userAvatar} />
                                <View>
                                    <Text style={styles.userFullname}>{photo.user.fullname}</Text>
                                    <Text style={styles.userUsername}>@{photo.user.username}</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    </CardView>

                    <CardView>
                        <View style={styles.rowContainer}>
                            <View style={styles.photoStats}>
                                <Image source={require('../assets/img/photo-thumb.png')} style={styles.photoStatusIcon} />
                                <Text style={styles.photoStatsNumber}>{photo.favorites_count}</Text>
                            </View>
                            <View style={styles.photoStats}>
                                <Image source={require('../assets/img/photo-comments.png')} style={styles.photoStatusIcon} />
                                <Text style={styles.photoStatsNumber}>{photo.comments_count}</Text>
                            </View>
                            <View style={styles.photoStats}>
                                <Image source={require('../assets/img/photo-vote.png')} style={styles.photoStatusIcon} />
                                <Text style={styles.photoStatsNumber}>{photo.votes_count}</Text>
                            </View>
                        </View>
                    </CardView>

                    <CardView>
                        <View style={styles.columnContainer}>
                            <ResponsiveImage source={{ uri: photo.image_url }} initWidth="330" initHeight="220" style={styles.image} />
                            <Text style={styles.description}>{photo.description}</Text>
                        </View>
                    </CardView>

                    <CardView>
                        <View style={styles.columnContainer}>
                            <View style={styles.rowContainer}>
                                <Text style={styles.photoInfoSubject}>Created</Text>
                                <Text style={styles.photoInfoContent}>{photo.created_at}</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.photoInfoSubject}>Camera</Text>
                                <Text style={styles.photoInfoContent}>{photo.camera}</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.photoInfoSubject}>ISO</Text>
                                <Text style={styles.photoInfoContent}>{photo.iso}</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.photoInfoSubject}>Shutter</Text>
                                <Text style={styles.photoInfoContent}>{photo.shutter_speed}</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.photoInfoSubject}>Aperture</Text>
                                <Text style={styles.photoInfoContent}>{photo.aperture}</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.photoInfoSubject}>View</Text>
                                <Text style={styles.photoInfoContent}>{photo.times_viewed}</Text>
                            </View>
                            <View style={styles.rowContainer}>
                                <Text style={styles.photoInfoSubject}>Rating</Text>
                                <Text style={styles.photoInfoContent}>{photo.rating}</Text>
                            </View>
                        </View>
                    </CardView>

                    <CardView>
                        <View style={styles.columnContainer}>
                            <Button onPress={this.onPressViewComments}>View Comments</Button>
                        </View>
                    </CardView>
                </ScrollView>
            </DrawerMenuUI>
        )
    }
});

var styles = StyleSheet.create({
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10
    },
    columnContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 10
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
        fontSize: 12,
        color: '#777777'
    },
    photoStats: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    photoStatusIcon: {
        width: 24,
        height: 24,
        marginRight: 10
    },
    photoStatsNumber: {
        fontSize: 14,
        color: '#777777'
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    description: {
        marginTop: 10
    },
    photoInfoSubject: {
        flex: 1,
        marginRight: 10,
        textAlign: 'right',
        color: '#a891f3',
        fontWeight: 'bold'
    },
    photoInfoContent: {
        flex: 4
    }
});

module.exports = PhotoUI;
