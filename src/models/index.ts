export interface Point {
    formattedAddress: string,
    addressComponent?: AddressComponent,
    location?: google.maps.LatLngLiteral,
    isValid: boolean,
    fromRoute?: Route,
    toRoute?: Route
}

export interface AddressComponent {
    street_address?: string;
    route?: string;
    intersection?: string;
    political?: string;
    country?: string;
    administrative_area_level_1?: string;
    administrative_area_level_2?: string;
    administrative_area_level_3?: string;
    administrative_area_level_4?: string;
    administrative_area_level_5?: string;
    administrative_area_level_6?: string;
    administrative_area_level_7?: string;
    colloquial_area?: string;
    locality?: string;
    sublocality?: string;
    neighborhood?: string;
    premise?: string;
    subpremise?: string;
    plus_code?: string;
    postal_code?: string;
    natural_feature?: string;
    airport?: string;
    park?: string;
    point_of_interest?: string;
}

export interface Route {
    distance: number,
    distanceString: string,
    duration: number,
    durationString: string,
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
