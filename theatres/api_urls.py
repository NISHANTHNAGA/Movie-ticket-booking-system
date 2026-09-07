from django.urls import path
from . import api

urlpatterns = [
    path("movies/<int:movie_id>/theatres/",api.theatre_list,name="theatre-list"),
]