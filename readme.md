# Student Loan Analysis App
## Link to project: https://althisforabachelors.herokuapp.com/
### Project Description/Outline
Our project is to create an online application for people to perform their own discovery and analysis of student loans, and the potential benefits or dangers of them. 
### Phase 1: Submit Proposal
### Phase 2: Gather Data
### Phase 3: Decide on Database Type and API
- Chose Sqlite3 for simplicity and prevention of cost on on heroku
- Data: Cleaned in python using pandas, exported as csvs with clean headers, and auto_increment unique indexes
- Database: Imported into SQLite3 using SQLite Studio.
- Keys, data types, etc, assigned using gui.
### Phase 4: Web App
#### Pages:
- Home: Debt Clock (estimate), analysis, plotly graphs, plotly table, loan analysis
- All Schools: Table with live reload as you type search feature using D3
- Compare Schools(ROI): Table that displays the Return on Investment of each university using D3
- School Map: Leaflet.js + Mapbox, displays average and total student loans taken per state, and compares the to each other. 
- API: API endpoints. 
#### CSS:
- Framework: Bootstrap 4
#### Javascript:
- Libraries: Plotly.js, D3.js(V5.5), clock.js(unique), Leaflet.js
#### Database:
- SQLite3
#### Python:
- built in Python 3.7.0 (requirements.txt)
- Main dependencies: Flask, Pandas, numpy
#### Hosting: 
- Free Tier Dyno on Heroku

### Phase 5: Upload master to Heroku
### Phase 6: Complete 10 minute presentation to faculty and staff

#### To Run Locally:
- run api/app.py or flask run in api directory

### Data Sources:
- https://catalog.data.gov/dataset/national-student-loan-data-system
- http://tuitiontracker.org/
- https://www.newyorkfed.org/
- https://www.bls.gov/
- https://www.payscale.com/
- https://www.experian.com/blogs/ask-experian/state-of-student-loan-debt/

### Respository:
- https://github.com/huntercash/Project2-FullStackApp

### Team Members

- [Ibrahim Abdulrahmon](https://github.com/abdulib "GitHub")
- [Chris Hart](https://github.com/zebuite "Github")
- [Ugochi Akaluso](https://github.com/ugochi "GitHub")
- [Hunter Cash](https://github.com/huntercash "GitHub")
