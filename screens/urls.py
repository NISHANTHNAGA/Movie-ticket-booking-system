from django.urls import path
from .import views

urlpatterns = [
    path("theatres/<int:theatre_id>/screens/", views.screen_list, name="screen-list"),
]