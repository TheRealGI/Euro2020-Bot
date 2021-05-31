const fetch = require('node-fetch');
require('dotenv').config();
const baseUrl = process.env.API_BASE_URL
const options = {
    json: true,
    headers: {
        'X-Auth-Token' : process.env.API_KEY
    }
}

const getHttpRequest =  (async function (path) {
    try {
        const response = await fetch(`${baseUrl + path}`,{...options});
        return await response.json();
    } catch (error) {
        console.log(error);
    }
})

module.exports = { getHttpRequest};