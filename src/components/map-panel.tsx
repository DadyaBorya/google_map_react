import React from 'react';
import {observer} from "mobx-react-lite";
import {useMapStore} from "../context/map-store-context";
import MapDirectionMapMode from "./map-direction-map-mode";
import MapListInputs from "./map-list-inputs";

const MapPanel = observer(() => {
    const ctx = useMapStore()


    return (
        <div className="h-100 shadow rounded-2 p-2 d-flex flex-column justify-content-between">
           <div className="h-100" style={{overflowY: "auto"}}>
               <MapListInputs/>
           </div>
            <div>
                <button
                    disabled={!ctx.isAdditionalButton}
                    className="btn btn-secondary w-100 mb-3"
                    onClick={() => ctx.handleClickAdditionalButton()}
                >
                    Додати місце прибуття
                </button>
                <MapDirectionMapMode/>
            </div>
        </div>
    );
});

export default MapPanel;
