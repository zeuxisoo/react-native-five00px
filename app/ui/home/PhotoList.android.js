'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    StyleSheet
} from 'react-native';

import DataService from '../../service/DataService';
import PhotoListItem from './PhotoListItem.android';
import SwipeRefreshLayout from '../../component/SwipeRefreshLayout.android';
import CenterBlockView from '../../component/CenterBlockView';

var SWIPE_REFRESH_LAYOUT_REF = "swiperefreshlayout";

var PhotoList = React.createClass({
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
        this.photos = [];
        this.fetchPhotos(this.state.currentPage);
    },

    componentWillUnmount: function() {
        this.photos = [];
    },

    fetchPhotos: function(page) {
        this.setState({
            isLoading: true,
            isLoadingTail: true
        });

        DataService.fetchPhotos(page).then(function(response) {
            if (page <= 1) {
                this.photos = response.photos;
            }else{
                this.photos = this.photos.concat(response.photos);
            }

            this.setState({
                isLoading    : false,
                isLoadingTail: false,
                currentPage  : page,
                dataSource   : this.state.dataSource.cloneWithRows(this.photos)
            });

            this.stopSwipeRefresh();
        }.bind(this)).done();
    },

    stopSwipeRefresh: function() {
        this.refs[SWIPE_REFRESH_LAYOUT_REF].stopSwipeRefresh();
    },

    onSwipeRefresh: function() {
        this.fetchPhotos(1);
    },

    onEndReached: function() {
        if (this.state.isLoadingTail) {
            return;
        }

        this.fetchPhotos(this.state.currentPage + 1);
    },

    renderRow: function(rowData, sectionID, rowID, highlightRow) {
        var navigation = this.props.navigation;

        return (
            <PhotoListItem
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

module.exports = PhotoList;
