from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Theatre

from .serializers import ScreenSerializer

@api_view(["GET"])
def screen_list(request, theatre_id):
    try:
        theatre = Theatre.objects.get(id = theatre_id)
    except Theatre.DoesNotExist:
         return Response(
            {
                "message": "Theatre not found"
            },
            status=404
        )

    screens = theatre.screens.all()

    serializer = ScreenSerializer(screens, many = True)

    return Response(serializer.data)