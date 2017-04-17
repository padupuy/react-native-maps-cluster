import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import {MapView} from 'expo';

import ClusterMarker from './ClusterMaker';
import {getRegion, getCluster} from './MapUtils';

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE2 = -122.4334;

const markers = [
    {
        latitude: LATITUDE,
        longitude: LONGITUDE
    }, {
        latitude: LATITUDE,
        longitude: LONGITUDE2
    }
];

export default class App extends Component {
    constructor(props) {
        super(props);

        const region = getRegion(LATITUDE, LONGITUDE, LATITUDE_DELTA);

        this.state = {region};

        this.renderMarker = this.renderMarker.bind(this);
    }

    increment() {
        const region = getRegion(
            this.state.region.latitude,
            this.state.region.longitude,
            this.state.region.latitudeDelta * 0.5
        );

        this.setState({region});
    }

    decrement() {
        const region = getRegion(
            this.state.region.latitude,
            this.state.region.longitude,
            this.state.region.latitudeDelta / 0.5
        );

        this.setState({region});
    }

    handleClusterMarkerPress(marker) {
        const region = getRegion(
            marker.geometry.coordinates[1],
            marker.geometry.coordinates[0],
            this.state.region.latitudeDelta * 0.5,
        );

        this.setState({region});
    }

    renderMarker(marker, _index) {
        const key = _index + marker.geometry.coordinates[0];

        if (marker.properties) {
            return (
                <MapView.Marker
                    key={`${key}${marker.properties.cluster_id}`}
                    coordinate={{latitude: marker.geometry.coordinates[1], longitude: marker.geometry.coordinates[0]}}
                    onPress={() => this.handleClusterMarkerPress(marker)}
                >
                    <ClusterMarker count={marker.properties.point_count}/>
                </MapView.Marker>
            )
        }
        else {
            return (
                <MapView.Marker
                    key={key}
                    coordinate={{latitude: marker.geometry.coordinates[1], longitude: marker.geometry.coordinates[0]}}
                />
            )
        }
    }

    render() {
        const places = markers.map(place => {
            return {
                geometry: {
                    coordinates: [
                        place.longitude,
                        place.latitude,
                    ]
                }
            }
        });

        const cluster = getCluster(places, this.state.region);

        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={this.state.region}

                >
                    {
                        cluster.markers.map(this.renderMarker)
                    }
                </MapView>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => this.decrement()}
                        style={[styles.bubble, styles.button]}
                    >
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.increment()}
                        style={[styles.bubble, styles.button]}
                    >
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});