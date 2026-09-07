from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import UserSerializer, RegisterSerializer


@api_view(["POST"])
def register(request):

    serializer = RegisterSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            {
                "message": "Registration successful"
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["POST"])
def user_login(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(
        username=username,
        password=password
    )

    if user is not None:

        login(request, user)

        serializer = UserSerializer(user)

        return Response(
            {
                "message": "Login Successful",
                "user": serializer.data
            },
            status=status.HTTP_200_OK
        )

    return Response(
        {
            "message": "Invalid Username or Password"
        },
        status=status.HTTP_401_UNAUTHORIZED
    )