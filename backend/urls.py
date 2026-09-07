from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/", include("movies.urls")),
    path('api/', include("users.urls")),
    path("api/", include("theatres.urls")),
    path("api/", include("shows.urls")),
    path("api/", include("screens.urls")),
    path("api/", include("bookings.urls")),
]


urlpatterns += static(
    settings.MEDIA_URL,
    document_root = settings.MEDIA_ROOT
)