from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_list, name="get_list"),
    path("add/", views.create_list, name="create_list"),
    path("update/<int:pk>/", views.update_list, name="update_list"),
    path("delete/<int:pk>/", views.delete_list, name="delete_list"),
]
