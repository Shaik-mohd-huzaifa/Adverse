from django.urls import path
from AdGenie import views

urlpatterns = [
    path(
        "getCampaignImages",
        views.getCampaignImages,
        name="Helps you answer the queries",
    ),
    path("getBrands", views.getAllBrands, name="Gets all Brands"),
    path("createBrands", views.CreateNewBrand, name="Create Brands"),
    path(
        "getBrandImages",
        views.GetAllBrandImages,
        name="Create Brands Image Generations",
    ),
]
