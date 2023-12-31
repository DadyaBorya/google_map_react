import React from 'react';
import {observer} from "mobx-react-lite";
import MapMarker from "./map-marker";
import {useMapStore} from "../context/map-store-context";

const MapDestinations = observer(() => {
    const ctx = useMapStore()

    return (
        <>
            {ctx.destinationPoints.map((p, index) => (
                p.location && (
                    <MapMarker
                        label={String.fromCharCode(66 + index)}
                        key={p.location.lng}
                        point={p}
                        onDragEnd={(location) => ctx.handleOnDrugEndDestinationPoint(location, index)}
                    />
                )
            ))}
        </>
    );
});

export default MapDestinations;
