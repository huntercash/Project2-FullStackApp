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
            row['State'] = +row['State'];


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

// console.log(debt_2018_arr)


var trace1 = {
  x: state_arr,
  y: debt_2018_arr,
  name: "Student Loan Debt 2018",
  type: "bar"
}

var trace2 = {
  x: state_arr,
  y: debt_2019_arr,
  name: "Student Loan Debt 2019",
  type: "bar"
}

var data = [trace1, trace2]

var layout = {
  title: "Average Student Loan by State",
  barmode: "group",
  xaxis: {
    automargin: true
  }
};


Plotly.newPlot("plot", data, layout, {responsive: true});



