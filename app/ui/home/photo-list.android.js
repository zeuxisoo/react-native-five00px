'use strict';

var React = require('react-native');
var ResponsiveImage = require('react-native-responsive-image');
var DataService = require('../../service/data-service');
var PhotoListItem = require('./photo-list-item.android');

var {
    View,
    Text,
    ListView,
    StyleSheet
} = React;

var PhotoList = React.createClass({
    getInitialState: function() {
        var dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        return {
            isLoading : false,
            dataSource: dataSource
        };
    },

    componentDidMount: function() {
        this.fetchPhotos();
    },

    fetchPhotos: function() {
        this.setState({
            isLoading: true
        });

        DataService.fetchPhotos().then(function(response) {
            this.setState({
                isLoading : false,
                dataSource: this.state.dataSource.cloneWithRows(response.photos)
            });
        }.bind(this)).done();
    },

    renderRow: function(rowData, sectionID, rowID, highlightRow) {
        return (
            <PhotoListItem
                onHighlight={() => highlightRow(sectionID, rowID)}
                onUnhighlight={() => highlightRow(null, null)}
                rowData={rowData} />
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
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    keyboardDismissMode="on-drag"
                    keyboardShouldPersistTaps={true}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                    style={styles.listContainer} />
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

module.exports = PhotoList;
