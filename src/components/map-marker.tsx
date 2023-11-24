import React, {FC, useState} from 'react';
import {Marker} from "@react-google-maps/api";
import MapMarkerInfoWindow from "./map-marker-info-window";
import {Point} from "../models";

interface IMapMarker {
    point: Point
    onDragEnd: (location: google.maps.LatLngLiteral) => void,
    label: string
}

const MapMarker: FC<IMapMarker> = ({point, onDragEnd, label}) => {
    const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false)

    const handleMarketOnDragEnd = (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            let {lat, lng} = e.latLng
            onDragEnd({lat: lat(), lng: lng()});
        }
    }

    const handleOnMarkerClick = () => {
        if(point.fromRoute || point.toRoute) {
            setIsInfoWindowOpen(true)
        }
    }

    return (
        <>
            <Marker
                position={point.location!}
                onDragEnd={handleMarketOnDragEnd}
                onClick={() => handleOnMarkerClick()}
                draggable={true}
                label={{
                    color: "white",
                    text: label,
                }}
            />
            <MapMarkerInfoWindow
                isOpen={isInfoWindowOpen}
                handleOnClose={(bool) => setIsInfoWindowOpen(bool)}
                point={point}
            />
        </>

    );
};

export default MapMarker;
