from unittest import result
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import Resultserializer

from .models import Result

# Create your views here.


def index(request):
    return render(request, "index.html")


@api_view(["GET"])
def resultList(request):
    result = Result.objects.all()
    serializer = Resultserializer(result, many=True)
    return Response(serializer.data)


@api_view(["POST"])
def resultCreate(request):
    serializer = Resultserializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(["DELETE"])
def resultDelete(request):
    result = Result.objects.all()
    result.delete()

    return Response("Item deleted")
