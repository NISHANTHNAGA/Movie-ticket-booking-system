from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Booking
from .serializers import BookingSerializer

@api_view(["GET"])
def booked_seats(request, show_id):
    bookings = Booking.objects.filter(show_id = show_id)
    booked = []

    for booking in bookings:
        seats = booking.seat_numbers.split(",")
        booked.extend(seats)

    return Response(booked)

@api_view(["POST"])
def create_booking(request):
    serializer = BookingSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                "message":"Booking Successful"
            },
            status = status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status= status.HTTP_400_BAD_REQUEST
    )