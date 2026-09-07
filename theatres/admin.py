from django.contrib import admin
from .models import Theatre
# Register your models here.

@admin.register(Theatre)
class TheatreAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "city",
    )

    filter_horizontal = (
        "movies",
    )