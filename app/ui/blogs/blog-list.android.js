'use strict';

var React = require('react-native');
var ResponsiveImage = require('react-native-responsive-image');
var DataService = require('../../service/data-service');
var BlogListItem = require('./blog-list-item.android');
var SwipeRefreshLayout = require('../../component/swipe-refresh-layout.android');

var {
    View,
    Text,
    ListView,
    StyleSheet
} = React;

var SWIPE_REFRESH_LAYOUT_REF = "swiperefreshlayout";

var BlogList = React.createClass({
    getInitialState: function() {
        var dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        return {
            isLoading    : false,
            isLoadingTail: false,
            currentPage  : 1,
            dataSource   : dataSource
        };
    },

    componentDidMount: function() {
        this.blogs = [];
        this.fetchBlogs(this.state.currentPage);
    },

    componentWillUnmount: function() {
        this.blogs = [];
    },

    fetchBlogs: function(page) {
        this.setState({
            isLoading: true,
            isLoadingTail: true
        });

        DataService.fetchBlogs(page).then(function(response) {
            if (page <= 1) {
                this.blogs = response.blog_posts;
            }else{
                this.blogs = this.blogs.concat(response.blog_posts);
            }

            this.setState({
                isLoading    : false,
                isLoadingTail: false,
                currentPage  : page,
                dataSource   : this.state.dataSource.cloneWithRows(this.blogs)
            });

            this.stopRefresh();
        }.bind(this)).done();
    },

    stopRefresh: function() {
        this.refs[SWIPE_REFRESH_LAYOUT_REF].stopRefresh();
    },

    onRefresh: function() {
        this.fetchBlogs(1);
    },

    onEndReached: function() {
        if (this.state.isLoadingTail) {
            return;
        }

        this.fetchBlogs(this.state.currentPage + 1);
    },

    renderRow: function(rowData, sectionID, rowID, highlightRow) {
        var navigation = this.props.navigation;

        return (
            <BlogListItem
                onHighlight={() => highlightRow(sectionID, rowID)}
                onUnhighlight={() => highlightRow(null, null)}
                rowData={rowData}
                navigation={navigation} />
        );
    },

    render: function() {
        if (this.state.dataSource.getRowCount() === 0) {
            return (
                <View style={styles.centerBlock}>
                    <Text>{this.state.isLoading ? 'Loading...' : 'Load failed'}</Text>
                </View>
            );
        }else{
            return (
                <SwipeRefreshLayout ref={SWIPE_REFRESH_LAYOUT_REF} onRefresh={this.onRefresh}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={40}
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps={true}
                        showsVerticalScrollIndicator={false}
                        automaticallyAdjustContentInsets={false}
                        style={styles.listContainer} />
                </SwipeRefreshLayout>
            );
        }
    }
});

var styles = StyleSheet.create({
    listContainer: {
        backgroundColor: '#FFF',
    },
    centerBlock: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

module.exports = BlogList;
