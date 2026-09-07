from django.db import models

# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length=150)
    genre = (models.CharField(max_length=150))
    language = (models.CharField(max_length=50))
    duration = models.PositiveIntegerField(help_text="Duration in minutes")
    release_date = models.DateField()
    description = models.TextField(blank=True)
    poster = models.ImageField(upload_to="movie-posters/", blank=True, null = True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title