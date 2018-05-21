
var $sampleMetadata = document.getElementById("sampleMetadata");

// Inital loading page
function init() {
    url = "/metadata/BB_940"
    d3.json(url, function(error, response) {
        if (error) return console.log(error);

        // console.log(response);

        var keys = Object.keys(response);
        // console.log(keys);
        //alert("Inside init")
        for (var i = 0; i < keys.length; i++) {
            var $p = document.createElement("p");
            $p.innerHTML = `${keys[i]}: ${response[keys[i]]}`;

            $sampleMetadata.appendChild($p);
        };
    });

    // When route = "/samples/BB_940":
    Plotly.d3.json('/samples/BB_940', function(error, samp_response){
        if (error) return console.warn(error);
        //alert("Inside /samples/BB_940")

        console.log(samp_response)
        labels = samp_response.otu_ids.slice(0,10)
        vals = samp_response["sample_values"].slice(0,10)

        // set up data for pie chart
        var data = [{
            values: labels,
            labels: vals,
            // hovertext: bacteriaNamesPie,
            hoverinfo: {bordercolor: 'black'},
            type: 'pie'
            }];
        console.log("data: " + data);
        var layout = {
            title: "Samples"}
        
        var PIE = document.getElementById('pie');
        Plotly.plot(PIE, data, layout);
    });

}



// call init function:
init();