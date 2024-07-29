from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from django.core.cache import cache
from django.contrib.auth.decorators import login_required
from .models import Fleet, Ship, Person
from .serializers import *
from .permissions import *
from .decorators import group_required
from rest_framework.decorators import api_view

class FleetViewSet(viewsets.ViewSet):
    serializer_class = FleetSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        cache_key = 'fleet_list'
        cached_data = cache.get(cache_key)
        
        if cached_data:
            return Response(cached_data)
        
        queryset = Fleet.objects.select_related('admiral').all()
        serializer = FleetSerializer(queryset, many=True)
        cache.set(cache_key, serializer.data, timeout=60*15)  # Cache für 15 Minuten
        return Response(serializer.data)

    @group_required('Admin')
    def create(self, request):
        serializer = SaveFleetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            fleet = Fleet.objects.get(pk=pk)
        except Fleet.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = FleetDetailSerializer(fleet)
        return Response(serializer.data)

class ShipViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        cache_key = 'ship_list'
        cached_data = cache.get(cache_key)
        
        if cached_data:
            return Response(cached_data)
        
        queryset = Ship.objects.select_related('fleet').all()
        serializer = ShipSerializer(queryset, many=True)
        cache.set(cache_key, serializer.data, timeout=60*15)  # Cache für 15 Minuten
        return Response(serializer.data)

    @group_required('Admin')
    def create(self, request):
        serializer = SaveShipSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            ship = Ship.objects.get(pk=pk)
        except Ship.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = ShipDetailSerializer(ship)
        return Response(serializer.data)

class PersonPagination(PageNumberPagination):
    page_size = 100  # Anzahl der Einträge pro Seite
    page_size_query_param = 'page_size'
    max_page_size = 1000

class PersonViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    pagination_class = PersonPagination

    def list(self, request):
        queryset = Person.objects.all()
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(queryset, request)
        if page is not None:
            serializer = PersonSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)
        
        serializer = PersonSerializer(queryset, many=True)
        return Response(serializer.data)

    @group_required(['Admin', 'Manager'])
    def create(self, request):
        serializer = SavePersonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        try:
            person = Person.objects.get(pk=pk)
        except Ship.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = PersonDetailSerializer(person)
        return Response(serializer.data)

@api_view(["GET",])
def get_admirals(request):
    if request.method == "GET":
        person = Person.objects.filter(rank='Admiral')
        serializer = PersonSerializer(person, many=True)
        return Response(serializer.data)