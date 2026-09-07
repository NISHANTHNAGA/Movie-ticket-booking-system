from rest_framework.decorators import (api_view, authentication_classes)
from rest_framework.response import Response
from rest_framework import status
from .models import Movie
from .seriallizers import MovieSerializer
from users.models import User

from theatres.models import Theatre
from shows.models import Show

@api_view(["GET"])
def movie_list(request):

    movies = Movie.objects.all()

    city = request.GET.get("city")

    if city:

        movies = movies.filter(
            theatres__city__iexact=city,
            theatres__shows__isnull=False
        )

    min_price = request.GET.get(
        "min_price"
    )

    if min_price:

        movies = movies.filter(
            theatres__shows__price__gte=min_price
        )

    max_price = request.GET.get(
        "max_price"
    )

    if max_price:

        movies = movies.filter(
            theatres__shows__price__lte=max_price
        )

    movies = movies.distinct()


    serializer = MovieSerializer(
        movies,
        many=True
    )

    return Response(
        serializer.data
    )

@api_view(["GET"])
def movie_detail(request, movie_id):
    try:
        movie = Movie.objects.get(id = movie_id)
    except Movie.DoesNotExist:
        return Response({"message":"Movie not found"}, status = status.HTTP_404_NOT_FOUND)

    serializer = MovieSerializer(movie)
    return Response(serializer.data)

@api_view(["GET", "POST"])
@authentication_classes([])
def admin_movies(request):

    user_id = request.session.get("_auth_user_id")

    if not user_id:

        return Response(
            {
                "message": "Please login first."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )

    try:

        user = User.objects.get(
            id=user_id
        )

    except User.DoesNotExist:

        return Response(
            {
                "message": "User not found."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )


    if user.role != "ADMIN":

        return Response(
            {
                "message": "Admin access required."
            },
            status=status.HTTP_403_FORBIDDEN
        )

    if request.method == "GET":

        movies = Movie.objects.all().order_by(
            "-created_at"
        )

        serializer = MovieSerializer(
            movies,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    serializer = MovieSerializer(
        data=request.data
    )

    if serializer.is_valid():

        movie = serializer.save()

        return Response(
            {
                "message": "Movie added successfully.",
                "movie": MovieSerializer(movie).data
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )
    
    
@api_view(["PUT", "DELETE"])
@authentication_classes([])
def admin_movie_detail(request, movie_id):

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

        user = User.objects.get(
            id=user_id
        )

    except User.DoesNotExist:

        return Response(
            {
                "message": "User not found."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )


    if user.role != "ADMIN":

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


    if request.method == "PUT":

        serializer = MovieSerializer(
            movie,
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message": "Movie updated successfully.",
                    "movie": serializer.data
                },
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


    movie.delete()

    return Response(
        {
            "message": "Movie deleted successfully."
        },
        status=status.HTTP_200_OK
    )


@api_view(["GET"])
def admin_dashboard(request):

    if not request.user.is_authenticated:

        return Response(
            {
                "message": "Please login first."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )


    user = request.user


    if user.role != "ADMIN":

        return Response(
            {
                "message": "Admin access required."
            },
            status=status.HTTP_403_FORBIDDEN
        )


    movie_count = Movie.objects.count()

    user_count = User.objects.count()

    theatre_count = Theatre.objects.count()

    show_count = Show.objects.count()


    return Response(
        {
            "movies": movie_count,
            "users": user_count,
            "theatres": theatre_count,
            "shows": show_count
        },
        status=status.HTTP_200_OK
    )