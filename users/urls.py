from django.urls import path

from . import views


urlpatterns = [

    path(
        "register/",
        views.register,
        name="register"
    ),

    path(
        "login/",
        views.user_login,
        name="login"
    ),

    path(
        "logout/",
        views.user_logout,
        name="logout"
    ),

    path(
        "admin/users/",
        views.admin_users,
        name="admin-users"
    ),

    path(
        "admin/users/<int:user_id>/",
        views.admin_user_detail,
        name="admin-user-detail"
    ),

]