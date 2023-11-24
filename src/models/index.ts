export interface Point {
    address: string,
    location?: google.maps.LatLngLiteral,
    isValid: boolean,
    fromRoute?: Route,
    toRoute?: Route
}

export interface Route {
    distance: number,
    duration: number,
    address: string
}

export enum DirectionMode {
    OPTIMAL,
    SPEED ,
    DISTANCE
}

export const DirectionModeNames: Record<DirectionMode, string> = {
    [DirectionMode.OPTIMAL]: 'Оптимальний',
    [DirectionMode.SPEED]: 'Мінімальний час',
    [DirectionMode.DISTANCE]: 'Мінімальна відстань'
};
