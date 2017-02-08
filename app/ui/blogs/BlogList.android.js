'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    StyleSheet
} from 'react-native';

import DataService from '../../service/DataService';
import BlogListItem from './BlogListItem.android';
import SwipeRefreshLayout from '../../component/SwipeRefreshLayout.android';
import CenterBlockView from '../../component/CenterBlockView';

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

            this.stopSwipeRefresh();
        }.bind(this)).done();
    },

    stopSwipeRefresh: function() {
        this.refs[SWIPE_REFRESH_LAYOUT_REF].stopSwipeRefresh();
    },

    onSwipeRefresh: function() {
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
                <CenterBlockView text={this.state.isLoading ? 'Loading...' : 'Load failed'} />
            );
        }else{
            return (
                <SwipeRefreshLayout ref={SWIPE_REFRESH_LAYOUT_REF} onSwipeRefresh={this.onSwipeRefresh}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                        onEndReached={this.onEndReached}
                        onEndReachedThreshold={40}
                        keyboardDismissMode="on-drag"
                        keyboardShouldPersistTaps="always"
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
    }
});

module.exports = BlogList;
