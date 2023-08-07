#!/usr/bin/python3
"""
Starts a Flask web application.
Listens on 0.0.0.0  on port 5000.
Routes:
  *  /hbnb: Display the HTML page for hbnb home page.
"""
from flask import Flask
from flask import render_template, url_for
from models import storage
import uuid


app = Flask(__name__)


@app.route("/4-hbnb", strict_slashes=False)
def hbnb():
    """Display the HTML page for hbnb home page."""
    """Cache_id"""
    cache_id = str(uuid.uuid4())
    amenities = storage.all("Amenity")
    places = storage.all("Place")
    states = storage.all("State")
    return render_template("4-hbnb.html",
                           amenities=amenities,
                           places=places,
                           states=states,
                           cache_id = cache_id)


@app.teardown_appcontext
def teardown(excpt=None):
    """Remove the current SQLAlchemy Session."""
    storage.close()


if __name__ == "__main__":
    app.run(host="0.0.0.0")
