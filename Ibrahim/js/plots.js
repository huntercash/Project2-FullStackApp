

// get the data
d3.csv("clean_data/avg_sl_debt_by_state.csv", function(error, avg_sl_debt_by_state) {
  if (error) throw error;
  // console.log(avg_sl_debt_by_state);

  var debt_2018_arr = []
  var debt_2019_arr = []
  var percentage_chg_arr = []
  var state_arr = []

  avg_sl_debt_by_state.forEach(function(row) {
      row['2018'] = +row['2018'];
      row['2019'] = +row['2019'];
      row['% Change'] = +row['% Change'];

      debt_2018_arr.push(debt_2018 = row['2018'])
      debt_2019_arr.push(debt_2019 = row['2019'])
      percentage_chg_arr.push(percentage_chg = row['% Change'])
      state_arr.push(state = row['State'])
    });

  //draw chart
  var trace1 = {
    x: state_arr,
    y: debt_2018_arr,
    name: "2018 Average",
    type: "bar"
  };
  
  var trace2 = {
    x: state_arr,
    y: debt_2019_arr,
    name: "2019 Average",
    type: "bar"
  };
  
  var data = [trace1, trace2]
  
  var layout = {
    title: "Average Student Loan by State",
    barmode: "group",
    xaxis: {
      automargin: true
    }
  };
  
  Plotly.newPlot("plot1", data, layout, {responsive: true});

});



//plot 2

// get the data
d3.csv("clean_data/us_debt_bal_by_type.csv", function(error, us_debt_bal_by_type) {
  if (error) throw error;
      console.log(us_debt_bal_by_type);

  var loanType = []
  var loanSize = []

  us_debt_bal_by_type.forEach(function(row){
    row['Amount (in trillions)'] = +row['Amount (in trillions)']
    loanSize.push(row['Amount (in trillions)'])
    loanType.push(row['Loan Type'])
  })
  console.log(loanSize)
  var data = [{
    values: loanSize,
    labels: loanType,
    type: "pie",
    marker: {

    }
  }]

  var layout = {
    title: "US Loan Size by Type (in trillions)",
    heigth: 900,
    width: 1000
  }

  Plotly.newPlot('plot2', data, layout, {responsive: true});

});





