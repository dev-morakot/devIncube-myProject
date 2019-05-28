import { BACKEND_ACCESS_TOKEN } from './../config/config';

export const apiHeader = () => {
    let config = {
        headers: {
            'Authorization': 'Bearer '+BACKEND_ACCESS_TOKEN,
            'Accept': 'application/json'
        }
    };
    return config;
}