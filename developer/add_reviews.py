from inspect import getsourcefile
import os.path as path, sys
current_dir = path.dirname(path.abspath(getsourcefile(lambda:0)))
sys.path.insert(0, current_dir[:current_dir.rfind(path.sep)])

from iyifilm import db
from iyifilm.models import Review

review_samples = [
    [0, 0, 0, "Patlama sahneleri çok iyiydi.", 4],
    [1, 0, 1, "Jim Carrey hastasıyım.", 5],
]

for idx, sample in enumerate(review_samples):
    review = Review(id=idx, user_id=sample[1], film_id=sample[1],
    text=sample[3], rate=sample[4])
    db.session.add(review)

db.session.commit()