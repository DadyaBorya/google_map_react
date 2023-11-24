import React from 'react';
import {observer} from "mobx-react-lite";
import {useMapStore} from "../context/map-store-context";
import {DirectionMode} from "../models";

const MapDirectionMapMode = observer(() => {
    const ctx = useMapStore()

    return (
        <div>
            <div className="w-100 d-flex flex-row mb-3 ">
                <button
                    className={`w-100 small py-2 border-0 rounded-start-2 ${ctx.directionMode === DirectionMode.OPTIMAL ? "text-white bg-success" : "bg-light"}`}
                    onClick={() => ctx.setDirectionMode(DirectionMode.OPTIMAL)}
                >
                    Оптимальний
                </button>
                <button
                    className={`w-100 small py-2 border-0  ${ctx.directionMode === DirectionMode.SPEED ? "text-white bg-success" : "bg-light"}`}
                    onClick={() => ctx.setDirectionMode(DirectionMode.SPEED)}
                >
                    Мінімальний час
                </button>
                <button
                    className={`w-100 small py-2 border-0 rounded-end-2 ${ctx.directionMode === DirectionMode.DISTANCE ? "text-white bg-success" : "bg-light"}`}
                    onClick={() => ctx.setDirectionMode(DirectionMode.DISTANCE)}
                >
                    Мінімальна відстань
                </button>
            </div>


            <label className="d-flex gap-1 align-items-center" style={{cursor: "pointer"}}>
                <input id="back" type="checkbox" className="mt-1" checked={ctx.isBackDirection}
                       onChange={() => ctx.setIsBackDirection(!ctx.isBackDirection)}/>
                <div>Туди і назад</div>
            </label>
        </div>
    );
});

export default MapDirectionMapMode;
