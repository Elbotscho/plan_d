from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'fleets', FleetViewSet, basename='fleet')
router.register(r'ships', ShipViewSet, basename='ship')
router.register(r'people', PersonViewSet, basename='person')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admirals/', get_admirals, name='get_admirals'),
]



