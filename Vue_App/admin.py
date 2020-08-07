from django.contrib import admin
from .models import TodoList


# Register your models here.

class AdminTodoList(admin.ModelAdmin):
    list_display = ['Task', 'CreatedOn', 'Completed', 'Deleted']


admin.site.register(TodoList, AdminTodoList)
