import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, View, Dimensions, Text, TouchableOpacity, InteractionManager } from 'react-native';
import CardStack from 'react-native-card-stack-swiper';
import UserCard from '../../components/UserCard';
import { getMultipleUsers } from '../../network/api';
import Favourites from '../../components/Favourites';

const STORAGE_KEY = "FAV_LIST";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      showFavourites: false,
      footerButtonText: "View Favourites"
    }
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers = () => {
    let { users } = this.state;
    getMultipleUsers().then(resp => {
      users = users.concat(resp);
      this.setState({
        users: users,
        isLoading: false
      });
    }).catch(() => {
      this.setState({
        isLoading: false
      })
    })
  }

  renderUsers = users => {
    return users.map((user, index) => {
      return <UserCard key={index} user={user} />
    })
  }

  onSwiped = (index) => {
    if (index + 2 == this.state.users.length) {
      this.getUsers();
    }
  }

  onSwipedRight = (index) => {
    this.addToFav(this.state.users[index]);
    this.udpateFooterText(this.state.users[index]);
  }

  udpateFooterText = (user) => {
    this.setState({
      footerButtonText: `${user.name.first} added to favourites`
    }, () => {
      setTimeout(() => {
        this.setState({
          footerButtonText: "View Favourites"
        })
      }, 1500)
    })
  }

  addToFav = async (user) => {
    let storedFavList = await AsyncStorage.getItem(STORAGE_KEY);

    if (!storedFavList) {
      storedFavList = [];
    } else {
      storedFavList = JSON.parse(storedFavList);
    }
    storedFavList.push(user);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storedFavList));
    } catch (error) {
      console.log("Error saving data", error);
    }
  }

  viewFavouritesList = () => {
    this.setState({
      showFavourites: true
    })
  };

  closeFavouritesList = () => {
    this.setState({
      showFavourites: false
    })
  }

  render() {
    const { 
      users, 
      isLoading, 
      showFavourites, 
      footerButtonText 
    } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? <ActivityIndicator style={styles.container} /> :
          users.length ? <CardStack
            style={styles.content}
            onSwipedRight={this.onSwipedRight}
            onSwiped={this.onSwiped}
            disableTopSwipe
            disableBottomSwipe
            >
            {this.renderUsers(users)}
          </CardStack> : <View style={styles.content}>
              <Text>Unable to fetch data 🤕</Text>
            </View>
        }
        <TouchableOpacity style={styles.button} onPress={this.viewFavouritesList}>
          <Text style={styles.buttonText}>{footerButtonText}</Text>
        </TouchableOpacity>
        {showFavourites && <Favourites closeFavList={this.closeFavouritesList} />}
      </View>
    );
  } List
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 54,
    padding: 10,
    backgroundColor: "#83ba43",
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: "black",
    fontWeight: 'bold',
    color: "white"
  }
};;
