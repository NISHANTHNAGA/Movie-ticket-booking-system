from django.db import models
from movies.models import Movie
# Create your models here.

class Theatre(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    address = models.TextField()
    movies = models.ManyToManyField(
        Movie,
        related_name="theatres"
    )

    def __str__(self):
        return self.name