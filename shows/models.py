from django.db import models
from movies.models import Movie
from theatres.models import Theatre
# Create your models here.


class Show (models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE, related_name="shows")
    show_date = models.DateField()
    show_time = models.TimeField()
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.movie.title} - {self.theatre.name} - {self.show_time}"