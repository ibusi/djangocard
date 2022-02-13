from django.db import models
from django.forms import CharField

# Create your models here.


class Result(models.Model):
    round = models.CharField(max_length=200, primary_key=True)
    playerCard = models.CharField(max_length=200, blank=True, null=True)
    computerCard = models.CharField(max_length=200, blank=True, null=True)
    winner = models.CharField(max_length=200, blank=True, null=True)
