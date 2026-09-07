from django.urls import path

from . import views


urlpatterns = [

    # ==================================
    # CUSTOMER
    # ==================================

    path(
        "movies/<int:movie_id>/theatres/<int:theatre_id>/shows/",
        views.show_list,
        name="show-list"
    ),

    path(
        "shows/<int:show_id>/",
        views.show_detail,
        name="show-detail"
    ),


    # ==================================
    # ADMIN
    # ==================================

    path(
        "admin/shows/",
        views.admin_shows,
        name="admin-shows"
    ),

    path(
        "admin/shows/<int:show_id>/",
        views.admin_show_detail,
        name="admin-show-detail"
    ),

]