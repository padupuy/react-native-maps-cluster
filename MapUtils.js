import {Dimensions} from 'react-native';
import supercluster from 'supercluster';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

export function getRegion(latitude, longitude, latitudeDelta) {
    const LONGITUDE_DELTA = latitudeDelta * ASPECT_RATIO;

    return {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: LONGITUDE_DELTA,
    };
}

export function getCluster(places, region) {
    const cluster = supercluster({
        radius: 50,
        maxZoom: 16,
    });

    let markers = [];

    try {
        const padding = 0;

        cluster.load(places);

        markers = cluster.getClusters(
            [
                region.longitude - (region.longitudeDelta * (0.5 + padding)),
                region.latitude - (region.latitudeDelta * (0.5 + padding)),
                region.longitude + (region.longitudeDelta * (0.5 + padding)),
                region.latitude + (region.latitudeDelta * (0.5 + padding)),
            ],
            getZoomLevel(region.longitudeDelta)
        );
    }
    catch (e) {
        console.debug('failed to create cluster', e);
    }

    return {
        markers,
        cluster
    };
}

function getZoomLevel(longitudeDelta) {
    const angle = longitudeDelta;
    return Math.round(Math.log(360 / angle) / Math.LN2);
}
