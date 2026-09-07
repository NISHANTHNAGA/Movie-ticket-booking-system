from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Show
from.serializers import ShowSerializer

@api_view(["GET"])
def show_list(request, movie_id, theatre_id):
    shows = Show.objects.filter(
        movie_id = movie_id,
        theatre_id = theatre_id
    )

    serializer = ShowSerializer(shows, many = True)
    return Response(serializer.data)

@api_view(["GET"])
def show_detail(request, show_id):
    try:
        show = Show.objects.get(id = show_id)
    except Show.DoesNotExist:
        return Response({"message":"Show not found"}, status = 404)

    serializer = ShowSerializer(show)

    return Response(serializer.data)