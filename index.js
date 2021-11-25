const express= require("express");
const https=require("https");
const bodyParser= require("body-parser");
const hbs=require('hbs')

const app=express();
const port=process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));  
app.set('view engine','hbs')
hbs.registerPartials(__dirname+ "/partials")

app.get("/", function(req,res){
  // res.sendFile(__dirname+"/index.html")
  res.render('index')

app.post("/",function(req,res){

  const city=req.body.city;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=849cf282d567ae4fd7a38ea580b16e6d&units=metric"

  https.get(url, function(response)
  {
    console.log(response.statusCode);
    response.on("data", function (data)
    {
      const weatherData= JSON.parse(data);
      if(weatherData.cod==404){
        res.render('error',{
          city:city
        })
      }
      else{
        const temp=weatherData.main.temp;
      const desc=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageUrl="https://openweathermap.org/img/wn/"+icon+"@4x.png"

      res.render('weather',{
        city: city,
        temp:temp,
        desc:desc,
        imageUrl:imageUrl
      })
      }
      
      // res.write("<h1>Temperature: "+temp+"</h1>");
      // res.write("Weather Description: "+desc);
      // res.write("<img src="+imageUrl+ ">");
      
    })
})
  })



});

app.listen(port, function() {
  console.log("Server is online.");
});