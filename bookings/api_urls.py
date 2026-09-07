from django.urls import path
from . import api

urlpatterns = [
    path("shows/<int:show_id>/booked-seats/",
        api.booked_seats,
        name="booked-seats",
        ),
    path(
        "book/",
        api.create_booking,
        name="create-booking",
    ),
]