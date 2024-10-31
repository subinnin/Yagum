from django.urls import path
from test import views

urlpatterns = [
    path('',views.index),
    path('data/', views.receive_data ,name = "receive_data"),
]
