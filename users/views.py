from django.contrib.auth import authenticate, login, logout

from rest_framework.decorators import (
    api_view,
    authentication_classes
)

from rest_framework.response import Response
from rest_framework import status

from .models import User
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
@authentication_classes([])
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


@api_view(["POST"])
@authentication_classes([])
def user_logout(request):

    logout(request)

    return Response(
        {
            "message": "Logout Successful"
        },
        status=status.HTTP_200_OK
    )


# ==========================================
# ADMIN - USERS
# ==========================================

@api_view(["GET"])
@authentication_classes([])
def admin_users(request):

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


    users = User.objects.all().order_by(
        "id"
    )


    serializer = UserSerializer(
        users,
        many=True
    )


    return Response(
        serializer.data,
        status=status.HTTP_200_OK
    )
    
    
    
@api_view(["PUT", "DELETE"])
@authentication_classes([])
def admin_user_detail(request, user_id):

    admin_id = request.session.get(
        "_auth_user_id"
    )

    if not admin_id:

        return Response(
            {
                "message": "Please login first."
            },
            status=status.HTTP_401_UNAUTHORIZED
        )


    try:

        admin = User.objects.get(
            id=admin_id
        )

    except User.DoesNotExist:

        return Response(
            {
                "message": "Admin user not found."
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

        user = User.objects.get(
            id=user_id
        )

    except User.DoesNotExist:

        return Response(
            {
                "message": "User not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )


    # =========================
    # UPDATE ROLE
    # =========================

    if request.method == "PUT":

        role = request.data.get("role")


        allowed_roles = [
            "ADMIN",
            "OWNER",
            "CUSTOMER",
            "STAFF"
        ]


        if role not in allowed_roles:

            return Response(
                {
                    "message": "Invalid role."
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        user.role = role

        user.save()


        return Response(
            {
                "message": "User role updated successfully.",
                "user": UserSerializer(user).data
            },
            status=status.HTTP_200_OK
        )


    # =========================
    # DELETE USER
    # =========================

    if request.method == "DELETE":

        if user.id == admin.id:

            return Response(
                {
                    "message": "You cannot delete your own account."
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        user.delete()


        return Response(
            {
                "message": "User deleted successfully."
            },
            status=status.HTTP_200_OK
        )