const path = require('path');
const express = require('express')
const hbs = require('hbs')
const forecast = require('../utils/forecast')


const app = express();

// Define paths for express config
const viewPath = path.join(__dirname,"../templates/views")
const publicPath = path.join(__dirname,"../public")
const partialsPath = path.join(__dirname,"../templates/partials")

// Setup handlebars engine and views paths
app.set('views',viewPath);
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

// Setup the public directory
app.use(express.static(publicPath))



app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Ashu"
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"Ashu"
    });
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error:'Could not get the help you wanted! Sorry!'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Ashu"
    });
})

app.get('/weather',(req,res)=>{

    if(!req.query.address) {
        return res.send({
            error:'You must provide an address'
        })
    }

    forecast.forecast(req.query.address,(error,{forecast,place} = {})=>{
        if(error){
            return res.send({error});
        }
        return res.send({
            forecast:forecast,
            location:place
        })
    })

})


app.get('*',(req,res) =>{
    res.render('404',{
        error:"Could not find what you were looking for"
    })
})


app.listen(3000,() => {
    console.log("Server is up on port 3000, open localhost:3000")
});