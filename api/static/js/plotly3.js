function makeplot3() {
    Plotly.d3.json("/api/college_worth_it.json", function(data){ processData(data) } );
  
  };
  
  function processData(allRows) {
  
    console.log(allRows);
    var educational_attainment = [], unemployment_rate = [], median_pay = [];
  
    for (var i=0; i < allRows.length; i++) {
      row = allRows[i];
      educational_attainment.push( row['educational_attainment'] );
      unemployment_rate.push( row['unemployment_rate'] );
      median_pay.push( row['median_pay'] );
    }
    // console.log(educational_attainment);
    makePlotly( educational_attainment, unemployment_rate, median_pay);
  }
  
  function makePlotly(educational_attainment, unemployment_rate, median_pay){
  
    var plotDiv = document.getElementById("plot-3");
  
    var trace1 = {
      type: "bar",
      orientation: "h",
      x: median_pay,
      y: educational_attainment,
      name: "Median usual weekly earnings ($)",
    };
  
    var trace2 = {
      mode: "lines+markers",
      marker: {size:20},
      line: {width:5},
    //   orientation: "h",
      x: unemployment_rate,
      y: educational_attainment,
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
  
    Plotly.newPlot(plotDiv, traces,layout);
  };
  makeplot3();