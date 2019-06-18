const inst = d3.json("http://127.0.0.1:5000/api/institutions").then(function(d) {
    d.institution_name = d.institution_name,    
    d.street = d.street,
    d.latitude = +d.latitude,
    d.longitude = +d.longitude,
    d.state = d.state,
    d.website =d.website,
    d.zipcode = +d.zipcode    
// console.log(d);
});
