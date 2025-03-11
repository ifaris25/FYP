from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="index"),  # Main input page
    path("generate/", views.generate_text, name="generate_text"),  # New page for results
]
