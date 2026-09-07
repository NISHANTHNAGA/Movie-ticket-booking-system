from django.urls import path
from .import api

urlpatterns = [
    path("movies/<int:movie_id>/theatres/<int:theatre_id>/shows/",
          api.show_list,
          name = "show_list"),


    path("shows/<int:show_id>/",
         api.show_detail,
         name="show-detail"),
]