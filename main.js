
const express = require('express')
const app = express()
const path = require('path') 
const port = 80
const bodyParser = require('body-parser')
const schedule = require('node-schedule')
const request = require('request')
const rp = require('request-promise');
const Promise = require("bluebird")
const { promises } = require('fs')
const apiKey = '';
let DeviceDataFromApi;
let DeviceTemperatureFromApi;
let DeviceDataOnlyoccupationFromApi;
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(
  express.static(
    path.join(path.normalize(__dirname),'/applio-nodejs-showcase-app/dist/applio-nodejs-showcase-app/')
  )
);

  schedule.scheduleJob('*/1 * * * *', () => {
    getDevicesFromTheApplications().then(devices => {
      roomdatahandling('zonestate',devices).then((x) => occupancy(x, devices));
      roomdatahandling('temperature',devices).then((x) => temperature(x, devices));
    });
  });


app.get('/gettemperaturestate', (req,res) => {
  res.status(200).json(DeviceTemperatureFromApi);
});


app.get('/getzonestate', (req, res) => {
  res.status(200).json(DeviceDataFromApi);
});


app.get('/getzonestate', (req, res) => {
  res.status(200).json(DeviceDataFromApi);
});

app.get('/getblueprints', (req, res) => {
  res.status(200).json(DeviceDataOnlyoccupationFromApi);
});


app.get('/', (req, res) => {
  res.sendFile('index.html',{
    root: 'dist/applio-nodejs-showcase-app/'
  });
});

app.listen(port, () => {
  console.log(`Server running on port:${port}`)
})

 getDevicesFromTheApplications = () => {
  let url = 'https://data.applio.tech/data/application/devices';
  const options = {
    url: url,
    method: 'GET',
    headers: {
      'Grpc-Metadata-Authorization': apiKey
    },
    json: true
  };
  return rp(options);
        
}

roomdatahandling  = (argument, devices) => {
  return Promise.map(devices, id => getDataFromApplioApi(id.id, argument, 'latest'), {concurrency: 100} )
  .then((data) => data.filter(a => a !== null && a.length > 0));
}

function occupancy(data, devices){
  DeviceDataOnlyoccupationFromApi = data.map(obj => { 
    NameAndCommentForTheDeviceSecond = devices.filter(x => x.id == obj[0].dev_eui);
    return {name: NameAndCommentForTheDeviceSecond[0].name,roomState: obj[0].data > 0 || obj[1].data > 0 ? 'occupied' : obj[1].data === 1 && obj[0].data > 0  ? 'Entering or leaving' : 'unoccupied'}
  });
  
    DeviceDataFromApi =  data.map(obj =>{
    NameAndCommentForTheDevice = devices.filter(x => x.id == obj[0].dev_eui);
    return {dev_eui: obj[0].dev_eui,
      dataO: obj[1].data,
      dataM: obj[0].data,
      roomState: obj[0].data > 0 || obj[1].data > 0 ? 'occupied' : obj[1].data === 1 && obj[0].data > 0  ? 'Entering or leaving' : 'unoccupied',
      receive_date: obj[0].receive_date,
      name:  NameAndCommentForTheDevice[0].name,
      comment: NameAndCommentForTheDevice[0].comment
    }
  });
}

function temperature(data, devices){
    DeviceTemperatureFromApi =  data.map(obj =>{
      NameAndCommentForTheDevice = devices.filter(x => x.id == obj[0].dev_eui);
        return {
          dev_eui: obj[0].dev_eui,
          temperature: obj[0].data,
          receive_date: obj[0].receive_date,
          name:  NameAndCommentForTheDevice[0].name,
          comment: NameAndCommentForTheDevice[0].comment
        }
    });
}

function getDataFromApplioApi(deviceid, measurment, time) {
   let url = `https://data.applio.tech/data/device/${deviceid}/${measurment}/${time}`;
  const options = {
    url: url,
    method: 'GET',
    headers: {
      'Grpc-Metadata-Authorization': apiKey
    },
    json: true
  };

  return rp(options).then(data => {
     if(!data) //console.log(data, url);
    return data;
  });

}

