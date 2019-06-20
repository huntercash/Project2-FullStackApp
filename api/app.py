import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'static','db','studentloans.sqlite')
engine = create_engine('sqlite:///' + os.path.join(basedir, 'static','db','studentloans.sqlite')+ "?check_same_thread=False")

#################################################
# Database Setup
#################################################


# Set up Database Model
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# ^ This is to turn off caching on static files for development.. 
db = SQLAlchemy(app)
db.init_app(app)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Institutions = Base.classes.inst_price
Student_Debt_Income = Base.classes.Student_Debt_Income
college_worth_it = Base.classes.college_worth_it
# Create our session (link) from Python to the DB
session = Session(engine)
# Set up Home index Route

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/tabledata")
def tabledata():
    """Returns the JS Table Template"""
    return render_template("tabledata.html")

# API DATA GOES HERE
#################################################
# Flask Routes
#################################################


@app.route("/api")
def welcome():
    """List all available api routes."""
    return (
        f"<center>"
        f"<b>Available Routes:</b><br/>"
        f'<a href="/api/institutions.json">/api/institutions.json</a><br/>'
        f'<a href="/api/Student_Debt_Income.json">/api/Student_Debt_Income.json</a><br/>'
        f'<a href="/api/college_worth_it.json">/api/college_worth_it.json</a><br/>'
        f"</center>"
    )

#################################################
# Institutions
#################################################

@app.route("/api/institutions.json")
def names():
    """Return a list of institutions names."""
    data = session.query(Institutions.street,
                         Institutions.institution_name,
                         Institutions.state,
                         Institutions.zipcode,
                         Institutions.website,
                         Institutions.city,
                         Institutions.tuition)
    inst_list = []
    for street, institution_name, state, zipcode, website, city, tuition in data:
        inst_dict = {}
        inst_dict['street'] = street
        inst_dict['institution_name'] = institution_name
        inst_dict['state'] = state
        inst_dict['zipcode'] = zipcode
        inst_dict['website'] = website
        inst_dict['city'] = city
        inst_dict['tuition'] = tuition


        inst_list.append(inst_dict)

    # Return a list of the column names (sample names)
    return jsonify(inst_list)

#################################################
# Chris Student_Debt_Income
#################################################

@app.route("/api/Student_Debt_Income.json")
def studentdebtincome():
    """Return a list of institutions names."""
    data = session.query(Student_Debt_Income.subject,
                         Student_Debt_Income.student_borrowing,
                         Student_Debt_Income.male_pay,
                         Student_Debt_Income.female_pay)
    Student_Debt_Income_list = []
    for subject, student_borrowing, male_pay, female_pay in data:
        Student_Debt_Income_dict = {}
        Student_Debt_Income_dict['subject'] = subject
        Student_Debt_Income_dict['student_borrowing'] = student_borrowing
        Student_Debt_Income_dict['male_pay'] = male_pay
        Student_Debt_Income_dict['female_pay'] = female_pay


        Student_Debt_Income_list.append(Student_Debt_Income_dict)

    # Return a list of the column names (sample names)
    return jsonify(Student_Debt_Income_list)

#################################################
# Chris college_worth_it
#################################################

@app.route("/api/college_worth_it.json")
def collegeworthit():
    """Return a list of institutions names."""
    data = session.query(college_worth_it.educational_attainment,
                         college_worth_it.unemployment_rate,
                         college_worth_it.median_pay)
    college_worth_it_list = []
    for educational_attainment, unemployment_rate, median_pay in data:
        college_worth_it_dict = {}
        college_worth_it_dict['educational_attainment'] = educational_attainment
        college_worth_it_dict['unemployment_rate'] = unemployment_rate
        college_worth_it_dict['median_pay'] = median_pay


        college_worth_it_list.append(college_worth_it_dict)

    # Return a list of the column names (sample names)
    return jsonify(college_worth_it_list)

# Run Server
if __name__ == '__main__':
    app.run(debug=True)