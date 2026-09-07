from rest_framework.decorators import (
    api_view,
    authentication_classes
)

from datetime import date

from rest_framework.response import Response
from rest_framework import status

from users.models import User
from movies.models import Movie
from theatres.models import Theatre

from .models import Show
from .serializers import ShowSerializer

@api_view(["GET"])
def show_list(request, movie_id, theatre_id):

    selected_date = request.GET.get("date")

    today = date.today()

    if not selected_date:

        selected_date = today.isoformat()

    try:

        selected_date_obj = date.fromisoformat(
            selected_date
        )

    except ValueError:

        return Response(
            {
                "message": "Invalid date format. Use YYYY-MM-DD."
            },
            status=400
        )

    if selected_date_obj < today:

        return Response(
            {
                "message": "Shows cannot be booked for previous dates."
            },
            status=400
        )


    shows = Show.objects.filter(
        movie_id=movie_id,
        theatre_id=theatre_id,
        show_date=selected_date_obj
    ).order_by(
        "show_time"
    )


    serializer = ShowSerializer(
        shows,
        many=True
    )


    return Response(
        serializer.data
    )

@api_view(["GET"])
def show_detail(request, show_id):

    try:

        show = Show.objects.get(
            id=show_id
        )

    except Show.DoesNotExist:

        return Response(
            {
                "message": "Show not found"
            },
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = ShowSerializer(show)

    return Response(
        serializer.data
    )


#Getting the logged - in user in this section
@api_view(["GET", "POST"])
@authentication_classes([])
def admin_shows(request):

    user_id = request.session.get(
        "_auth_user_id"
    )

    if not user_id:

        return Response(
            {
                "message": "Please login first."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )
# find the user from the database
    try:

        admin = User.objects.get(
            id=user_id
        )

    except User.DoesNotExist:

        return Response(
            {
                "message": "User not found."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

#checking admin role
    if admin.role != "ADMIN":

        return Response(
            {
                "message": "Admin access required."
            },
            status=status.HTTP_403_FORBIDDEN
        )

    if request.method == "GET":

        shows = Show.objects.select_related(
            "movie",
            "theatre"
        ).order_by(
            "-show_date",
            "show_time"
        )

        serializer = ShowSerializer(
            shows,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    movie_id = request.data.get(
        "movie"
    )

    theatre_id = request.data.get(
        "theatre"
    )


    if not movie_id or not theatre_id:

        return Response(
            {
                "message":
                    "Movie and theatre are required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    try:

        movie = Movie.objects.get(
            id=movie_id
        )

    except Movie.DoesNotExist:

        return Response(
            {
                "message": "Movie not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )

#Finding the theatre
    try:

        theatre = Theatre.objects.get(
            id=theatre_id
        )

    except Theatre.DoesNotExist:

        return Response(
            {
                "message": "Theatre not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )

#checking movie-theatre relationship
# suppose i have the bolow format and trying to add Movie 5,
# Theatre A
#     ├── Movie 1
#     ├── Movie 2
#     └── Movie 3

#the below code checks whether movie 5 is assigned to this theatre
    if not theatre.movies.filter(id=movie.id).exists():

        return Response(
            {
                "message":
                    "This movie is not assigned to this theatre."
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    serializer = ShowSerializer(
        data=request.data
    )

    '''{
    "movie": 5,
    "theatre": 2,
    "show_date": "2026-08-20",
    "show_time": "18:00"
    }''' # the above serializer code gives the output like this

    if serializer.is_valid():

        show = serializer.save(
            movie=movie,
            theatre=theatre
        ) #creates show databasse record

        return Response(
            {
                "message": "Show added successfully.",
                "show": ShowSerializer(
                    show
                ).data
            },
            status=status.HTTP_201_CREATED
        )


    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(["GET", "PUT", "DELETE"])
@authentication_classes([])
def admin_show_detail(request, show_id):

    user_id = request.session.get(
        "_auth_user_id"
    )#gets logged in user id

    if not user_id:

        return Response(
            {
                "message": "Please login first."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )


    try:

        admin = User.objects.get(
            id=user_id
        )

    except User.DoesNotExist:

        return Response(
            {
                "message": "User not found."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )


    if admin.role != "ADMIN":

        return Response(
            {
                "message": "Admin access required."
            },
            status=status.HTTP_403_FORBIDDEN
        )

#Finding the show
    try:
        show = Show.objects.select_related(
            "movie",
            "theatre"
        ).get(
            id=show_id
        )

    except Show.DoesNotExist:
        return Response(
            {
                "message": "Show not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":

        serializer = ShowSerializer(show)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
#update the show
    if request.method == "PUT":

        movie_id = request.data.get(
            "movie"
        )

        theatre_id = request.data.get(
            "theatre"
        )


        if not movie_id or not theatre_id:

            return Response(
                {
                    "message":
                        "Movie and theatre are required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        try:
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response(
                {
                    "message": "Movie not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )
#validate new thetare
        try:
            theatre = Theatre.objects.get(id=theatre_id)
        except Theatre.DoesNotExist:
            return Response(
                {
                    "message": "Theatre not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

#checks movie-theatre relationship and make sure new movie is assigned to selcted theatre
        if not theatre.movies.filter(
            id=movie.id
        ).exists():

            return Response(
                {
                    "message":
                        "This movie is not assigned to this theatre."
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        serializer = ShowSerializer(
            show,
            data=request.data
        )


        if serializer.is_valid():
            updated_show = serializer.save(
                movie=movie,
                theatre=theatre
            )

            return Response(
                {
                    "message":
                        "Show updated successfully.",
                    "show":
                        ShowSerializer(
                            updated_show
                        ).data
                },
                status=status.HTTP_200_OK
            )


        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    show.delete()

    return Response(
        {
            "message":
                "Show deleted successfully."
        },
        status=status.HTTP_200_OK
    )