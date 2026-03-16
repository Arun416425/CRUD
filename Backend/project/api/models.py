from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=40)
    age = models.IntegerField()
    course = models.CharField(max_length=50)
    city = models.CharField(max_length=50)

    def __str__(self):
        return self.name
