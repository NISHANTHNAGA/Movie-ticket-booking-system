from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Movie
from .seriallizers import MovieSerializer


@api_view(["GET"])
def movie_list(request):

    movies = Movie.objects.all()

    serializer = MovieSerializer(
        movies,
        many=True
    )

    return Response(serializer.data)


@api_view(["GET"])
def movie_detail(request, movie_id):

    try:

        movie = Movie.objects.get(
            id=movie_id
        )

    except Movie.DoesNotExist:

        return Response(
            {
                "message": "Movie not found"
            },
            status=404
        )

    serializer = MovieSerializer(movie)

    return Response(serializer.data)