function makeplot() {
    Plotly.d3.csv("Data/college_worth_it_A.csv", function(data){ processData(data) } );
  
  };
  
  function processData(allRows) {
  
    console.log(allRows);
    var year = [], a = [], b = [];
  
    for (var i=0; i < allRows.length; i++) {
      row = allRows[i];
      year.push( row['Educational attainment'] );
      a.push( row['Unemployment rate (%)'] );
      b.push( row['Median usual weekly earnings ($)'] );
    }
    
    makePlotly( year, a, b);
  }
  
  function makePlotly( year, a, b){

    var plotDiv = document.getElementById("plot").setAttribute("height", "1000px");

    var trace1 = {
      type: "bar",
      orientation: "h",
      x: b,
      y: year,
      name: "Median usual weekly earnings ($)",
    };

    var trace2 = {
      mode: "lines+markers",
      marker: {size:20},
      line: {width:5},
    //   orientation: "h",
      x: a,
      y: year,
      xaxis: "x2",
      name: "Unemployment rate (%)",
    };

    var traces = [trace1, trace2];

    var layout = {
      autosize: false,
      width: 1000,
      height: 600,
      legend: {
        xanchor: "center",
        orientation: "h",
      },
      title: {
        text: 'Is College Worth it',
        font: {
            // family: "Courier New, monospace",
            size: 24},
            xanchor: "right",
            yanchor: "bottom",
            x: 0.3,
            y: 600
      },
      xaxis: {
        title: 'USD',
        automargin: true,
        tickangle: -45,
        tickfont: {
          size: 14,
          color: '#000000',
        }},
      yaxis: {
        automargin: true,
        titlefont: {
          size: 16,
          color: '#000000'
        },
        tickfont: {
          size: 14,
          color: '#000000'
        }
      },
    //   barmode: 'stack',
    //   barmode: 'group',
    //   bargap: 0.15,
    //   bargroupgap: 0.1,
      xaxis2: {
        title: '%',
        automargin: true,
        titlefont: {
          size: 16,
          color: '#000000'
        },
        // ticklen: 5,
        // showticklabels: false,
        tickfont: {
          size: 14,
          color: '#000000'
        },
        overlaying: 'x',
        side: 'top'
      }
    }

    Plotly.newPlot('plot', traces,layout);
  };
makeplot();