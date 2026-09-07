from django.urls import path

from . import views


urlpatterns = [

    # Customer

    path(
        "movies/<int:movie_id>/theatres/",
        views.theatre_list,
        name="theatre-list"
    ),


    # Admin

    path(
        "admin/theatres/",
        views.admin_theatres,
        name="admin-theatres"
    ),

    path(
        "admin/theatres/<int:theatre_id>/",
        views.admin_theatre_detail,
        name="admin-theatre-detail"
    ),
    
    path(
    "admin/theatres/<int:theatre_id>/movies/",
    views.admin_theatre_movies,
    name="admin-theatre-movies" 
    ),

    path(
    "admin/movies/<int:movie_id>/theatres/",
    views.admin_theatres_by_movie,
    name="admin-theatres-by-movie"
    ),

    path(
    "admin/movies/<int:movie_id>/theatres/",
    views.admin_movie_theatres,
    name="admin-movie-theatres"
),

]