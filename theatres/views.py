from rest_framework.decorators import (
    api_view,
    authentication_classes
)

from datetime import date

from rest_framework.response import Response
from rest_framework import status

from movies.models import Movie
from movies.seriallizers import MovieSerializer

from users.models import User

from .models import Theatre
from .serializers import TheatreSerializer


@api_view(["GET"])
def theatre_list(request, movie_id):

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


    selected_date = request.GET.get(
        "date"
    )

    today = date.today()

    if not selected_date:

        selected_date = today.isoformat()

    try:
#converts "2026-08-20" to date(2026, 8, 20) whixh is a python date object
        selected_date_obj = date.fromisoformat(
            selected_date
        )# this is done to compare dates

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
                "message": "Previous dates are not available."
            },
            status=400
        )
    
    theatres = movie.theatres.filter(
        shows__show_date=selected_date_obj
    ).distinct()#Find theatres associated with this movie that have a show on the selected date
    #The double underscore:

#The double underscore:

#shows__show_date

#means Django is traversing a relationship:
        
    '''Movie
    ↓
    Theatre
    ↓
    Show
    ↓
    show_date'''


    serializer = TheatreSerializer(
        theatres,
        many=True
    )


    return Response(
        serializer.data
    )

@api_view(["GET", "POST"])
@authentication_classes([])
def admin_theatres(request):

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

    if request.method == "GET":

        theatres = Theatre.objects.all().order_by(
            "name"
        )

        serializer = TheatreSerializer(
            theatres,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    serializer = TheatreSerializer(
        data=request.data
    )

    if serializer.is_valid():

        theatre = serializer.save()

        return Response(
            {
                "message": "Theatre added successfully.",
                "theatre": TheatreSerializer(
                    theatre
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
def admin_theatre_detail(request, theatre_id):

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


    if request.method == "GET":

        serializer = TheatreSerializer(
            theatre
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    if request.method == "PUT":

        serializer = TheatreSerializer(
            theatre,
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message": "Theatre updated successfully.",
                    "theatre": serializer.data
                },
                status=status.HTTP_200_OK
            )


        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


    theatre.delete()

    return Response(
        {
            "message": "Theatre deleted successfully."
        },
        status=status.HTTP_200_OK
    )
    
@api_view(["GET", "PUT"])
@authentication_classes([])
def admin_theatre_movies(request, theatre_id):

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

    if request.method == "GET":

        movies = theatre.movies.all()

        serializer = MovieSerializer(
            movies,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )



    movie_ids = request.data.get(
        "movie_ids"
    )


    if movie_ids is None:

        return Response(
            {
                "message": "movie_ids is required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    if not isinstance(movie_ids, list):

        return Response(
            {
                "message": "movie_ids must be a list."
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    movies = Movie.objects.filter(
        id__in=movie_ids
    )


    if len(movies) != len(set(movie_ids)):

        return Response(
            {
                "message": "One or more movies were not found."
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    theatre.movies.set(movies)


    return Response(
        {
            "message": "Movies assigned successfully.",
            "movies": MovieSerializer(
                movies,
                many=True
            ).data
        },
        status=status.HTTP_200_OK
    )

@api_view(["GET"])
@authentication_classes([])
def admin_movie_theatres(request, movie_id):

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

    theatres = movie.theatres.all().order_by("name")

    serializer = TheatreSerializer(
        theatres,
        many=True
    )

    return Response(
        serializer.data,
        status=status.HTTP_200_OK
    )

@api_view(["GET"])
@authentication_classes([])
def admin_theatres_by_movie(request, movie_id):

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


    theatres = movie.theatres.all().order_by(
        "name"
    )


    serializer = TheatreSerializer(
        theatres,
        many=True
    )


    return Response(
        serializer.data,
        status=status.HTTP_200_OK
    )