from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Restaurant, MenuItem


@receiver(post_save, sender=Restaurant)
def create_default_menu_items(sender, instance, created, **kwargs):

    # Only create menu items for a newly created restaurant
    if not created:
        return

    default_menu_items = [
        {
            "name": "Special Veg Platter",
            "description": "A delicious selection of fresh vegetarian dishes.",
            "price": 250.00,
            "category": "Main Course",
            "is_vegetarian": True,
            "is_spicy": False,
            "preparation_time": 20,
        },
        {
            "name": "Paneer Tikka",
            "description": "Grilled paneer with aromatic spices.",
            "price": 220.00,
            "category": "Starters",
            "is_vegetarian": True,
            "is_spicy": True,
            "preparation_time": 15,
        },
        {
            "name": "Butter Naan",
            "description": "Soft naan topped with butter.",
            "price": 60.00,
            "category": "Bread",
            "is_vegetarian": True,
            "is_spicy": False,
            "preparation_time": 10,
        },
        {
            "name": "Fresh Lime Soda",
            "description": "Refreshing lime soda.",
            "price": 80.00,
            "category": "Beverages",
            "is_vegetarian": True,
            "is_spicy": False,
            "preparation_time": 5,
        },
    ]

    for menu_item in default_menu_items:
        MenuItem.objects.create(
            restaurant=instance,
            **menu_item
        )