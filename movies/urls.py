from django.urls import path

from . import views


urlpatterns = [

    # Customer movie routes

    path(
        "movies/",
        views.movie_list,
        name="movie-list"
    ),

    path(
        "movies/<int:movie_id>/",
        views.movie_detail,
        name="movie-detail"
    ),


    # Admin movie routes

    path(
        "admin/movies/",
        views.admin_movies,
        name="admin-movies"
    ),

    path(
        "admin/movies/<int:movie_id>/",
        views.admin_movie_detail,
        name="admin-movie-detail"
    ),

    path(
    "admin/dashboard/",
    views.admin_dashboard,
    name="admin-dashboard"
    ),

]