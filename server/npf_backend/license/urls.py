from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import npfViewSet

router = DefaultRouter()
router.register(r"npf", npfViewSet, basename="npf")

urlpatterns = [
    path("", include(router.urls)),

    # Extra API endpoints
    path("npf/check_phone/", npfViewSet.as_view({"get": "check_phone"})),
    path("npf/download/", npfViewSet.as_view({"get": "download"})),
]
