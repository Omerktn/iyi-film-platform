# Veritabanına film örnekleri ekle


from inspect import getsourcefile
import os.path as path, sys
current_dir = path.dirname(path.abspath(getsourcefile(lambda:0)))
sys.path.insert(0, current_dir[:current_dir.rfind(path.sep)])

from iyifilm import db
from iyifilm.models import Film
from random import randint

film_samples = [
    ["Snitch", "Movie", 0, 2013, "snitch.jpg", 4, 18],
    ["Eternal Sunshine of the Spotless Mind", "Movie", 0, 2004, "eternal_sunshine.jpg", 10, 35],
    ["Pardon", "Movie", 0, 2005, "pardon.jpg", 7, 32],
    ["12 Angry Man", "Movie", 0, 1957, "12_angry_man.jpg", 11, 38],
    ["About Elly", "Movie", 0, 2009, "about_elly.jpg", 3, 11],
    ["A.R.O.G", "Movie", 0, 2008, "arog.jpg", 17, 60],
    ["Arrival", "Movie", 0, 2016, "arrival.jpg", 12, 39],
    ["Big Fish", "Movie", 0, 2003, "big_fish.jpg", 3, 6],
    ["Bir Zamanlar Anadoluda", "Movie", 0, 2011, "bir_zamanlar_anadoluda.jpg", 15, 67],
    ["Birds", "Movie", 0, 1963, "birds.jpg", 9, 31],
    ["Black Sea", "Movie", 0, 2014, "black_sea.jpg", 6, 14],
    ["Chappie", "Movie", 0, 2015, "chappie.jpg", 17, 56],
    ["Citizen Kane", "Movie", 0, 1941, "citizen_kane.jpg", 21, 75],
    ["Coco", "Movie", 0, 2017, "coco.jpg", 23, 80],
    ["Coherence", "Movie", 0, 2013, "coherence.jpg", 8, 29],
    ["Downsizing", "Movie", 0, 2017, "downsizing.jpg", 7, 17],
    ["Eşkıya","Movie",  0, 1996, "eskiya.jpg", 30, 138],
    ["Genius", "Movie", 0, 2016, "genius.jpg", 13, 49],
    ["Gravity", "Movie", 0, 2013, "gravity.jpg", 9, 35],
    ["His Girl Friday", "Movie", 0, 1940, "his_girl_friday.jpg", 2, 7],
    ["Hokkabaz", "Movie", 0, 2006, "hokkabaz.jpg", 19, 82],
    ["Hugo", "Movie", 0, 2011, "hugo.jpg", 17, 75],
    ["Identity", "Movie", 0, 2003, "identity.jpg", 11, 38],
    ["Inception", "Movie", 0, 2010, "inception.jpg", 27, 120],
    ["Inferno", "Movie", 0, 2016, "inferno.jpg", 22, 94],
    ["Interstellar", "Movie", 0, 2014, "interstellar.jpg", 17, 64],
    ["Kara Bela", "Movie", 0, 2015, "kara_bela.jpg", 19, 80],
    ["Kelebekler", "Movie", 0, 2018, "kelebekler.jpg", 10, 45],
    ["Life", "Movie", 0, 2017, "life.jpg", 8, 34],
    ["Lion", "Movie", 0, 2016, "lion.jpg", 15, 60],
    ["Moonrise Kingdom", "Movie", 0, 2012, "moonrise_kingdom.jpg", 12, 48],
    ["Neşeli Hayat", "Movie", 0, 2009, "neseli_hayat.jpg", 14, 50],
    ["Ölümlü Dünya", "Movie", 0, 2018, "olumlu_dunya.jpg", 20, 86],
    ["Paddington", "Movie", 0, 2014, "paddington.jpg", 6, 20],
    ["Penelope", "Movie", 0, 2006, "penelope.jpg", 3, 9],
    ["Pride and Prejudice", "Movie", 0, 2005, "pride_and_prejudice.jpg", 19, 80],
    ["Rango", "Movie", 0, 2011, "rango.jpg", 10, 41],
    ["Serpico", "Movie",0, 1973, "serpico.jpg", 13, 40],
    ["Sev Kardeşim", "Movie", 0, 1972, "sev_kardesim.jpg", 14, 42],
    ["Shattered Glass", "Movie", 0, 2003, "shattered_glass.jpg", 2, 6],
    ["Spirited Away", "Movie", 0, 2001, "spirited_away.jpg", 23, 100],
    ["Suburbicon", "Movie", 0, 2017, "suburbicon.jpg", 7, 29],
    ["Süt Kardeşler", "Movie", 0, 1976, "sut_kardesler.jpg", 17, 56],
    ["The Forbidden Kingdom", "Movie", 0, 2008, "the_forbidden_kingdom.jpg", 5, 15],
    ["The Good Dinosaur", "Movie", 0, 2015, "the_good_dinosaur.jpg", 15, 65],
    ["The Hedgehog", "Movie", 0, 2009, "the_hedgehog.jpg", 4, 15],
    ["The Help", "Movie", 0, 2011, "the_help.jpg", 18, 69],
    ["Throne oF Blood", "Movie", 0, 1957, "throne_of_blood.jpg", 5, 20],
    ["Tosun Paşa", "Movie", 0, 1976, "tosun_pasa.jpg", 24, 95],
    ["Woman in Gold", "Movie", 0, 2015, "woman_in_gold.jpg", 7, 20],
    ["Yol Ayrımı", "Movie", 0, 2017, "yol_ayrimi.jpg", 13, 46],
    ["7 Numara", "Series", 3, 2000, "7_numara.jpg", 13, 50],
    ["Avrupa Yakası", "Series", 6, 2004, "avrupa_yakasi.jpg", 22, 100],
    ["Bir Zamanlar Çukurova", "Series", 3, 2018, "bir_zamanlar_cukurova.jpg", 7, 15],
    ["Breaking Bad","Series", 5, 2008, "breaking_bad.jpg", 11, 45],
    ["Chernobyl","Series", 1, 2019, "chernobyl.jpg", 17, 72],
    ["Doctor Who", "Series", 12, 2005, "doctor_who.jpg", 13, 34],
    ["Ezel", "Series", 2, 2009, "ezel.jpg", 25, 112],
    ["Friends","Series", 10, 1994, "friends.jpg", 14, 50],
    ["Fringe", "Series", 5, 2008, "fringe.jpg", 9, 36],
    ["Geniş Aile", "Series", 3, 2009, "genis_aile.jpg", 8, 27],
    ["İçerde", "Series", 1, 2016, "icerde.jpg", 17, 70],
    ["Leyla ile Mecnun", "Series", 2, 2011, "leyla_ile_mecnun.jpg", 16, 72],
    ["Lost", "Series", 6, 2004, "lost.jpg", 13, 42],
    ["Masum", "Series",1, 2017, "masum.jpg", 11, 50],
    ["Mucize Doktor", "Series", 2, 2019, "mucize_doktor.jpg", 10, 34],
    ["Person of Interest", "Series", 4, 2011, "person_of_interest.jpg", 5, 18],
    ["Sherlock", "Series",4 , 2010, "sherlock.jpg", 6, 23],
    ["The ABC Murders", "Series", 1, 2018, "the_abc_murders.jpg", 4, 14],
    ["The Mentalist", "Series", 7, 2008, "the_mentalist.jpg", 2, 5],
    ["The Simspsons", "Series", 32, 1989, "the_simpsons", 5, 15]
]

for i, sample in enumerate(film_samples):
    film = Film(id=i, name=sample[0], filmtype=sample[1],
            season=sample[2], year=sample[3], image_file=sample[4],
            vote_count=sample[5], vote_sum=sample[6])
    db.session.add(film)

db.session.commit()