from django.db import models


# Create your models here.

class TodoList(models.Model):
    Task = models.CharField(max_length=50, blank=False, null=False)
    CreatedOn = models.DateTimeField()
    Completed = models.BooleanField(default=False)
    CompletedOn = models.DateTimeField(blank=True, null=True)
    Deleted = models.BooleanField(default=False)
    DeletedOn = models.DateTimeField(blank=True, null=True)
    Tags = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.Task
