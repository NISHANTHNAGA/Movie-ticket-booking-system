from django.db import models
from theatres.models import Theatre
# Create your models here.

class Screen(models.Model):
    theatre = models.ForeignKey (
        Theatre,
        on_delete=models.CASCADE,
        related_name="screens"
    )
    name = models.CharField(max_length=50)
    total_seats = models.IntegerField()
    def __str__(self):
        return f"{self.theatre.name} - {self.name}"
