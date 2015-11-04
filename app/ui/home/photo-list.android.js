'use strict';

var React = require('react-native');
var ResponsiveImage = require('react-native-responsive-image');

var {
    View,
    Text,
    Image,
    ListView,
    StyleSheet,
    TouchableNativeFeedback
} = React;

var DataService = require('../../service/data-service');
var CardView = require('../../component/card-view');

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
            <View>
                <TouchableNativeFeedback
                    onShowUnderlay={highlightRow}
                    onHideUnderlay={highlightRow}>
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
                                            <View style={styles.rowItemUserInfo}>
                                                <Text style={styles.rowItemuserFullname}>{rowData.user.fullname}</Text>
                                                <Text style={styles.rowItemUserUsername}>@{rowData.user.username}</Text>
                                            </View>
                                        </View>
                                        <ResponsiveImage source={{ uri: rowData.image_url }} initWidth="320" initHeight="220" style={styles.rowItemImage} />
                                    </View>
                                </View>
                        </CardView>
                    </View>
                </TouchableNativeFeedback>
            </View>
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
    },
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
    rowItemUserInfo: {
        fontSize: 14
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

module.exports = PhotoList;
