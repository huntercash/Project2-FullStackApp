function makeplot() {
    Plotly.d3.csv("Data/Student_Debt_vs_Median_Income_vs_Age_transform.csv", function(data){ processData(data) } );
  
  };
  
  function processData(allRows) {
  
    console.log(allRows);
    var year = [], a = [], b = [], c = [];
  
    for (var i=0; i < allRows.length; i++) {
      row = allRows[i];
      year.push( row['Subject'] );
      a.push( row['Average Student Borrowing'] );
      b.push( row['Male median pay'] );
      c.push( row['Female median pay'] );
    }
    
    makePlotly( year, a, b, c);
  }
  
  function makePlotly( year, a, b, c){

    var plotDiv = document.getElementById("plot");

    var trace1 = {
      type: "bar",
      x: year,
      y: a,
      name: "Average Student Loan",
    };

    var trace2 = {
      type: "bar",
      x: year,
      y: c,
      name: "Female median pay",
    };

    var trace3 = {
      type: "bar",
      x: year,
      y: b,
      name: "Male median pay",
    };

    var traces = [trace1, trace2, trace3];

    var layout = {
      title: '2017/2018 Average Student Loan vs Income vs Age',
      xaxis: {tickfont: {
          size: 14,
          color: '#000000'
        }},
      yaxis: {
        title: 'USD',
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

    Plotly.newPlot('plot', traces,layout);
  };
makeplot();