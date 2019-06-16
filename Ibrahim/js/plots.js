var debt_2018_arr = []
var debt_2019_arr = []
var percentage_chg_arr = []
var state_arr = []

// get the data
d3.csv("clean_data/avg_sl_debt_by_state.csv", function(error, avg_sl_debt_by_state) {
    if (error) throw error;
        // console.log(avg_sl_debt_by_state);

        avg_sl_debt_by_state.forEach(function(row) {
            row['2018'] = +row['2018'];
            row['2019'] = +row['2019'];
            row['% Change'] = +row['% Change'];
            row['State'] = +row['State']


            debt_2018 = row['2018']
            debt_2019 = row['2019']
            percentage_chg = row['% Change']
            state = row['State']

            debt_2018_arr.push(debt_2018)
            debt_2019_arr.push(debt_2019)
            percentage_chg_arr.push(percentage_chg)
            state_arr.push(state)
          });

        //draw chart
})

console.log(debt_2018_arr)



var data = [{
  values: [19, 26, 55],
  labels: ['Residential', 'Non-Residential', 'Utility'],
  type: 'pie'
}];

var layout = {
  height: 400,
  width: 500
};

Plotly.newPlot('plot', data, layout);





var data = [
    {
      x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
      y: [1, 3, 6],
      type: 'scatter'
    }
  ];
  
  Plotly.newPlot('plot1', data, {responsive: true});



  var trace1 = {
    type: 'bar',
    x: [1, 2, 3, 4],
    y: [5, 10, 2, 8],
    marker: {
        color: '#C8A2C8',
        line: {
            width: 2.5
        }
    }
};

var data = [ trace1 ];

var layout = {
  title: "Responsive to window's size!",
  font: {size: 18}
};

Plotly.newPlot('plot2', data, layout, {responsive: true});


