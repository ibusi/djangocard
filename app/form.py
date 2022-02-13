from django.forms import ModelForm
from .models import result


class TaskForm(ModelForm):
    class Meta:
        model = result
        fields = "__all__"
