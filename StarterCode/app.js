updatePlotly();
function updatePlotly() {

d3.json("./samples.json").then(function(data) {
        console.log(data);

var samples = data["samples"]


for (i in samples) { 
d3.select("select").append("option").attr("value", i).text(samples[i]["id"]);
}

var dropdownMenu = d3.select("#selDataset");

var dataset = dropdownMenu.property("value");
let x = [];
let y =[];

x = samples[dataset]["sample_values"].slice(0, 10).reverse();
y = samples[dataset]["otu_ids"].slice(0, 10).reverse();
t = samples[dataset]["otu_labels"].slice(0, 10).reverse();
for (i in y) {y[i] = "OTU "+y[i]};


var metadata = data["metadata"][dataset]
var meta_keys = Object.keys(metadata)
var meta_values = Object.values(metadata)
        console.log(metadata);

 
d3.select("#sample-metadata").html("");
for (i in meta_keys) {d3.select("#sample-metadata").append("p").append("span").text(`${meta_keys[i]}: ${meta_values[i]}`)

}

var bar_trace = {
  type: 'bar',
  x: x,
  y: y,
  text: t,
  orientation: 'h'
};
let bar_data = [bar_trace]
Plotly.newPlot('bar', bar_data);

colour = samples[dataset]["otu_ids"];
size = samples[dataset]["sample_values"];
t = samples[dataset]["otu_labels"];


var bubble_trace = {
        x: colour,
        y: size,
        mode: 'markers',
        marker: {
          color: colour,
          size: size
        }
      };
      
      var bubble_data = [bubble_trace];
      
      Plotly.newPlot('bubble', bubble_data);

});
}