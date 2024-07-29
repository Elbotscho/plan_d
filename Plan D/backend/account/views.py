from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from .serializers import UserRegisterSerializer, Usererializer

@api_view(["POST",])
def logout_user(request):
    if request.method == "POST":
        request.user.auth_token.delete()
        return Response({"Message": "You are logged out"}, status=status.HTTP_200_OK)
    
@api_view(["POST",])
@permission_classes([AllowAny])
def user_register_view(request):
    if request.method == "POST":
        serializer = UserRegisterSerializer(data=request.data)
        data = {}
        if serializer.is_valid():

            account = serializer.save()

            data['response'] = 'Account has  been created'
            data['username'] = account.username
            data['email'] = account.email

        else:
            data['response'] = 'Data invalid'

    else:
        data = serializer.errors

    return Response(data)

@api_view(["GET",])
def get_users(request):
    user = User.objects.all()
    serializer = Usererializer(user, many=True)
    return Response(serializer.data)