from rest_framework.decorators import (api_view, authentication_classes)
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

from datetime import date
from .models import Booking
from users.models import User
from shows.models import Show
from .serializers import BookingSerializer

from .email_utils import send_booking_email

@api_view(["GET"])
def booked_seats(request, show_id):

    bookings = Booking.objects.filter(
        show_id=show_id
    )

    booked = []

    for booking in bookings:

        seats = booking.seat_numbers.split(",")

        booked.extend(
            seat.strip()
            for seat in seats
        )

    return Response(booked)



@api_view(["POST"])
@authentication_classes([])
def create_booking(request):

    User = get_user_model()

    user_id = request.session.get(
        "_auth_user_id"
    )

    if not user_id:

        return Response(
            {
                "message":
                "Please login before booking."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )


    try:

        user = User.objects.get(
            id=user_id
        )

    except User.DoesNotExist:

        return Response(
            {
                "message": "User not found."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )


    # =========================
    # GET BOOKING DATA
    # =========================

    show_id = request.data.get(
        "show"
    )

    seat_numbers = request.data.get(
        "seat_numbers"
    )

    total_amount = request.data.get(
        "total_amount"
    )


    # =========================
    # CHECK SHOW
    # =========================

    try:

        show = Show.objects.get(
            id=show_id
        )

    except Show.DoesNotExist:

        return Response(
            {
                "message": "Show not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )


    # =========================
    # PREVENT PAST-DATE BOOKING
    # =========================

    today = date.today()


    if show.show_date < today:

        return Response(
            {
                "message":
                "Booking is not available for previous dates."
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    # =========================
    # CHECK SEATS
    # =========================

    if not seat_numbers:

        return Response(
            {
                "message":
                "Please select at least one seat."
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    seats = [
        seat.strip()
        for seat in seat_numbers.split(",")
        if seat.strip()
    ]

    if len(seats) > 10:

        return Response(
            {
                "message":
                "You can book a maximum of 10 seats at a time.",
                "maximum_seats":
                10
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    # =========================
    # CHECK ALREADY BOOKED SEATS
    # =========================

    existing_bookings = Booking.objects.filter(
        show_id=show_id
    )


    booked_seats = []


    for booking in existing_bookings:

        booked_seats.extend(
            seat.strip()
            for seat in booking.seat_numbers.split(",")
        )


    already_booked = [
        seat
        for seat in seats
        if seat in booked_seats
    ]


    if already_booked:

        return Response(
            {
                "message":
                "Some seats are already booked.",

                "booked_seats":
                already_booked
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    # =========================
    # CREATE BOOKING DATA
    # =========================

    booking_data = {

        "show": show_id,

        "seat_numbers":
            ",".join(seats),

        "total_amount":
            total_amount
    }


    serializer = BookingSerializer(
        data=booking_data
    )


    # =========================
    # SAVE BOOKING
    # =========================

    if serializer.is_valid():

        booking = serializer.save(
        user=user
        )

        send_booking_email(
        booking
        )


        return Response(
            {
                "message":
                "Booking Successful",

                "booking":
                BookingSerializer(
                    booking
                ).data
            },
            status=status.HTTP_201_CREATED
        )


    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(["GET"])
@authentication_classes([])
def my_bookings(request):

    user_id = request.session.get("_auth_user_id")

    if not user_id:
        return Response(
            {
                "message": "Please login first."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    try:
        user = User.objects.get(id=user_id)

    except User.DoesNotExist:
        return Response(
            {
                "message": "User not found."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    bookings = Booking.objects.filter(
        user=user
    ).order_by("-booked_at")

    serializer = BookingSerializer(
        bookings,
        many=True
    )

    return Response(
        serializer.data,
        status=status.HTTP_200_OK
    )

@api_view(["GET"])
def verify_ticket(request, ticket_code):

    try:
        booking = Booking.objects.get(
            ticket_code=ticket_code 
        )

    except Booking.DoesNotExist:

        return Response(
            {
                "valid": False,
                "message": "Invalid ticket."
            },
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = BookingSerializer(
        booking
    )

    return Response(
        {
            "valid": True,
            "message": "Ticket is valid.",
            "booking": serializer.data
        },
        status=status.HTTP_200_OK
    )