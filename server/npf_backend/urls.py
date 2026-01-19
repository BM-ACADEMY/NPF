from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import home
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path("", home, name="home"),
    path("admin-django/", admin.site.urls),
    path("admin/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/admin/", include("npf_backend.accounts.urls")),
    path("api/gallery/", include("npf_backend.gallery.urls")),
    path("api/", include("npf_backend.banner.urls")),
    path("api/blog/", include("npf_backend.blog.urls")),
    path('api/', include('npf_backend.license.urls')),
    path("api/", include("npf_backend.complaints.urls")),
    ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
