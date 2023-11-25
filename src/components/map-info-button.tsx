import React from 'react';
import {SignTurnLeft, XLg} from "react-bootstrap-icons";
import {observer} from "mobx-react-lite";
import {useMapStore} from "../context/map-store-context";

const MapInfoButton = observer(() => {
    const ctx = useMapStore()

    return (
        <div
            className={`position-absolute top-0 end-0 me-3 mt-3 py-3 px-3 rounded-5 ${ctx.isRouteComplete ? "bg-light" : "bg-danger"}`}
            style={{cursor: "pointer"}}
            onClick={() => ctx.isRouteComplete ? ctx.setIsInfoOpen(!ctx.isInfoOpen) : () => {}}
        >
            {ctx.isInfoOpen ?
                <XLg size={28}/>
                :
                <SignTurnLeft color={ctx.isRouteComplete ? "black" : "white"} size={28}/>
            }
        </div>
    );
});

export default MapInfoButton;
