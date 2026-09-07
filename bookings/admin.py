from django.contrib import admin
from .models import Booking
# Register your models here.

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "show",
        "seat_numbers",
        "total_amount",
        "booked_at",
    )