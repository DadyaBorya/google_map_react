import React from 'react';
import {observer} from "mobx-react-lite";
import {GoogleMap} from "@react-google-maps/api";
import {useMapStore} from "../context/map-store-context";
import MapMarker from "./map-marker";
import MapStartMarker from "./map-start-marker";
import MapDirections from "./map-directions";
import MapDestinations from "./map-destinations";

const Map = observer(() => {
    const ctx = useMapStore()

    return (
        <GoogleMap
            center={ctx.startPosition}
            zoom={15}
            mapContainerClassName="w-100 h-100 rounded-2"
            onLoad={(map) => ctx.setMap(map)}
            options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
            }}
        >

            <MapStartMarker/>
            <MapDirections/>
            <MapDestinations/>
        </GoogleMap>
    );
});

export default Map;
