function makeplot() {
    Plotly.d3.json("/api/age_student_debt.json", function(data){ processData(data) } );
  
  };
  
  function processData(allRows) {
  
    // console.log(allRows);
    var year = [], a = [], b = [], c = [], d = [], e = [];
  
    for (var i=0; i < allRows.length; i++) {
      row = allRows[i];
      year.push( row['year'] );
      a.push( row['under_30'] );
      b.push( row['from_30_to_39'] );
      c.push( row['from_40_to_49'] );
      d.push( row['from_50_to_59'] );
      e.push( row['Over_60'] );
    }
    
    makePlotly( year, a, b, c, d, e);
  }
  
  function makePlotly( year, a, b, c, d, e){

    var plotDiv = document.getElementById("plot");

    var trace1 = {
      type: "bar",
      x: year,
      y: a,
      name: "Under 30",
    };

    var trace2 = {
      type: "bar",
      x: year,
      y: b,
      name: "30-39",
    };

    var trace3 = {
      type: "bar",
      x: year,
      y: c,
      name: "40-49",
    };

    var trace4 = {
      type: "bar",
      x: year,
      y: d,
      name: "50-59",
    };

    var trace5 = {
      type: "bar",
      x: year,
      y: e,
      name: "60+",
    };

    var traces = [trace1, trace2, trace3, trace4, trace5];

    var layout = {
      title: 'Student Loans by Age',
      barmode: 'stack',
      xaxis: {tickfont: {
          size: 14,
          color: '#000000'
        }},
      yaxis: {
        title: 'USD (billions)',
        titlefont: {
          size: 16,
          color: '#000000'
        },
        tickfont: {
          size: 14,
          color: '#000000'
        }
      }
    }

    Plotly.newPlot('plot', traces, layout);
  };
makeplot();