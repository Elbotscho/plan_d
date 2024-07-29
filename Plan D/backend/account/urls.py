from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import *

urlpatterns = [
    path("login/", obtain_auth_token, name="login"),
    path("logout/", logout_user, name="logout"),
    path("register/", user_register_view, name="register"),
    path("users/", get_users, name="users"),
]