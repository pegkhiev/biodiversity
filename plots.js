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
    
        console.log(result)
    

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
            marker: {
                color: otusampleArray[0].otu_ids,
                size: otusampleArray[0].sample_values
            }
        };

        var layout_bubble = {
            xaxis: {title: "OTU ID"},
        }

        Plotly.newPlot("bubble", [trace_bubble], layout_bubble);
        console.log("test")
    })

};
