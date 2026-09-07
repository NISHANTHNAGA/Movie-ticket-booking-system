from django.urls import path
from . import api


urlpatterns = [

    path(
        "register/",
        api.register,
        name="register"
    ),

    path(
        "login/",
        api.user_login,
        name="login"
    ),
]