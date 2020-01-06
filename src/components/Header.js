import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const Header = ({
    title, buttonTitle, onPress
}) => (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text>{buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    );

    const styles = {
        header: {
            flexDirection: 'row',
            height: 54,
            justifyContent: 'center',
            alignItems: 'center'
        },
        title: {
            textAlign: "center",
            fontSize: 24
        },
        button: {
            position: "absolute",
            right: 10,
        }
    }
export default Header;
