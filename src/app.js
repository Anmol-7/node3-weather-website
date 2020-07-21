const path=require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast=require('./utils/forecast');

const app=express();
const port=process.env.PORT||3000

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Anmol Jain'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Anmol Jain'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name:'Anmol Jain',
        helpText:'This is some helpful text.'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address needed'
        })
    }
    const address=req.query.address;
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
           return res.send({error});
        }
        forecast(latitude,longitude,(error,forecastData)=>{
           if(error){
              return res.send({error});
           }
           res.send({
            forecast: forecastData,
            location,
            address
        });
           })
     })


    
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage:'Help article not found',
        title: '404',
        name:'Anmol Jain'
    });
})
app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'Page not found',
        title: '404',
        name:'Anmol Jain'})
})
app.listen(port,()=>{
    console.log('server is up on port'+port);
})