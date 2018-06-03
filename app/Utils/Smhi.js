import axios from 'axios';

export default class Smhi {

    getWeather(lat, lng) {
        // Test function
        axios.get(`https://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/${parseFloat(lng).toFixed(6)}/lat/${parseFloat(lat).toFixed(6)}/data.json`)
            .then(() => {
                console.log('success');
            })
            .catch(() => {
                console.log('fail');
            });
    }
}