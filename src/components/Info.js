import React from 'react';
import { Text, View } from 'react-native';

const Info = ({
    header, detail, style
}) => (
    <View style={[styles.wrapper, style]}>
        <Text style={styles.header}>{header}</Text>
        <Text style={styles.detail}>{detail}</Text>
    </View>
);

const styles = {
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 18,
        color: "#999",
        lineHeight: 35,
        textAlign: "center"
    },
    detail: {
        color: "#2c2e31",
        fontSize: 22,
        textAlign: "center",
        fontWeight: '600',
    }
}

export default Info;
