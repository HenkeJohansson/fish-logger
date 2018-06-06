import axios from 'axios';

export const getForecast = (latitude, longitude) => {
    const lon = longitude.toFixed(6);
    const lat = latitude.toFixed(6);
    return axios.get(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`)
        .then((res) => {
            // console.log('success', res.data);
            return res.data;
        })
        .catch((err) => {
            // console.log('fail', lat, lng);
            return err;
        });
};