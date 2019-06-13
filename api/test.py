# Ignore SQLITE warnings related to Decimal numbers in the Chinook database
import warnings
warnings.filterwarnings('ignore')
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import func
engine = create_engine("sqlite:///studentloans.sqlite", echo=False)
 # Reflect Database into ORM classes
Base = automap_base()
Base.prepare(engine, reflect=True)
print(Base.classes.keys())
Institutions = Base.classes.institutions
Session.query(Institutions.longitude)
