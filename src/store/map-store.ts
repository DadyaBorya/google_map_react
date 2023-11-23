import {makeAutoObservable, runInAction} from "mobx";
import {Point} from "../models";

class MapStore {
    map: google.maps.Map | null = null
    startPosition: google.maps.LatLngLiteral = {lat: 50.4546, lng: 30.5238}
    startPoint: Point = {address: ""} as Point
    destinationPoints: Point[] = []
    isAdditionalButton: boolean = true
    directions: google.maps.DirectionsResult | null = null

    constructor() {
        makeAutoObservable(this)
    }

    async handleOnDrugEndStartPoint(location: google.maps.LatLngLiteral) {
        try {
            const geo = await this.getGeocodeFormLocation(location);

            runInAction(() => {
                this.startPoint.location = location
                this.startPoint.address = geo.formatted_address;
                this.startPoint.isValid = true
            })
            await this.calculateRoutes()
        } catch (error) {
            runInAction(() => {
                this.startPoint.isValid = false
            })
            console.log(error)
        }
    }

    async handleOnDrugEndDestinationPoint(location: google.maps.LatLngLiteral, index: number) {
        try {
            const geo = await this.getGeocodeFormLocation(location);
            console.log(geo)
            runInAction(() => {
                this.destinationPoints[index].location = location
                this.destinationPoints[index].address = geo.formatted_address;
                this.destinationPoints[index].isValid = true
            })
            await this.calculateRoutes()
        } catch (error) {
            runInAction(() => {
                this.destinationPoints[index].isValid = false
            })
            console.log(error)
        }
    }

    async handleSubmitStartPointName(address: string) {
        try {
            const geo = await this.getGeocodeFromAddress(address);
            const {lat, lng} = geo.geometry.location

            runInAction(() => {
                this.startPoint.location = {lat: lat(), lng: lng()}
                this.startPoint.address = geo.formatted_address;
                this.startPoint.isValid = true
            })

            this.moveCamera({lat: lat(), lng: lng()})
            await this.calculateRoutes()
        } catch (error) {
            runInAction(() => {
                this.startPoint.isValid = false
            })
            console.log(error)
        }
    }

    async handleSubmitDestinationPointName(address: string, index: number) {
        try {
            const geo = await this.getGeocodeFromAddress(address)
            const {lat, lng} = geo.geometry.location

            runInAction(() => {
                this.destinationPoints[index].location = {lat: lat(), lng: lng()}
                this.destinationPoints[index].address = geo.formatted_address;
                this.destinationPoints[index].isValid = true
            })

            this.moveCamera({lat: lat(), lng: lng()})

            const isValid = this.checkIsAllPointValid();

            runInAction(() => {
                this.isAdditionalButton = isValid
            })
            await this.calculateRoutes();

        } catch (error) {
            runInAction(() => {
                this.destinationPoints[index].isValid = false
            })
            console.log(error)
        }
    }

    checkIsAllPointValid(): boolean {
        if(this.destinationPoints.length === 0) {
            return false;
        }

        const count = this.destinationPoints
            .filter(p => p.isValid).length;

        if (!this.startPoint.isValid) {
            return false;
        }

        return count === this.destinationPoints.length
    }

    handleClickAdditionalButton() {
        this.destinationPoints.push(
            {address: ""} as Point
        );

        runInAction(() => {
            this.isAdditionalButton = false
        })
    }

    handleChangeStartPointName(address: string) {
        this.startPoint.isValid = false;
        this.changeStartPointAddress(address)
        this.calculateRoutes();
    }

    handleChangeDestinationPointName(address: string, index: number) {
        this.destinationPoints[index].address = address
        this.destinationPoints[index].isValid = false
        this.calculateRoutes();

        runInAction(() => {
            this.isAdditionalButton = false
        })
    }

    changeStartPointAddress(address: string) {
        this.startPoint.address = address;
    }

    moveCamera(place: google.maps.LatLngLiteral) {
        this.map?.panTo(place);
        this.map?.setZoom(10)
    }

    async calculateRoutes() {
        if(!this.checkIsAllPointValid()) {
            console.log("Can't build the routes")
            this.directions = null
            return
        }

        const directionsService = new google.maps.DirectionsService()

        const origin = this.startPoint.location!

        const destination = this.destinationPoints[this.destinationPoints.length - 1].location!

        const waypoints: google.maps.DirectionsWaypoint[] = this.destinationPoints.map(p => {
            return {
                location: p.location!
            }
        });

        waypoints.pop()

        try {
            const request: google.maps.DirectionsRequest = {origin, waypoints, destination, travelMode: google.maps.TravelMode.DRIVING}

            const result = await directionsService.route(request)

            runInAction(() => {
                this.directions = result
            })
        } catch (error) {
            console.log("Error calculate routes: ", error)
        }
    }

    async getGeocodeFromAddress(address: string): Promise<google.maps.GeocoderResult> {
        const geocoder = new google.maps.Geocoder();
        try {
            const response = await geocoder.geocode({address});
            return response.results[0]
        } catch (error) {
            console.error('Error during geocoding:', error);
            throw new Error('Geocoding failed');
        }
    }

    async getGeocodeFormLocation(location: google.maps.LatLngLiteral): Promise<google.maps.GeocoderResult> {
        const geocoder = new google.maps.Geocoder();
        try {
            const response = await geocoder.geocode({location});
            return response.results[0]
        } catch (error) {
            console.error('Error during geocoding:', error);
            throw new Error('Geocoding failed');
        }
    }

    setMap(map: google.maps.Map) {
        this.map = map
    }
}

export default new MapStore()
