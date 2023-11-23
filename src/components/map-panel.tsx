import React from 'react';
import MapInput from "./map-input";
import {observer} from "mobx-react-lite";
import {useMapStore} from "../context/map-store-context";

const MapPanel = observer(() => {
    const ctx = useMapStore()


    return (
        <div className="h-100 shadow rounded-2 p-2">
            <MapInput
                value={ctx.startPoint.address}
                onChange={(address) => ctx.handleChangeStartPointName(address)}
                onSubmit={(address) => ctx.handleSubmitStartPointName(address)}
            />

            {ctx.destinationPoints.map((p, index) => (
                <MapInput
                    key={index}
                    value={p.address}
                    onChange={(address) => ctx.handleChangeDestinationPointName(address, index)}
                    onSubmit={(address) => ctx.handleSubmitDestinationPointName(address, index)}
                />
            ))}

            <button
                disabled={!ctx.isAdditionalButton}
                className="btn btn-secondary w-100"
                onClick={() => ctx.handleClickAdditionalButton()}
            >Додати місце прибуття
            </button>
        </div>
    );
});

export default MapPanel;
