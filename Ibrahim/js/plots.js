var debt_2018_arr = []
var debt_2019_arr = []
var percentage_chg_arr = []
var state_arr = []

// get the data
d3.csv("clean_data/avg_sl_debt_by_state.csv", function(error, avg_sl_debt_by_state) {
    if (error) throw error;
        console.log(avg_sl_debt_by_state);

        avg_sl_debt_by_state.forEach(function(row) {
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

//   console.log(debt_2018_arr, debt_2019_arr, percentage_chg_arr, state_arr)

