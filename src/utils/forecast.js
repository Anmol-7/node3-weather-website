const request = require('request');
const forecast = (latitude,longitude,callback)=>{
    const url=`https://api.darksky.net/forecast/56fafd36d631d187903e2c9041512d99/${latitude},${longitude}?units=si`;
    request({url,json:true},(error,{body})=>{
       if(error)
          callback('unable to connect to weather service',undefined);
       else if(body.error)
       callback('unable to find location',undefined)
       else{
          callback(undefined,`${body.daily.data[0].summary}. It is currently ${body.currently.temperature} degrees out. The high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. There is ${body.currently.precipProbability*100}% chances of rain.`);
       }
    })
 }
 module.exports=forecast;