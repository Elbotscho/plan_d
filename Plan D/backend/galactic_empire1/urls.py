from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/empire/', include('business_expansion.urls')),
    path('api/account/', include('account.urls')),
]
