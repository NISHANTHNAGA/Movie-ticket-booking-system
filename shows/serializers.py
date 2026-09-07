from rest_framework import serializers

from .models import Show


class ShowSerializer(serializers.ModelSerializer):

    movie_title = serializers.CharField(
        source="movie.title",
        read_only=True
    )

    theatre_name = serializers.CharField(
        source="theatre.name",
        read_only=True
    )


    class Meta:

        model = Show

        fields = [
            "id",
            "movie",
            "movie_title",
            "theatre",
            "theatre_name",
            "show_date",
            "show_time",
            "price",
        ]