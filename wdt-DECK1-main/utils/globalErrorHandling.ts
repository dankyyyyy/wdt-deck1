import { ILocation } from "~/types";

export async function checkConnection(location: ILocation): Promise<number> {
    const name = location.name;
    const long = location.longitude;
    const lat = location.latitude;
    const coordinates = decimalToCoordinates(long, lat);

    const c1 = coordinates.north;
    const c2 = coordinates.west;
    const c3 = coordinates.south;
    const c4 = coordinates.east;

    const url = `/data/${c1}/${c2}/${c3}/${c4}/${name}`;

    fetch(url)
        .then(response => response.json())
        .then(response => response.data.status)
        .catch(data => handleData(data));

    const response = fetch(url).then(response => response.json()).then(response => response.data.status);
    return response;
}

export function showError(message: string) {
    const errorBar = document.createElement("div");
    errorBar.classList.add("error-bar");

    const errorMessage = document.createElement("span");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = message;

    errorBar.appendChild(errorMessage);
    document.body.appendChild(errorBar);

    setTimeout(() => {
        errorBar.classList.add("fade-out");
        setTimeout(() => {
            document.body.removeChild(errorBar);
        }, 500);
    }, 5000);
}

export function decimalToCoordinates(long: number, lat: number) {
    const longDir = long >= 0 ? (long === 0 ? 'N' : 'E') : 'W';
    const latDir = lat >= 0 ? (lat === 0 ? 'E' : 'N') : 'S';
    const absoluteDecimalLong = Math.abs(long);
    const absoluteDecimalLat = Math.abs(lat);
    return {
        north: latDir === 'N' ? absoluteDecimalLat : absoluteDecimalLat * (-1),
        south: latDir === 'S' ? absoluteDecimalLat : absoluteDecimalLat * (-1),
        west: longDir === 'W' ? absoluteDecimalLong : absoluteDecimalLong * (-1),
        east: longDir === 'E' ? absoluteDecimalLong : absoluteDecimalLong * (-1),
    };
}

async function handleData(data: any): Promise<number> {
    const result = data.data;
    const status = data.status;

    switch (status) {
        case 200: {
            // logger.info("Connection established successfully.");
            console.log("Connection established successfully.");
            return status;
        }
        case 401: {
            // logger.error("Unauthorized.");
            console.log(`Unauthorized. (Status code: ${status})`);
            showError(`Unable to establish connection. Please try again later. (Status code: ${status})`);
            return status;
        }
        case 404: {
            console.log(`Not found. (Status code: ${status})`);
            showError(`Unable to establish connection. Please try again later. (Status code: ${status})`);
            return status;
        }
        case 500: {
            // logger.error("Internal Server Error")
            console.log(`Internal Server Error. (Status code: ${status})`);
            showError(`Unable to establish connection. Please try again later. (Status code: ${status})`);
            return status;
        }
        default: {
            // logger.error(`Unexpected error, status code: ${statusCode}.`);
            console.log(`Unexpected error, status code: ${status}.`);
            showError(`Unable to establish connection. Please try again later. (Status code: ${status})`);
            return status;
        }
    }
}