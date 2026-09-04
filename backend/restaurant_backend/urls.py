from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import (
    RestaurantViewSet,
    MenuItemViewSet,
    dashboard_stats
)

router = DefaultRouter()

router.register(
    'restaurants',
    RestaurantViewSet
)

router.register(
    'menu-items',
    MenuItemViewSet
)

urlpatterns = [

    path(
        'dashboard/',
        dashboard_stats,
        name='dashboard-stats'
    ),

]

urlpatterns += router.urls