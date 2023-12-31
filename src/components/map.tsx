import React from 'react';
import {observer} from "mobx-react-lite";
import {GoogleMap} from "@react-google-maps/api";
import {useMapStore} from "../context/map-store-context";
import MapStartMarker from "./map-start-marker";
import MapDirections from "./map-directions";
import MapDestinations from "./map-destinations";
import MapInfoButton from "./map-info-button";
import MapInfo from "./map-info";

const Map = observer(() => {
    const ctx = useMapStore()

    return (
        <div className="w-100 h-100 position-relative">
            {!ctx.isInfoOpen ?
                <GoogleMap
                    center={ctx.startPosition}
                    zoom={15}
                    mapContainerClassName="w-100 h-100 rounded-2"
                    mapContainerStyle={{border: "1px solid #727272", borderRadius: "15px"}}
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
                :
                <MapInfo/>
            }




           <MapInfoButton/>
        </div>
    );
});

export default Map;
