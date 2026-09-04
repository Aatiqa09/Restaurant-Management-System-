from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend

from .models import Restaurant, MenuItem
from .serializers import RestaurantSerializer, MenuItemSerializer


from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter


class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all().order_by('-id')
    serializer_class = RestaurantSerializer
    permission_classes = [AllowAny]

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
    ]

    search_fields = [
        'name',
        'description'
    ]

    filterset_fields = [
        'has_delivery',
        'is_vegetarian_friendly',
        'category'
    ]


class MenuItemViewSet(viewsets.ModelViewSet):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

@api_view(['GET'])
def dashboard_stats(request):

    restaurants = Restaurant.objects.all()

    total_restaurants = restaurants.count()

    delivery_restaurants = restaurants.filter(
        has_delivery=True
    ).count()

    vegetarian_restaurants = restaurants.filter(
        is_vegetarian_friendly=True
    ).count()

    total_categories = restaurants.values(
        'category'
    ).distinct().count()

    non_vegetarian_restaurants = Restaurant.objects.filter(
    is_vegetarian_friendly=False
    ).count()

    return Response({
    "total_restaurants": total_restaurants,
    "delivery_restaurants": delivery_restaurants,
    "vegetarian_restaurants": vegetarian_restaurants,
    "non_vegetarian_restaurants": non_vegetarian_restaurants,
})