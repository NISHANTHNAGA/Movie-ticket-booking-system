from django.db import models
import uuid

from users.models import User
from shows.models import Show


class Booking(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    show = models.ForeignKey(
        Show,
        on_delete=models.CASCADE
    )

    seat_numbers = models.CharField(
        max_length=100
    )

    total_amount = models.DecimalField(
        max_digits=8,
        decimal_places=2
    )

    booked_at = models.DateTimeField(
        auto_now_add=True
    )

    ticket_code = models.UUIDField(
        default=uuid.uuid4,
        unique = True,
        editable = False
    )

    def __str__(self):

        return f"{self.user.username} - {self.show}"