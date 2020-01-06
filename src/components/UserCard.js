import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-card-stack-swiper';
import Avatar from './Avatar';
import Info from './Info';
import IconButton from './IconButton';
import formatDate from '../transforms/Date';

const { width, height } = Dimensions.get('window');

export default class UserCard extends Component {
    constructor(props) {
        super(props);
        const { name } = props.user;
        this.state = {
            selected: "name",
            detail: `${name.title} ${name.first} ${name.last}`,
            header: "Hi, My name is",
        };
    }

    userDetails = (user) => {
        return [
            {
                key: "name",
                icon: "user",
                header: "Hi, My name is",
                detail: `${user.name.title} ${user.name.first} ${user.name.last}`
            },
            // {
            //     key: "email",
            //     icon: "envelope",
            //     header: "My email address is",
            //     detail: `${user.email}`
            // },
            {
                key: "birthdate",
                icon: "calendar",
                header: "My birthday is",
                detail: formatDate(`${user.dob.date}`)
            },
            {
                key: "address",
                icon: "map",
                header: "My address is",
                detail: `${user.location.street.number} ${user.location.street.name}`
            },
            {
                key: "phone",
                icon: "phone",
                header: "My phone number is",
                detail: `${user.phone}`
            },
            {
                key: "password",
                icon: "lock",
                header: "My password is",
                detail: `${user.login.password}`
            }
        ]
    }

    onIconPress = (item) => {
        this.setState({
            selected: item.key,
            header: item.header,
            detail: item.detail
        });
    }

    renderButtons = user => {
        const { selected } = this.state;
        return this.userDetails(user).map(item => {
            return <IconButton
                key={item.key}
                name={item.icon}
                selected={selected === item.key}
                onPress={() => { this.onIconPress(item) }} />
        });
    }

    render() {
        const { user } = this.props;
        const { header, detail } = this.state;

        return (
            <Card style={styles.card}>
                <View style={styles.backgroundView} />
                <View style={styles.avatarWrapper}>
                    <Avatar
                        source={user.picture.large}
                    />
                </View>
                <Info
                    style={styles.info}
                    header={header}
                    detail={detail}
                />
                <View style={styles.buttonWrapper}>
                    {this.renderButtons(user)}
                </View>
            </Card>
        );
    }
}

const styles = {
    card: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.85,
        height: height * 0.7,
        backgroundColor: '#FFF',
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
    },
    backgroundView: {
        backgroundColor: "#f9f9f9",
        position: "absolute",
        height: height * 0.2,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,.15)"
    },
    avatarWrapper: {
        marginTop: height * 0.075,
        marginBottom: 40,
    },
    info: {
        flex: 1,
        marginTop: 80,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: "absolute",
        bottom: 20
    }
}
