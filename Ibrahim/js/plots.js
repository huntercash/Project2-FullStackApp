

// // get the data
// d3.csv("clean_data/avg_sl_debt_by_state.csv", function(error, avg_sl_debt_by_state) {
//   if (error) throw error;
//   // console.log(avg_sl_debt_by_state);

//   var debt_2018_arr = []
//   var debt_2019_arr = []
//   var percentage_chg_arr = []
//   var state_arr = []

//   avg_sl_debt_by_state.forEach(function(row) {
//       row['2018'] = +row['2018'];
//       row['2019'] = +row['2019'];
//       row['% Change'] = +row['% Change'];

//       debt_2018_arr.push(debt_2018 = row['2018'])
//       debt_2019_arr.push(debt_2019 = row['2019'])
//       percentage_chg_arr.push(percentage_chg = row['% Change'])
//       state_arr.push(state = row['State'])
//     });

//   //draw chart
//   var trace1 = {
//     x: state_arr,
//     y: debt_2018_arr,
//     name: "2018 Average",
//     type: "bar"
//   };
  
//   var trace2 = {
//     x: state_arr,
//     y: debt_2019_arr,
//     name: "2019 Average",
//     type: "bar"
//   };
  
//   var data = [trace1, trace2]
  
//   var layout = {
//     title: "Average Student Loan by State",
//     barmode: "group",
//     xaxis: {
//       automargin: true
//     }
//   };
  
//   Plotly.newPlot("plot1", data, layout, {responsive: true});

// });



//plot 2

// get the data
d3.csv("clean_data/us_debt_bal_by_type.csv", function(error, us_debt_bal_by_type) {
  if (error) throw error;
      // console.log(us_debt_bal_by_type);

  var loanType = []
  var loanSize = []

  us_debt_bal_by_type.forEach(function(row){
    row['Amount (in trillions)'] = +row['Amount (in trillions)']
    loanSize.push(row['Amount (in trillions)'])
    loanType.push(row['Loan Type'])
  })

  var data = [{
    values: loanSize,
    labels: loanType,
    type: "pie",
    marker: {

    }
  }]

  var layout = {
    title: "US Loan Size by Type (in trillions)",
    heigth: 400,
    width: 600
  }

  Plotly.newPlot('plot2', data, layout, {responsive: true});

});



//plot 3

// get the data
d3.csv("clean_data/stu_loan_debt_snapshot.csv", function(error, stu_loan_debt_snapshot) {
  if (error) throw error;
      // console.log(stu_loan_debt_snapshot);
      
  var details = []
  var amount = []

  stu_loan_debt_snapshot.forEach(function(row) {
    // console.log(row['Amount'])
    details.push(row['Details'])
    amount.push(row['Amount'])
  })

  var values = [details, amount]
  
  var data = [{
    type: 'table',
    header: {
      values: [["<b>DETAILS</b>"], ["<b>AMOUNT</b>"]],
      align: ["left", "center"],
      line: {width: 1, color: '#506784'},
      fill: {color: '#119DFF'},
      font: {family: "Arial", size: 12, color: "white"}
    },
    cells: {
      values: values,
      align: ["left", "center"],
      line: {color: "#506784", width: 1},
     fill: {color: ['#25FEFD', 'white']},
      font: {family: "Arial", size: 11, color: ["#506784"]}
    }
  }]
  
  Plotly.plot('table', data, {responsive: true});
});


//plot 4

// get the data
d3.csv("clean_data/yearly_portfolio_summary.csv", function(error, yearly_portfolio_summary) {
  if (error) throw error;
      // console.log(yearly_portfolio_summary);
      var years = [], directLoans = [], perkinsLoans = [], ffels  = [], totalLoans = []
      var dlRecipients = [], perkinsRecipients = [], ffelRecipients = [], totalRecipients = []

      yearly_portfolio_summary.forEach(function(row){

        row['Direct Loans'] = +row['Direct Loans']
        row['FFEL'] = +row['FFEL']
        row['Perkins'] = +row['Perkins']
        row[' Total loans'] = +row['Total loans']
        row['DL Recipients'] = +row['DL Recipients']
        row['FFEl Recipients'] = +row['FFEl Recipients']
        row['Perkins Recipients'] = +row['Perkins Recipients']
        row['Total Recipients'] = +row['Total Recipients']
        

        years.push(year = row['Year'])
        directLoans.push(dl = row['Direct Loans'])
        ffels.push(ffel = row['FFEL'])
        perkinsLoans.push(perkins = row['Perkins'])
        totalLoans.push(totalLoan = row[' Total loans'])
        dlRecipients.push(row['DL Recipients'])
        perkinsRecipients.push(row['Perkins Recipients'])
        ffelRecipients.push(row['FFEl Recipients'])
        totalRecipients.push(row['Total Recipients'])
      })
      // console.log(perkinsRecipients)

  var trace1 = {
    x: years,
    y: directLoans,
    type: 'line',
    name: 'Direct Loans'
  };

  var trace2 = {
    x: years,
    y: perkinsLoans,
    type: 'line',
    name: 'Perkins'
  };
  var trace3 = {
    x: years,
    y: ffels,
    type: 'line',
    name:'FFEL'
  };
  var trace4 = {
    x: years,
    y: totalLoans,
    type: 'line',
    name: 'Total Loans'
  };

  var data = [trace1, trace2, trace3, trace4];

  var layout = {
    title: 'Loans Outsanding by Loan Types',
    xaxis: {
      title: 'Year'
    },
    yaxis: {
      title: 'Amount (in billions)'
    }
  };

  Plotly.newPlot('plot3', data, layout, {responsive: true});


  var trace1 = {
    x: years,
    y: dlRecipients,
    type: 'line',
    name: 'Direct Loan'
  };

  var trace2 = {
    x: years,
    y: perkinsRecipients,
    type: 'line',
    name: 'Perkins'
  };
  var trace3 = {
    x: years,
    y: ffelRecipients,
    type: 'line',
    name: 'FFEL'
  };
  var trace4 = {
    x: years,
    y: totalRecipients,
    type: 'line',
    name: 'Total'
  };

  var data = [trace1, trace2, trace3, trace4];

  var layout = {
    title: 'Number of Recipeints by Loan Types',
    xaxis: {
      title: 'Year'
    },
    yaxis: {
      title: 'Amount (in millions)'
    }
  };

  Plotly.newPlot('plot4', data, layout, {responsive: true});
  
});

