import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage, Dimensions, FlatList, Image, Alert } from 'react-native';
import Header from './Header';
const { width, height } = Dimensions.get('window');

const STORAGE_KEY = "FAV_LIST";

export default class Favourites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favList: [],
    };
  }

  async componentDidMount() {
    const favList = await AsyncStorage.getItem(STORAGE_KEY);
    if (favList) {
      this.setState({
        favList: JSON.parse(favList).reverse()
      });
    }
  }

  renderItem = (user) => {
    return <View style={styles.listItem}>
      <View style={styles.itemImageWrapper}>
        <Image
          style={styles.thumbnail}
          resizeMode="contain"
          source={{ uri: user.picture.medium }} />
      </View>
      <View>
        <Text style={styles.itemName}>
          {user.name.title} {user.name.first} {user.name.last}
        </Text>
        <Text style={styles.itemSubTitle}>
          {user.location.city}, {user.location.country}
        </Text>
      </View>
    </View>
  }

  clearFavList = () => {
    Alert.alert(
      'Are you sure?',
      'Your favourites list will be deleted. You cannot undo this action.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: async () => {
            await AsyncStorage.removeItem(STORAGE_KEY);
            this.setState({
              favList: []
            })
          }
        },
      ],
      { cancelable: true },
    );
  }

  renderFooterComponent = () => {
    return <TouchableOpacity
      style={styles.listItem}
      onPress={this.clearFavList}
    >
      <Text style={[styles.itemSubTitle]}>Clear</Text>
    </TouchableOpacity>
  }

  render() {
    const { closeFavList } = this.props;
    const { favList } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title={"Favourites"}
          buttonTitle={"CLOSE"}
          onPress={closeFavList}
        />
        {favList.length ? <FlatList
          style={styles.flatlist}
          data={favList}
          renderItem={({ item }) => { return this.renderItem(item) }}
          keyExtractor={item => item.login.uuid}
          ListFooterComponent={this.renderFooterComponent}
        />
          :
          <View style={styles.noDataView}>
            <Text style={styles.noDataText}>👻</Text>
            <Text onPress={closeFavList} style={styles.startSwipping}>Swipe right to add favourites</Text>
          </View>
        }
      </View>
    );
  }
}

const styles = {
  container: {
    // flex: 1,
    height: height,
    width: width,
    backgroundColor: 'white',
    position: "absolute",
  },
  noDataView: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100
  },
  noDataText: {
    color: "#999",
    fontSize: 18,
    textAlign: "center"
  },
  startSwipping: {
    color: "#2a2a2a",
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 38
  },
  flatlist: {
    marginBottom: 74,
  },
  listItem: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10
  },
  itemImageWrapper: {
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    height: 50,
    width: 50,
    marginRight: 10,
  },
  thumbnail: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  itemName: {
    fontSize: 18,
    fontWeight: '500',
    color: "#2a2a2a"
  },
  itemSubTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: "#999"
  }
} 
