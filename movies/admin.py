from django.contrib import admin
from .models import Movie

# Register your models here.

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "genre",
        "language",
        "duration",
        "release_date",
        "is_active",
    )

    list_filter = (
        "genre",
        "language",
        "is_active",
    )

    search_fields = (
        "title",
        "genre",
        "language",
    )

    ordering = (
        "title",
    )