d3.csv("clean_data/dl_status.csv", function(error, dl_status) {
  if (error) throw error;

  // console.log(dl_status[0])

  var years = [], inSchs = [], graces = [], forbears = [], defers = [], cummuls = [], repays = [], others = []

  dl_status.forEach(function(row){

    row['In-School'] = +row['In-School']
    row['Grace'] = +row['Grace']
    row['Repayment'] = +row['Repayment']
    row['Deferment'] = +row['Deferment']
    row['Forbearance'] = +row['Forbearance']
    row['Cumulative in Default'] = +row['Cumulative in Default']
    row['Other'] = +row['Other']

    years.push(row['Year'])
    inSchs.push(row['In-School'])
    graces.push(row['Grace'])
    repays.push(row['Repayment'])
    forbears.push(row['Forbearance'])
    defers.push(row['Deferment'])
    cummuls.push(row['Cumulative in Default'])
    others.push(row['Other'])


  })

  // console.log(repays)

  var trace1 = {
    x: years,
    y: inSchs,
    mode: 'lines',
    name: 'In-School'
  };
  
  var trace2 = {
    x: years,
    y: graces,
    mode: 'lines',
    name: 'Grace'
  };
  
  var trace3 = {
    x: years,
    y: repays,
    mode: 'lines',
    name: 'Repayment'
  };

  var trace4 = {
    x: years,
    y: forbears,
    mode: 'lines',
    name: 'Forbearance'
  };

  var trace5 = {
    x: years,
    y: defers,
    mode: 'lines',
    name: 'Deferment'
  };

  var trace6 = {
    x: years,
    y: others,
    mode: 'lines',
    name: 'Others'
  };

  var trace7 = {
    x: years,
    y: cummuls,
    mode: 'lines',
    name: 'Cummulative in Default'
  };
  
  var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7];
  
  var layout = {
    title: 'Direct Loan Portfolio by Loan Status ',
    xaxis: {
      title: 'Year'
    },
    yaxis: {
      title: 'Amount (in billions)'
    }
  };
  
  Plotly.newPlot('plot5', data, layout, {responsive: true});

});


// Plot 6

d3.csv("clean_data/serious_deliquency.csv", function(error, serious_deliquency) {
  if (error) throw error;

  // console.log(serious_deliquency)

  var years = [], gen18 = [], gen30 = [], gen40 = [], gen50 = [], all = []

  serious_deliquency.forEach(function(row){
    // console.log(row)

    gen18.push(row["18-29"] = +row["18-29"])
    gen30.push(row["30-39"] = +row["30-39"])
    gen40.push(row["40-49"] = +row["40-49"])
    gen50.push(row["50+"] = +row["50+"])
    // all.push(row["all"]  = +row["all"])
    years.push(row['Year'])
    
  })

  console.log(gen18)

  var trace1 = {
    x: years,
    y: gen18,
    mode: 'lines',
    name: '18-29'
  };
  
  var trace2 = {
    x: years,
    y: gen30,
    mode: 'lines',
    name: '30-39'
  };
  
  var trace3 = {
    x: years,
    y: gen40,
    mode: 'lines',
    name: '40-49'
  };

  var trace4 = {
    x: years,
    y: gen50,
    mode: 'lines',
    name: '50+'
  };

  var trace5 = {
    x: years,
    y: all,
    mode: 'lines',
    name: 'Total'
  };

  
  var data = [trace1, trace2, trace3, trace4, trace5];
  
  var layout = {
    title: 'Loans By Age Group',
    xaxis: {
      title: 'Year'
    },
    yaxis: {
      title: 'Amount (in billions)'
    }
  };
  
  Plotly.newPlot('plot6', data, layout);




});
