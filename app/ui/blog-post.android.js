'use strict';

var React = require('react-native');
var ResponsiveImage = require('react-native-responsive-image');
var TimeAgo = require('react-native-timeago');
var DrawerMenuUI = require('./shared/drawer-menu-ui');
var CardView = require('./shared/card-view.android');
var DataService = require('../service/data-service');

var {
    ScrollView,
    View,
    Image,
    Text,
    StyleSheet
} = React;

var BlogPostUI = React.createClass({
    getInitialState: function() {
        return {
            blogPost : null,
            isLoading: false
        };
    },

    componentDidMount: function() {
        this.fetchBlogPost();
    },

    fetchBlogPost: function() {
        this.setState({
            isLoading: true
        });

        var self = this;
        DataService.fetchBlogPost(this.props.blogPost.id).then(function(response) {
            self.setState({
                blogPost : response,
                isLoading: false
            });
        }).done();
    },

    render: function() {
        var navigation = this.props.navigation,
            blogPost = this.props.blogPost;

        if (this.state.isLoading) {
            return (
                <DrawerMenuUI toolbarTitle="Blog Post" navigation={navigation}>
                    <View style={styles.centerBlock}>
                        <Text>Loading...</Text>
                    </View>
                </DrawerMenuUI>
            );
        }else{
            if (this.state.blogPost === null) {
                return (
                    <DrawerMenuUI toolbarTitle="Blog Post" navigation={navigation}>
                        <View style={styles.centerBlock}>
                            <Text>Load failed</Text>
                        </View>
                    </DrawerMenuUI>
                );
            }else{
                return (
                    <DrawerMenuUI toolbarTitle="Blog Post" navigation={navigation}>
                        <ScrollView>
                            <CardView>
                                <View style={styles.rowContainer}>
                                    <Image source={{ uri: blogPost.user.userpic_url }} style={styles.userAvatar} />
                                    <View style={styles.baseInfo}>
                                        <Text style={styles.userFullname}>{blogPost.user.fullname}</Text>
                                        <Text style={styles.userUsername}>@{blogPost.user.username}</Text>
                                    </View>
                                </View>
                            </CardView>

                            <CardView>
                                <View style={styles.rowContainer}>
                                    <Text style={styles.title}>{this.state.blogPost.title}</Text>
                                </View>
                            </CardView>

                            <CardView>
                                <View style={styles.rowContainer}>
                                    <Text style={styles.body}>{this.state.blogPost.body}</Text>
                                </View>
                            </CardView>

                            <CardView>
                            <View style={styles.columnContainer}>
                                <View style={styles.rowContainer}>
                                    <Text style={styles.blogPostInfoSubject}>Created</Text>
                                    <TimeAgo style={styles.blogPostInfoContent} time={this.state.blogPost.created_at} />
                                </View>
                                <View style={styles.rowContainer}>
                                    <Text style={styles.blogPostInfoSubject}>City</Text>
                                    <Text style={styles.blogPostInfoContent}>{this.state.blogPost.user.city ? this.state.blogPost.user.city : 'unknown'}</Text>
                                </View>
                                <View style={styles.rowContainer}>
                                    <Text style={styles.blogPostInfoSubject}>Country</Text>
                                    <Text style={styles.blogPostInfoContent}>{this.state.blogPost.user.country ? this.state.blogPost.user.country : 'unknown'}</Text>
                                </View>
                            </View>
                        </CardView>
                        </ScrollView>
                    </DrawerMenuUI>
                )
            }
        }
    }
});

var styles = StyleSheet.create({
    centerBlock: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    columnContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 10
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
        color: '#777777'
    },
    title: {
        color: '#a891f3',
        fontWeight: 'bold'
    },
    body: {
        flex: 1,
        color: '#000000'
    },
    blogStatsIcon: {
        width: 24,
        height: 24
    },
    blogPostInfoSubject: {
        flex: 1,
        marginRight: 10,
        textAlign: 'right',
        color: '#a891f3',
        fontWeight: 'bold'
    },
    blogPostInfoContent: {
        flex: 4
    }
});

module.exports = BlogPostUI;
