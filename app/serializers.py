from rest_framework import serializers
from .models import Result


class Resultserializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = "__all__"
