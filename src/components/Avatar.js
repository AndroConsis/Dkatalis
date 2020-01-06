import React from 'react';
import { View, Image } from 'react-native';

const Avatar = ({
    source, style
}) => (
        <View style={styles.wrapper}>
            <Image
                source={{ uri: source }}
                resizeMode={"contain"}
                style={styles.image} />
        </View>
    );

const styles = {
    wrapper: {
        height: 160,
        width: 160,
        borderRadius: 80,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,.15)",
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 75,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,.15)",
    }
}

export default Avatar;
