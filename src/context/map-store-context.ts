import {createContext, useContext} from "react";
import MapStore from "../store/map-store";

export const MapStoreContext = createContext<typeof MapStore | null>(null);

export const useMapStore = () => {
    const context = useContext(MapStoreContext);

    if (context == null) {
        throw new Error("Store error")
    }

    return context
}


