from django.urls import path
from test import views
from .views import get_json_data

urlpatterns = [
    path('',views.index),
    path('data/', views.receive_data ,name = "receive_data"),
    path('api/content/', get_json_data, name="get_json_data")
]
