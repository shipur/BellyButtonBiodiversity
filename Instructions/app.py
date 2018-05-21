
# import necessary libraries
import pandas as pd

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

from flask import (
    Flask,
    render_template,
    jsonify)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
# engine = create_engine("sqlite:///db/bellyButtonBiodiversity.sqlite")

dbfile = os.path.join('db', 'belly_button_biodiversity.sqlite')
engine = create_engine(f"sqlite:///"{dbfile}")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save references to the table
Samples_Metadata = Base.classes.biodiversity
Otu = Base.classes.otu
Samples = Base.classes.samples

# Create our session (link) from Python to the DB
session = Session(engine)



#################################################
# Database Setup
#################################################
# from flask_sqlalchemy import SQLAlchemy
# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/bigfoot.sqlite"

# db = SQLAlchemy(app)

# class Biodiversity(db.Model):
#     __tablename__ = 'biodiversity'

#     id = db.Column(db.Integer, primary_key=True)
#     number = db.Column(db.Integer)
#     title = db.Column(db.String)
#     classification = db.Column(db.String)
#     timestamp = db.Column(db.String)
#     latitude = db.Column(db.Float)
#     longitude = db.Column(db.Float)

#     def __repr__(self):
#         return '<Emoji %r>' % (self.name)





# Create database classes
# @app.before_first_request
# def setup():
#     # Recreate database each time for demo
#     # db.drop_all()
#     db.create_all()

#################################################
# Flask Routes
#################################################

# create route that renders index.html template
@app.route("/")
def home():
    """Return the dashboard homepage."""
    return render_template("index.html")

#Return a list of sample names:
@app.route('/names')
def names():
    return engine.execute('SELECT * FROM Samples_Metadata LIMIT 10').fetchall()
    # """List of sample names.

    # Returns a list of sample names in the format
    # [
    #     "BB_940",
    #     "BB_941",
    #     "BB_943",
    #     "BB_944",
    #     "BB_945",
    #     "BB_946",
    #     "BB_947",
    #     ...
    # ]

    # """

# ```python
# @app.route('/otu')
#     """List of OTU descriptions.

#     Returns a list of OTU descriptions in the following format

#     [
#         "Archaea;Euryarchaeota;Halobacteria;Halobacteriales;Halobacteriaceae;Halococcus",
#         "Archaea;Euryarchaeota;Halobacteria;Halobacteriales;Halobacteriaceae;Halococcus",
#         "Bacteria",
#         "Bacteria",
#         "Bacteria",
#         ...
#     ]
#     """
# ```
# ```python
@app.route('/otu')
def 
@app.route('/metadata/<sample>')
def get_sample_metadata(sample):
    sel = [Samples_Metadata.AGE, Samples_Metadata.BBTYPE, Samples_Metadata.ETHNICITY,
            Samples_Metadata.GENDER, Samples_Metadata.LOCATION, Samples_Metadata.SAMPLEID]
    
    results = session.query(*sel).all()

#     """MetaData for a given sample.

#     Args: Sample in the format: `BB_940`

#     Returns a json dictionary of sample metadata in the format

#     {
#         AGE: 24,
#         BBTYPE: "I",
#         ETHNICITY: "Caucasian",
#         GENDER: "F",
#         LOCATION: "Beaufort/NC",
#         SAMPLEID: 940
#     }
#     """
# ```
# ```python
# @app.route('/wfreq/<sample>')
#     """Weekly Washing Frequency as a number.

#     Args: Sample in the format: `BB_940`

#     Returns an integer value for the weekly washing frequency `WFREQ`
#     """
# ```
# ```python
# @app.route('/samples/<sample>')
#     """OTU IDs and Sample Values for a given sample.

#     Sort your Pandas DataFrame (OTU ID and Sample Value)
#     in Descending Order by Sample Value

#     Return a list of dictionaries containing sorted lists  for `otu_ids`
#     and `sample_values`

#     [
#         {
#             otu_ids: [
#                 1166,
#                 2858,
#                 481,
#                 ...
#             ],
#             sample_values: [
#                 163,
#                 126,
#                 113,
#                 ...
#             ]
#         }
#     ]
#     """
# ```
