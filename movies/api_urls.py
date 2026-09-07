from django.urls import path

from . import api


urlpatterns = [

    path(
        "movies/",
        api.movie_list,
        name="movie-list"
    ),

    path(
        "movies/<int:movie_id>/",
        api.movie_detail,
        name="movie-detail"
    ),

]