from rest_framework import serializers
from .models import Booking


class BookingShowSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    movie = serializers.CharField(source="movie.title")
    theatre = serializers.CharField(source="theatre.name")
    show_date = serializers.DateField()
    show_time = serializers.TimeField()
    price = serializers.DecimalField(
        max_digits=6,
        decimal_places=2
    )
    
    
class BookingSerializer(serializers.ModelSerializer):
    show_details = BookingShowSerializer(
        source="show",
        read_only=True
    )

    class Meta:
        model = Booking
        fields = [
            "id",
            "user",
            "show",
            "show_details",
            "seat_numbers",
            "total_amount",
            "booked_at",
            "ticket_code",
        ]

        read_only_fields = [
            "id",
            "user",
            "booked_at",
            "ticket_code",
        ]