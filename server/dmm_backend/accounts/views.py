from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from .serializers import AdminLoginSerializer


@method_decorator(csrf_exempt, name="dispatch")
class AdminLoginAPIView(APIView):
    """
    POST /api/admin/login/
    Request: { "email": "...", "password": "..." }
    Response: { "refresh": "...", "access": "...", "user": { ... } }
    """

    authentication_classes = []   # 🔑 REQUIRED
    permission_classes = []       # 🔑 REQUIRED

    def post(self, request):
        serializer = AdminLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
