import React from 'react';
import {MapStoreContext} from "../context/map-store-context";
import mapStore from "../store/map-store";
import {Libraries, useJsApiLoader} from "@react-google-maps/api";
import Map from "../components/map";
import MapPanel from "../components/map-panel";

const libraries: Libraries = ['places']

const MapPage = () => {
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? "",
        language: "uk",
        libraries
    })



    if (!isLoaded) {
        return <div>Loading...</div>
    }

    return (
        <MapStoreContext.Provider value={mapStore}>
            <div className="container d-flex justify-content-center p-5" style={{height: "100vh"}}>
                <div className="row w-100">
                    <div className="col-5">
                        <MapPanel/>
                    </div>
                    <div className="col-7">
                        <Map/>
                    </div>
                </div>
            </div>
        </MapStoreContext.Provider>
    );
};

export default MapPage;
