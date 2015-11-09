'use strict';

var React = require('react-native');
var DrawerMenuUI = require('./shared/DrawerMenu');
var CardView = require('./shared/CardView.android');
var DataService = require('../service/DataService');

var {
    ScrollView,
    View,
    Image,
    Text,
    ListView,
    StyleSheet
} = React;

var UserProfileUI = React.createClass({
    getInitialState: function() {
        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        }

        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID];
        }

        var userEquipmentDataStore = new ListView.DataSource({
            getSectionData         : getSectionData,
            getRowData             : getRowData,
            rowHasChanged          : (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        return {
            isLoading             : false,
            userProfile           : null,
            userEquipmentDataStore: userEquipmentDataStore
        };
    },

    componentDidMount: function() {
        this.fetchUserProfile();
    },

    fetchUserProfile: function() {
        this.setState({
            isLoading: true
        });

        DataService.fetchUserProfile(this.props.userProfile.id).then(function(response) {
            var equipments = response.user.equipment,
                dataBlob = {},
                sectionIDs = [],
                rowIDs = [];

            Object.keys(equipments).forEach(function(category, i) {
                var items = equipments[category];

                dataBlob[i] = category

                // Equipment categories
                sectionIDs.push(i);

                // Equipment category items
                rowIDs[i] = [];
                items.forEach(function(item, j) {
                    rowIDs[i].push(j);
                    dataBlob[i + ':' + j] = item;
                });
            });

            this.setState({
                isLoading  : false,
                userProfile: response.user,
                userEquipmentDataStore: this.state.userEquipmentDataStore.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
            });
        }.bind(this)).done();
    },

    renderUserEquipmentSectionHeader: function(sectionData, sectionID) {
        return (
            <View style={[styles.userProfileEquipmentContainer, styles.userProfileEquipmentSectionHeaderContainer]}>
                <Text style={styles.userProfileEquipmentSectionHeader}>{sectionData}</Text>
            </View>
        );
    },

    renderUserEquipmentRow: function(rowData, sectionID, rowID, highlightRow) {
        return (
            <View style={styles.userProfileEquipmentContainer}>
                <Text style={styles.userProfileEquipmentRow}>{rowData}</Text>
            </View>
        );
    },

    render: function() {
        var navigation = this.props.navigation,
            userProfile = this.props.userProfile;

        if (this.state.isLoading) {
            return (
                <DrawerMenuUI toolbarTitle="User Profile" navigation={navigation}>
                    <View style={styles.centerBlock}>
                        <Text>Loading...</Text>
                    </View>
                </DrawerMenuUI>
            );
        }else{
            if (this.state.userProfile === null) {
                return (
                    <DrawerMenuUI toolbarTitle="User Profile" navigation={navigation}>
                        <View style={styles.centerBlock}>
                            <Text>Load failed</Text>
                        </View>
                    </DrawerMenuUI>
                );
            }else{
                return (
                    <DrawerMenuUI toolbarTitle="User Profile" navigation={navigation}>
                        <ScrollView>
                            <CardView>
                                <View style={styles.rowContainer}>
                                    <Image source={{ uri: this.state.userProfile.userpic_url }} style={styles.userAvatar} />
                                    <View style={styles.baseInfo}>
                                        <Text style={styles.userFullname}>{this.state.userProfile.fullname}</Text>
                                        <Text style={styles.userUsername}>@{this.state.userProfile.username}</Text>
                                    </View>
                                </View>
                            </CardView>

                            <CardView>
                                <View style={styles.rowContainer}>
                                    <Text style={styles.body}>{this.state.userProfile.about ? this.state.userProfile.about : "No any descriptions :("}</Text>
                                </View>
                            </CardView>

                            <CardView>
                                <View style={styles.columnContainer}>
                                    <View style={[styles.rowContainer, styles.userProfileInfoContainer]}>
                                        <Text style={styles.userProfileInfoSubject}>Photo</Text>
                                        <Text style={styles.userProfileInfoSubject}>Followers</Text>
                                        <Text style={styles.userProfileInfoSubject}>Friends</Text>
                                    </View>
                                    <View style={[styles.rowContainer, styles.userProfileInfoContainer]}>
                                        <Text style={styles.userProfileInfoContent}>{this.state.userProfile.photos_count}</Text>
                                        <Text style={styles.userProfileInfoContent}>{this.state.userProfile.followers_count}</Text>
                                        <Text style={styles.userProfileInfoContent}>{this.state.userProfile.friends_count}</Text>
                                    </View>
                                </View>
                            </CardView>

                            <CardView>
                                <View style={styles.columnContainer}>
                                    <View style={[styles.rowContainer, styles.userProfileInfoContainer]}>
                                        <Text style={styles.userProfileInfoSubject}>Affection</Text>
                                        <Text style={styles.userProfileInfoSubject}>Favorites</Text>
                                        <Text style={styles.userProfileInfoSubject}>Following</Text>
                                    </View>
                                    <View style={[styles.rowContainer, styles.userProfileInfoContainer]}>
                                        <Text style={styles.userProfileInfoContent}>{this.state.userProfile.affection}</Text>
                                        <Text style={styles.userProfileInfoContent}>{this.state.userProfile.in_favorites_count}</Text>
                                        <Text style={styles.userProfileInfoContent}>{this.state.userProfile.following ? this.state.userProfile.following : "No" }</Text>
                                    </View>
                                </View>
                            </CardView>

                            <CardView>
                                <View style={styles.columnContainer}>
                                    <View style={styles.rowContainer}>
                                        <Text style={styles.userProfileInfoSubject2}>Join</Text>
                                        <Text style={styles.userProfileInfoContent2}>{this.state.userProfile.registration_date}</Text>
                                    </View>
                                    <View style={styles.rowContainer}>
                                        <Text style={styles.userProfileInfoSubject2}>Country</Text>
                                        <Text style={styles.userProfileInfoContent2}>{this.state.userProfile.country ? this.state.userProfile.country : 'unknown'}</Text>
                                    </View>
                                    <View style={styles.rowContainer}>
                                        <Text style={styles.userProfileInfoSubject2}>City</Text>
                                        <Text style={styles.userProfileInfoContent2}>{this.state.userProfile.city ? this.state.userProfile.city : 'unknown'}</Text>
                                    </View>
                                    <View style={styles.rowContainer}>
                                        <Text style={styles.userProfileInfoSubject2}>State</Text>
                                        <Text style={styles.userProfileInfoContent2}>{this.state.userProfile.state ? this.state.userProfile.state : 'unknown'}</Text>
                                    </View>
                                </View>
                            </CardView>

                            <CardView>
                                <ListView
                                    dataSource={this.state.userEquipmentDataStore}
                                    renderSectionHeader={this.renderUserEquipmentSectionHeader}
                                    renderRow={this.renderUserEquipmentRow}
                                    keyboardDismissMode="on-drag"
                                    keyboardShouldPersistTaps={true}
                                    showsVerticalScrollIndicator={false}
                                    automaticallyAdjustContentInsets={false} />
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
        padding: 10
    },
    userProfileInfoContainer: {
        padding: 0
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
    body: {
        flex: 1,
        color: '#000000'
    },
    userProfileInfoSubject: {
        flex: 1,
        textAlign: 'center',
        color: '#a891f3',
        fontWeight: 'bold'
    },
    userProfileInfoContent: {
        flex: 1,
        textAlign: 'center',
        color: '#777777'
    },
    userProfileInfoSubject2: {
        flex: 1,
        color: '#a891f3',
        textAlign: 'right',
        fontWeight: 'bold',
        marginRight: 10
    },
    userProfileInfoContent2: {
        flex: 4,
        color: '#777777'
    },
    userProfileEquipmentContainer: {
        padding: 5,
        paddingLeft: 10
    },
    userProfileEquipmentSectionHeaderContainer: {
        backgroundColor: '#a891f3',
    },
    userProfileEquipmentSectionHeader: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    userProfileEquipmentRow: {
        color: '#777777'
    }
});

module.exports = UserProfileUI;
