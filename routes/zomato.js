var zomato = require('zomato-api');
var client = zomato({
    userKey:'d58b0f5939e34d258dd866d357453db3'
})

const Zomato = require('zomato.js');
const zomat = new Zomato('d58b0f5939e34d258dd866d357453db3');

module.exports = (zomatos,kenx)=>{
    zomatos.post('/zomatosearch',(req, res) => {
        function restaurants(long,lati){
            zomat.geocode({
                lat: lati,
                lon: long
            })
            .then((data)=>{
                var nearbyRest = data.nearby_restaurants;
                var Mainlist = []
                var simplelist = {}
                for(var i of nearbyRest){
                    simplelist.name = (i.restaurant.name)
                    simplelist.average_cost_for_two = (i.restaurant.average_cost_for_two)
                    simplelist.price_range = (i.restaurant.price_range)
                    simplelist.has_online_delivery = (i.restaurant.has_online_delivery)
                    simplelist.cuisines = (i.restaurant.cuisines)
                    simplelist.featured_image = (i.restaurant.featured_image)
                    Mainlist.push(simplelist)
                    simplelist={}
                }
                // return res.json(Mainlist)
                return res.render('zomato.ejs',{data:Mainlist})
            })
            .catch((err)=>{
                console.log(err)
                return res.status(404)
            })
        }
    
    
        function location(city){
            client.getLocations({query: city})
            .then((data)=>{
                long=data.location_suggestions[0].longitude;
                lati=data.location_suggestions[0].latitude;
                restaurants(long,lati)})
            .catch(err =>{return res.status(404)});
    }
    location(req.body.search)
});

// another post method to make serch box in home page    

}