
var $sampleMetadata = document.getElementById("sampleMetadata");
var sample_now = "BB_940"
// Inital loading page
function init() {
    console.log("inside init again, sample_now: " + sample_now);
    url = "/metadata/" + sample_now;
    d3.json(url, function(error, response) {
        if (error) return console.log(error);

        console.log(response);

        var keys = Object.keys(response);
        console.log(keys);
        
        metadata_info = document.getElementById("sampleMetadata");
        for(var i=0; i<response[keys[i]].length; i++){
            
                //var p = document.createElement("p");
                //alert("Sample: " + sample_now);
                metadata_info.innerHTML = ""
                metadata_info.innerHTML = `${keys[i]}: ${response[keys[i]]}`;
    
                metadata_info.appendChild(p);
        }
        // var table = document.getElementById("sampleMetadata");
       
        // for (var i = 0; i < keys.length; i++) {
        
        //     var temp = response[keys[i]];

        //     for(var j=0; j<temp.length; j++){
        //     var tr_elem = document.createElement("TR");
        //     tr_elem.setAttribute("id", "sample_cells");
        //     table.appendChild(tr_elem);
        //     var td_elem = document.createElement("TD");
        //     var temp1 = temp[j];//${keys[i]}: ${response[keys[i]]};
        //     var t = document.createTextNode(temp1);
        //     td_elem.appendChild(t);
        //     document.getElementById("sample_cells").appendChild(td_elem);
        //     }

        // };
       
    });

    // When route = "/samples/BB_940":
    samp_url = "/samples/" + sample_now;
    Plotly.d3.json(samp_url, function(error, samp_response){
        if (error) return console.warn(error);
        //alert("Inside /samples/BB_940")

        console.log(samp_response);
        labels = samp_response.otu_ids.slice(0,10);
        vals = samp_response["sample_values"].slice(0,10);

        // set up data for pie chart
        var data = [{
            values: labels,
            labels: vals,
            hoverinfo: {bordercolor: 'black'},
            type: 'pie'
            }];
        console.log("data: " + data);
        var layout = {
            title: "Samples"}
        
        var PIE = document.getElementById('pie');
        Plotly.plot(PIE, data, layout);
    });

    Plotly.d3.json('/names', function(error, names_response){
        if (error) return console.warn(error);
    
        console.log("Names Response:" + names_response);
        
        var name_select = document.getElementById('selDataset');
        for(i=0; i<names_response.length; i++){
            var elem = document.createElement("option");
            elem.textContent = names_response[i];
            elem.value = names_response[i];
            name_select.appendChild(elem);
        }
    
    });

    bubl_url = "/samples/" + sample_now; //eg. '/samples/BB_947'
    Plotly.d3.json(bubl_url, function(error, bubl_response){
       
        
        var bubbleDiv = document.getElementById("bubble");
 
        var traceA = {
        type: "scatter",
        mode: "markers",
        //x: [5, 13, 24, 35, 46, 60],
        x: bubl_response.otu_ids,
        //y: [40, 70, 65, 15, 75, 49],
        y : bubl_response.sample_values,
        marker: {
            //size: [100, 200, 800, 600, 500, 600],
            size: bubl_response.sample_values,
            sizemode: 'area'
        }
        };
        
        var data = [traceA];
        
        var layout = {
        title: "A Bubble Chart in Plotly"
        };
        
        Plotly.plot(bubbleDiv, data, layout);
    })
    

}


function optionChanged(val){
    sample_now = val;
    //alert("On change!")
    init();

}



// call init function:
init();