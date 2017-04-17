import React, {PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

const ClusterMarker = ({count}) => {
    return (
        <View style={styles.container}>
            <View style={styles.bubble}>
                <Text style={styles.count}>{count}</Text>
            </View>
            <View style={styles.arrowBorder}/>
            <View style={styles.arrow}/>
        </View>
    );
};

ClusterMarker.propTypes = {
    count: PropTypes.number.isRequired,
};

export default ClusterMarker;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    bubble: {
        flex: 0,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#217ab9',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 3,
        borderColor: '#FFFFFF',
        borderWidth: 0.5,
    },
    count: {
        color: '#FFFFFF',
        fontSize: 13,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderWidth: 4,
        borderColor: 'transparent',
        borderTopColor: '#217ab9',
        alignSelf: 'center',
        marginTop: -9,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderWidth: 4,
        borderColor: 'transparent',
        borderTopColor: '#FFFFFF',
        alignSelf: 'center',
        marginTop: -0.5,
    },
});
