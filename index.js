let store = {drivers: [], passengers: [], trips: []};

let driverId = 0;
let passengerId = 0;
let tripId = 0;

class Driver {
    constructor(name) {
        this.id = ++driverId;
        this.name = name;
        // insert in the driver to the store
        store.drivers.push(this);
    };
    // returns all trips that a driver has taken
    trips() {
        return store.trips.filter(
            function(trip) {
                return trip.driverId === this.id;
            }.bind(this)
        );
    };
    // returns all passengers that a driver has taken on a trip
    passengers() {
        return this.trips().map(
            function(trip) {
                return trip.passenger();
            }//.bind(this)
        );
    };
};

class Passenger {
    constructor(name) {
        this.id = ++passengerId;
        this.name = name;
        store.passengers.push(this);
    };
    trips() {
        return store.trips.filter(
            function(trip) {
                return trip.passengerId === this.id;
            }.bind(this)
        );
    };
    drivers() {
        return this.trips().map(
            function(trip) {
                return trip.driver();
            }.bind(this)
        );
    };
};

class Trip {
    constructor(driver, passenger) {
        this.id = ++tripId;
        this.driverId = driver.id;
        this.passengerId = passenger.id;
        store.trips.push(this);
    };
    // return the driver associated with the trip
    driver() {
        return store.drivers.find(
            function(driver) {
                return driver.id === this.driverId;
            }.bind(this)
        );
    };
    // return the passenger associated with the trip
    passenger() {
        return store.passengers.find(
            function(passenger) {
                return passenger.id === this.passengerId;
            }.bind(this)
        );
    };
};