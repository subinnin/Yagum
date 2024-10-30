from django.urls import path,include
from . import views

urlpatterns = [
    path('ask-chatgpt', views.ask_chatgpt, name="ask_chatgpt")
]
