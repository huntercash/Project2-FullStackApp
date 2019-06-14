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
Institutions = Base.classes.institutions

# Create our session (link) from Python to the DB
session = Session(engine)
# Set up Home index Route

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

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
        f"/api/institutions<br/>"
        f"</center>"
    )

#################################################
# Institutions
#################################################

@app.route("/api/institutions")
def names():
    """Return a list of institutions names."""
    data = session.query(Institutions.UnitID,
                         Institutions.street,
                         Institutions.institution_name,
                         Institutions.state,
                         Institutions.zipcode,
                         Institutions.website,
                         Institutions.city,
                         Institutions.latitude,
                         Institutions.longitude)
    inst_list = []
    for unit_id, street, institution_name, state, zipcode, website, city, latitude, longitude in data:
        inst_dict = {}
        inst_dict['unit_id'] = unit_id
        inst_dict['institution_name'] = institution_name
        inst_dict['street'] = street
        inst_dict['state'] = state
        inst_dict['zipcode'] = zipcode
        inst_dict['website'] = website
        inst_dict['city'] = city
        inst_dict['latitude'] = latitude
        inst_dict['longitude'] = longitude

        inst_list.append(inst_dict)

    # Return a list of the column names (sample names)
    return jsonify(inst_list)



# Run Server
if __name__ == '__main__':
    app.run(debug=True)