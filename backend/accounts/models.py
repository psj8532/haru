from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager

# Create your models here.


class User(AbstractUser):
    objects = CustomUserManager()

    username = None
    email = models.EmailField(unique=True)
    nickname = models.CharField(max_length=12, blank=False, unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname']

    height = models.IntegerField(null=True)
    weight = models.IntegerField(null=True)
    age = models.IntegerField(null=True)
    active = models.CharField(max_length=45)
    sex = models.CharField(max_length=45)
    basal_metabolism = models.IntegerField(null=True)
    profileImage = models.ImageField(null=True)

    followings = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='follower'
    )
    followers = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='following'
    )

    num_of_followings = models.IntegerField(default=0)
    num_of_followers = models.IntegerField(default=0)
