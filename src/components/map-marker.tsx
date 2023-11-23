import React, {FC} from 'react';
import {InfoWindow, Marker} from "@react-google-maps/api";

interface IMapMarker {
    position: google.maps.LatLngLiteral
    onDragEnd: (location: google.maps.LatLngLiteral) => void
}

const MapMarker:FC<IMapMarker> = ({position, onDragEnd}) => {

    const handleMarketOnDragEnd = (e: google.maps.MapMouseEvent) => {
        if(e.latLng) {
            let {lat, lng} = e.latLng
            onDragEnd({lat: lat(), lng: lng()});
        }
    }

    return (
        <Marker
            position={position}
            onDragEnd={handleMarketOnDragEnd}
            draggable={true}
        />

    );
};

export default MapMarker;
