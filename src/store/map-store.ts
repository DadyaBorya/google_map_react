import {makeAutoObservable, runInAction} from "mobx";
import {DirectionMode, Point, Route} from "../models";


class MapStore {
    map: google.maps.Map | null = null
    startPosition: google.maps.LatLngLiteral = {lat: 50.4546, lng: 30.5238}
    startPoint: Point = {address: ""} as Point
    destinationPoints: Point[] = []
    isAdditionalButton: boolean = true
    directions: google.maps.DirectionsResult | null = null
    directionMode: DirectionMode = DirectionMode.OPTIMAL
    isBackDirection: boolean = false
    isRouteComplete: boolean = false

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


            if(this.destinationPoints.length === 0) {
                runInAction(() => {
                    this.isAdditionalButton = true
                })
            } else {
                const isValid = this.checkIsAllPointValid();


                runInAction(() => {
                    this.isAdditionalButton = isValid
                })
            }

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
        if (this.destinationPoints.length === 0) {
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
        this.directions = null
        this.setIsRouteComplete(false)
    }

    handleChangeDestinationPointName(address: string, index: number) {
        this.destinationPoints[index].address = address
        this.destinationPoints[index].isValid = false
        this.directions = null
        this.setIsRouteComplete(false)

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
        if (!this.checkIsAllPointValid()) {
            console.log("Can't build the routes")
            this.directions = null
            this.setIsRouteComplete(false)
            return
        }

        const directionsService = new google.maps.DirectionsService()

        const origin = this.startPoint.location!

        let destination = this.destinationPoints[this.destinationPoints.length - 1].location!

        const waypoints: google.maps.DirectionsWaypoint[] = this.destinationPoints.map(p => {
            return {
                location: p.location!
            }
        });

        if(!this.isBackDirection) {
            waypoints.pop()
        } else {
            destination = this.startPoint.location!
        }

        try {
            const request: google.maps.DirectionsRequest =
                {
                    origin,
                    waypoints,
                    destination,
                    travelMode: google.maps.TravelMode.DRIVING,
                }

            switch (this.directionMode) {
                case DirectionMode.DISTANCE:
                    request.drivingOptions = {
                        departureTime: new Date(),
                        trafficModel: google.maps.TrafficModel.BEST_GUESS,
                    }
                    break;
                case DirectionMode.SPEED:
                    request.optimizeWaypoints = true
                    break;
            }


            const result = await directionsService.route(request)

            runInAction(() => {
                this.directions = result
            })

            let index = 0

            for (const leg of result.routes[0].legs) {
                let distance = leg.distance?.value || 0
                let duration = leg.duration?.value || 0

                distance = Math.round(distance / 100) / 10;

                const route: Route = {distance, duration, address: ""}
                this.addRouteToPoints(route, index++)
            }

            this.setIsRouteComplete(true)
        } catch (error) {
            this.directions = null
            this.setIsRouteComplete(false)
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

    addRouteToPoints(route: Route, index: number) {
        if (index === 0) {
            runInAction(() => {
                route.address = this.destinationPoints[index].address
                this.startPoint.toRoute = route

                route.address = this.startPoint.address
                this.destinationPoints[index].fromRoute = route
            })
            return;
        }

        if(index === this.destinationPoints.length && this.isBackDirection) {
            runInAction(() => {
                route.address = this.startPoint.address;
                this.destinationPoints[index - 1].toRoute = route

                route.address = this.destinationPoints[index - 1].address;
                this.startPoint.fromRoute = route;
            })
            return;
        }

        runInAction(() => {
            route.address = this.destinationPoints[index].address
            this.destinationPoints[index - 1].toRoute = route

            route.address = this.destinationPoints[index - 1].address
            this.destinationPoints[index].fromRoute = route
        })
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

    setDirectionMode(mode: DirectionMode) {
        runInAction(() => {
            this.directionMode = mode
        })

        this.calculateRoutes()
    }


    setIsBackDirection(bool: boolean) {
        runInAction(() => {
            this.isBackDirection = bool
        })

        this.calculateRoutes()
    }

    setMap(map: google.maps.Map) {
        this.map = map
    }

    deleteStartPoint() {
        runInAction(() => {
            this.startPoint.address = ""
            this.startPoint.isValid = false
            this.startPoint.location = undefined
        })

       if(this.destinationPoints.length === 0) {
           runInAction(() => {
               this.isAdditionalButton = true
           })
       }



        this.calculateRoutes()
    }

    deleteDestinationPoint(index: number) {
        this.destinationPoints = this.destinationPoints.filter((p, i) => i !== index)

        if(this.destinationPoints.length === 0) {
            runInAction(() => {
                this.isAdditionalButton = true
            })
        } else {
            const isValid = this.checkIsAllPointValid()
            runInAction(() => {
                this.isAdditionalButton = isValid
            })
        }

        this.calculateRoutes()
    }

    setIsRouteComplete(bool: boolean) {
        this.isRouteComplete = bool
    }
}

export default new MapStore()
