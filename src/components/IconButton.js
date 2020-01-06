import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const IconButton = ({
    selected, name, onPress
}) => (
        <TouchableOpacity style={[selected ? styles.selected : {}]} onPress={onPress}>
            <Icon
                name={name}
                size={26}
                style={[styles.button, selected ? styles.selected : {}]}
            />
        </TouchableOpacity>
    );

const styles = {
    button: {
        color: "#999",
        padding: 10
    },
    selected: {
        color: "#83ba43",
        borderTopWidth: 1,
        borderTopColor: "#83ba43"
    }
}

export default IconButton;
