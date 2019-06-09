from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
import pandas as pd
import numpy as np
import os

# Init app
app = Flask(__name__)

# Set up Database Model
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db/sqlite"
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/.sqlite"
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0
# ^ This is to turn off caching on static files for development.. 
# db = SQLAlchemy(app)

# reflect an existing database into a new model
# Base = automap_base()
# reflect the tables
# Base.prepare(db.engine, reflect=True)

# Save references to each table
# Samples_Metadata = Base.classes.sample_metadata
# Samples = Base.classes.samples

# Set up Home index Route

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

# API DATA GOES HERE


# Run Server
if __name__ == '__main__':
    app.run(debug=True)