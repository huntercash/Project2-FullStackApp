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

# Set up Home index Route

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

# API DATA GOES HERE

# @app.route("/api/institutions")
# def names():
#     """Return a list of institutions names."""

#     # Use Pandas to perform the sql query
#     inst = db.session.query(Institutions).statement
#     df = pd.read_sql_query(inst, db.session.bind)

#     # Return a list of the column names (sample names)
#     return jsonify(df.columns)




@app.route("/institutions/<int_id>")
def institutions(int_id):
    """Return `'UnitID', 'institution_name', 'street', 'city', 'state', 'zipcode', 'website', 'longitude', 'latitude'`."""
    instns = db.session.query(Institutions).statement
    df = pd.read_sql_query(instns, db.session.bind)

    # Filter the data based on the sample number and
    # only keep rows with values above 1
    institution_data = df, ['UnitID', 'institution_name', 'street', 'city', 'state', 'zipcode', 'website', 'longitude', 'latitude']
    # Format the data to send as json
    data = {
        'unit_id': institution_data.UnitID.values.tolist(),
        'institution_name': institution_data.institution_name.values.tolist(),
        'street': institution_data.street.values.tolist(), 
        # "otu_ids": sample_data.otu_id.values.tolist(),
        # "sample_values": sample_data[sample].values.tolist(),
        # "otu_labels": sample_data.otu_label.tolist(),
    }
    return jsonify(data)



# Run Server
if __name__ == '__main__':
    app.run(debug=True)