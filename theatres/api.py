from rest_framework.decorators import api_view
from rest_framework.response import Response

from movies.models import Movie
from .models import Theatre
from .serializers import TheatreSerializer

@api_view(["GET"])
def theatre_list(request, movie_id):
    movie = Movie.objects.get(id = movie_id)
    theatres = movie.theatres.all()
    serializer = TheatreSerializer(theatres, many=True)
    return Response(serializer.data)