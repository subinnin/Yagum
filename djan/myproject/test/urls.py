from django.urls import path
from test import views


urlpatterns = [
    # path('',views.index),
    path('data/', views.receive_data ,name = "receive_data"),
    # path('api/content/', views.get_json_data, name="get_json_data")
]
