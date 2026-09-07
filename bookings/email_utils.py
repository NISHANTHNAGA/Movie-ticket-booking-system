from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string


def send_booking_email(booking):

    user = booking.user
    show = booking.show

    subject = "CineBook - Your E-Ticket Confirmation"


    ticket_url = (
        f"http://127.0.0.1:5173/verify-ticket/"
        f"{booking.ticket_code}"
    )


    context = {

        "booking": booking,

        "user": user,

        "show": show,

        "ticket_url": ticket_url,

    }


    html_content = render_to_string(
        "bookings/booking_confirmation.html",
        context
    )


    text_content = f"""
CineBook - Booking Confirmed

Hello {user.username},

Your movie ticket has been booked successfully.

Movie: {show.movie.title}
Theatre: {show.theatre.name}
Date: {show.show_date}
Time: {show.show_time}
Seats: {booking.seat_numbers}

Price per Seat: ₹{show.price}
Total Amount: ₹{booking.total_amount}

Booking ID: #{booking.id}

Ticket Code:
{booking.ticket_code}

Verify your ticket:
{ticket_url}

Please show your ticket at the theatre.

Thank you for booking with CineBook.
"""


    email = EmailMultiAlternatives(

        subject=subject,

        body=text_content,

        from_email=settings.DEFAULT_FROM_EMAIL,

        to=[user.email],

    )


    email.attach_alternative(

        html_content,

        "text/html"

    )


    email.send(
        fail_silently=False
    )