from django.db import models


class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=50)
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()

    opening_time = models.TimeField()
    closing_time = models.TimeField()

    price_range = models.CharField(max_length=20)

    is_vegetarian_friendly = models.BooleanField(default=False)
    has_delivery = models.BooleanField(default=False)

    website = models.URLField(blank=True)

    # Restaurant image
    image_url = models.URLField(blank=True)

    # ⭐ Restaurant Rating
    rating = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        default=4.5
    )

    # ⭐ Total Reviews
    total_reviews = models.PositiveIntegerField(default=100)

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name='menu_items'
    )

    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    price = models.DecimalField(
        max_digits=8,
        decimal_places=2
    )

    category = models.CharField(max_length=50)

    is_vegetarian = models.BooleanField(default=False)
    is_spicy = models.BooleanField(default=False)

    preparation_time = models.IntegerField()

    def __str__(self):
        return f"{self.name} - {self.restaurant.name}"