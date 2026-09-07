from django.urls import path

from . import views


urlpatterns = [

    path(
        "shows/<int:show_id>/booked-seats/",
        views.booked_seats,
        name="booked-seats"
    ),

    path(
        "book/",
        views.create_booking,
        name="create-booking"
    ),

    path(
    "bookings/",
    views.my_bookings,
    name="my-bookings"
    ),

    path(
        "tickets/<uuid:ticket_code>/",
        views.verify_ticket,
        name="verify-ticket"
    ),
]