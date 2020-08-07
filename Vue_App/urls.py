from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name='main'),
    path('<str:id>/modify/', views.modify_task),
    path('<str:id>/delete/', views.delete_task),
    path('<str:id>/banana/', views.modify_task),
]