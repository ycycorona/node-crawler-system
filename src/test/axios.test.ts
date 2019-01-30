import axios from 'utils/request/simulate-browser-axios'
import * as fs  from 'fs-extra'

const headers = {
  'Referer': 'http://flights.ctrip.com/itinerary/oneway/bhy-tao?date=2019-01-31',
  'Origin': 'http://flights.ctrip.com',
}
const requestData = {
  "flightWay": "Oneway",
  "classType": "ALL",
  "hasChild": false,
  "hasBaby": false,
  "searchIndex": 1,
  "airportParams": [{
    "dcity": "BHY",
    "acity": "TAO",
    "date": "2019-01-31",
    "aport": "",
    "aportname": ""
  }],
  "army": false,
}
axios({
  method: 'POST',
  url: `http://flights.ctrip.com/itinerary/api/12808/products`,
  data: requestData,
  headers
})
  .then(function(response) {
    console.log(response.data.status)
  })
  .catch((err) => {
    console.log(err.message, err.request._headers)
  })
