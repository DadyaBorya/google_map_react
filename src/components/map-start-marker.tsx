import React from 'react';
import {observer} from "mobx-react-lite";
import MapMarker from "./map-marker";
import {useMapStore} from "../context/map-store-context";

const MapStartMarker = observer(() => {
    const ctx = useMapStore()

    return (
       <>
           {ctx.startPoint.location && (
               <MapMarker
                   position={ctx.startPoint.location}
                   onDragEnd={(location) => ctx.handleOnDrugEndStartPoint(location)}
               />
           )}
       </>
    );
});

export default MapStartMarker;
