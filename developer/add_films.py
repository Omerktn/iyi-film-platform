# Veritabanına film örnekleri ekle


from inspect import getsourcefile
import os.path as path, sys
current_dir = path.dirname(path.abspath(getsourcefile(lambda:0)))
sys.path.insert(0, current_dir[:current_dir.rfind(path.sep)])

from iyifilm import db
from iyifilm.models import Film
from random import randint

film_samples = [
    ["Snitch", "Movie", 0, 2013, "default.jpg", 4, 18],
    ["Eternal Sunshine of the Spotless Mind", "Movie", 0, 2004, "default.jpg", 10, 35],
    ["Friends", "Series", 10, 1994, "default.jpg", 5, 16],
    ["Pardon", "Movie", 0, 2005, "default.jpg", 7, 32],
]

for i, sample in enumerate(film_samples):
    film = Film(id=i, name=sample[0], filmtype=sample[1],
            season=sample[2], year=sample[3], image_file=sample[4],
            vote_count=sample[5], vote_sum=sample[6])
    db.session.add(film)

db.session.commit()