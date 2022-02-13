from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("resultlist/", views.resultList, name="resultlist"),
    path("resultcreate/", views.resultCreate, name="resultcreate"),
    path("resultdelete/", views.resultDelete, name="resultdelete"),
]
