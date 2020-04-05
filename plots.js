function init(){
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data)=>{
        console.log(data);
        var sampleNames = data.names;
        sampleNames.forEach((sample)=>{
            selector
            .append('option')
            .text(sample)
            .property('value', sample);
        })

        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == 940);
        var result = resultArray[0]
        var PANEL = d3.select("#sample-metadata");
        var resultKeys = []
        Object.keys(result).forEach((r) =>{
            resultKeys.push(r)
        })
        

        PANEL.html("");
        PANEL.append("h6").text(resultKeys[0] + ": " + result.id)
        PANEL.append("h6").text(resultKeys[1]  + ": " +result.ethnicity)
        PANEL.append("h6").text(resultKeys[2] + ": "+ result.gender)
        PANEL.append("h6").text(resultKeys[3] + ": "+ result.age)
        PANEL.append("h6").text(resultKeys[4] + ": " + result.location)
        PANEL.append("h6").text(resultKeys[5] + ": "+ result.bbtype)
        PANEL.append("h6").text(resultKeys[6] + ": " + result.wfreq)
    
        console.log(result);

        var otusamples = data.samples;
        var otusampleArray = otusamples.filter(item => item.id == 940);
        var sampleVal = otusampleArray[0].sample_values.slice(0,10).reverse()
        var otuID = otusampleArray[0].otu_ids.slice(0,10).reverse()
        var otuLabel = otusampleArray[0].otu_labels.slice(0,10).reverse()
        var xLabel = []
        otuID.forEach((n)=>{
            xLabel.push("OTU " + n)
        })
        console.log(sampleVal)
        console.log(otuID)
        console.log(xLabel)
        
    
        var trace1 = {
            y: xLabel,
            x: sampleVal,
            text: otuLabel,
            type: 'bar',
            orientation: 'h'}
        
        Plotly.newPlot("bar", [trace1]);
      
        var trace_bubble = {
            x: otusampleArray[0].otu_ids,
            y: otusampleArray[0].sample_values,
            text: otuLabel,
            mode: "markers",
            marker: {
                color: otusampleArray[0].otu_ids,
                size: otusampleArray[0].sample_values
            }
        };
        // var metadata  = data.metadata;
        var wfreqArray = metadata.filter(item => item.id == 940);
        var wfreqVal = wfreqArray[0].wfreq
        var data = [
            {domain: {x:[0,1], y:[0,1]},
            value: wfreqVal,
            title: "Belly Button Washing Frequency",
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                colorscale: "Greens",
                axis: {range: [null, 9]},
                steps: [{range: [0,1], color: "rgb(233,247,200)"} ,{range: [1,2],color: "rgb(221,240,177)"},
                {range: [2,3], color: 'rgb(205,227,154)'},{range: [3,4], color: 'rgb(186, 209, 132)'},{range: [4,5], color: 'rgb(164, 189, 106'},
                {range: [5,6], color: 'rgb(135,161,76)'},{range: [6,7], color: 'rgb(124,153,57)'},{range: [7,8], color: 'rgb(109,138,43)'},
                {range: [8,9], color: 'rgb(99, 128, 33)'}]     
            }
            
            }]
        Plotly.newPlot('gauge', data);

        var layout_bubble = {
            xaxis: {title: "OTU ID"},
        }

        Plotly.newPlot("bubble", [trace_bubble], layout_bubble);
        console.log("test")
  

        });
    }

init();

function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
    buildGauge(newSample);
}

function buildMetadata(sample) {
    d3.json('samples.json').then((data)=>{
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0]
        var PANEL = d3.select("#sample-metadata");
        var resultKeys = []
        Object.keys(result).forEach((r) =>{
            resultKeys.push(r)
        })

        PANEL.html("");
        PANEL.append("h6").text(resultKeys[0] + ": " + result.id)
        PANEL.append("h6").text(resultKeys[1]  + ": " +result.ethnicity)
        PANEL.append("h6").text(resultKeys[2] + ": "+ result.gender)
        PANEL.append("h6").text(resultKeys[3] + ": "+ result.age)
        PANEL.append("h6").text(resultKeys[4] + ": " + result.location)
        PANEL.append("h6").text(resultKeys[5] + ": "+ result.bbtype)
        PANEL.append("h6").text(resultKeys[6] + ": " + result.wfreq)
    
        console.log(result)

        
    })}

function buildCharts(sample) {
    d3.json('samples.json').then((data) =>{
        var otusamples = data.samples;
        var otusampleArray = otusamples.filter(item => item.id == sample);
        var sampleVal = otusampleArray[0].sample_values.slice(0,10).reverse()
        var otuID = otusampleArray[0].otu_ids.slice(0,10).reverse()
        var otuLabel = otusampleArray[0].otu_labels.slice(0,10).reverse()
        var xLabel = []
        otuID.forEach((n)=>{
            xLabel.push("OTU " + n)
        })
        console.log(sampleVal)
        console.log(otuID)
        console.log(xLabel)
        
    
        var trace1 = {
            y: xLabel,
            x: sampleVal,
            text: otuLabel,
            type: 'bar',
            orientation: 'h'}
        
        Plotly.newPlot("bar", [trace1]);
      
        var trace_bubble = {
            x: otusampleArray[0].otu_ids,
            y: otusampleArray[0].sample_values,
            text: otuLabel,
            mode: "markers",
            colorscale: "Earth",
            marker: {
                color: otusampleArray[0].otu_ids,
                size: otusampleArray[0].sample_values,
                colorscale: "Earth"
            }
        };

        var layout_bubble = {
            xaxis: {title: "OTU ID"},
        }

        Plotly.newPlot("bubble", [trace_bubble], layout_bubble);
        console.log("test")
    })

};

function buildGauge(sample) {
    d3.json('samples.json').then((data) =>{
        var metadata  = data.metadata;
        var wfreqArray = metadata.filter(item => item.id == sample);
        var wfreqVal = wfreqArray[0].wfreq;

        var data = [
            {domain: {x:[0,1], y:[0,1]},
            value: wfreqVal,
            title: "Belly Button Washing Frequency",
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                colorscale: "Greens",
                axis: {range: [null, 9]},
                steps: [{range: [0,1], color: "rgb(233,247,200)"} ,{range: [1,2],color: "rgb(221,240,177)"},
                {range: [2,3], color: 'rgb(205,227,154)'},{range: [3,4], color: 'rgb(186, 209, 132)'},{range: [4,5], color: 'rgb(164, 189, 106'},
                {range: [5,6], color: 'rgb(135,161,76)'},{range: [6,7], color: 'rgb(124,153,57)'},{range: [7,8], color: 'rgb(109,138,43)'},{range: [8,9], color: 'rgb(99, 128, 33)'}]
               
            }
            
            }]
        Plotly.newPlot('gauge', data)
        console.log(wfreqVal)
        
    })       
}
