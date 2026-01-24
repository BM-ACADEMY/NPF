from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import dmmViewSet

router = DefaultRouter()
router.register(r"dmm", dmmViewSet, basename="dmm")

urlpatterns = [
    path("", include(router.urls)),

    # Extra API endpoints
    path("dmm/check_phone/", dmmViewSet.as_view({"get": "check_phone"})),
    path("dmm/download/", dmmViewSet.as_view({"get": "download"})),
]
