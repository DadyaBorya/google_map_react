import React from 'react';
import {observer} from "mobx-react-lite";
import {useMapStore} from "../context/map-store-context";
import MapInfoList from "./map-info-list";

const MapInfo = observer(() => {
    const ctx = useMapStore()

    return (
        <div className="h-100 w-100 rounded-2 shadow px-2 py-4 d-flex justify-content-between flex-column"
             style={{background: "#E4E4E4", border: "1px solid #727272", borderRadius: "15px"}}
        >
            <MapInfoList/>
            <div className="d-flex gap-5">
                <div className="fs-5"><strong>Загальна відстань:</strong> {ctx.getSumDistanceString()}</div>
                <div className="fs-5"><strong>Загальний час:</strong> ~{ctx.getSumDurationString()}</div>
            </div>
        </div>
    );
});

export default MapInfo;
