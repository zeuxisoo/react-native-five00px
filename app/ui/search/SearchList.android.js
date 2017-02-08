'use strict';

import React, { Component } from 'react';
import {
    TouchableWithoutFeedback,
    View,
    Text,
    TextInput,
    ListView,
    ToastAndroid,
    StyleSheet
} from 'react-native';

import Button from 'react-native-button';
import DataService from '../../service/DataService';
import SearchListItem from './SearchListItem.android';
import CenterBlockView from '../../component/CenterBlockView';

var TEXT_INPUT_REF = 'textinput';

var SearchUI = React.createClass({
    getInitialState: function() {
        var dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        return {
            isFirstLoad  : false,
            isLoadingTail: false,
            currentPage  : 1,
            term         : "",
            dataSource   : dataSource
        };
    },

    componentDidMount: function() {
        this.users = [];
    },

    fetchUsers: function(page, term) {
        this.setState({
            isLoadingTail: true,
        });

        DataService.fetchUsers(page, term).then(function(response) {
            if (page <= 1) {
                this.users = response.users;
            }else{
                this.users = this.users.concat(response.users);
            }

            this.setState({
                isFirstLoad  : false,
                isLoadingTail: false,
                currentPage  : page,
                dataSource   : this.state.dataSource.cloneWithRows(this.users)
            });
        }.bind(this)).done();
    },

    onChangeInputText: function(text) {
        this.setState({
            term: text
        });
    },

    onSearchButtonPress: function() {
        if (this.state.term === "") {
            ToastAndroid.show('Please enter keyword to search', ToastAndroid.SHORT);
        }else{
            this.setState({
                isFirstLoad: true,
            });

            this.dismissKeyboard();
            this.fetchUsers(this.state.currentPage, this.state.term);
        }
    },

    onEndReached: function() {
        if (this.state.isLoadingTail || this.state.term === "") {
            return;
        }

        this.fetchUsers(this.state.currentPage + 1, this.state.term);
    },

    dismissKeyboard: function() {
        this.refs[TEXT_INPUT_REF].blur();
    },

    renderRow: function(rowData, sectionID, rowID, highlightRow) {
        var navigation = this.props.navigation;

        return (
            <SearchListItem
                onHighlight={() => highlightRow(sectionID, rowID)}
                onUnhighlight={() => highlightRow(null, null)}
                rowData={rowData}
                navigation={navigation} />
        );
    },

    render: function() {
        var navigation = this.props.navigation;
        var resultContent = "";

        if (this.state.isFirstLoad) {
            resultContent = (
                <CenterBlockView text="Searching..." />
            );
        }else{
            resultContent = (
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    onEndReached={this.onEndReached}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                    style={styles.listContainer} />
            );
        }


        return (
            <TouchableWithoutFeedback onPress={this.dismissKeyboard}>
                <View style={styles.columnContainer}>
                    <View style={styles.rowContainer}>
                        <View style={[styles.searchInputContainer, styles.borderBox]}>
                            <TextInput
                                style={styles.serachInput}
                                placeholder="Username"
                                placeholderTextColor="#c9bdf2"
                                value={this.state.term}
                                onChangeText={this.onChangeInputText}
                                ref={TEXT_INPUT_REF} />
                        </View>
                        <View style={[styles.searchButtonContainer, styles.borderBox]}>
                            <Button style={styles.searchButton} onPress={this.onSearchButtonPress}>Search</Button>
                        </View>
                    </View>
                    {resultContent}
                </View>
            </TouchableWithoutFeedback>
        )
    }
});

var styles = StyleSheet.create({
    columnContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 5
    },
    rowContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingLeft: 4,
        paddingRight: 4
    },
    borderBox: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#a891f3',
        borderRadius: 2
    },
    searchInputContainer: {
        flex: 10,
        height: 40,
        marginRight: 5
    },
    searchButtonContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40
    },
    serachInput: {
        color: '#a891f3'
    },
    searchButton: {
        color: '#a891f3',
        fontSize: 14
    },
    listContainer: {
        backgroundColor: '#FFF',
    },
});

module.exports = SearchUI;
