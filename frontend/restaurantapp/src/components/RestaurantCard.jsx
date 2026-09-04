function RestaurantCard({ restaurant }) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={
          restaurant.image_url ||
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
        }
        className="card-img-top"
        alt={restaurant.name}
        style={{
          height: "220px",
          objectFit: "cover"
        }}
      />

      <div className="card-body">
        <h5 className="card-title">
          {restaurant.name}
        </h5>

        <p className="card-text">
          {restaurant.description}
        </p>

        <p>
          <strong>Category:</strong> {restaurant.category}
        </p>

        <p>
          <strong>Price:</strong> {restaurant.price_range}
        </p>

        <p>
          <strong>Phone:</strong> {restaurant.phone_number}
        </p>
      </div>
    </div>
  );
}

export default RestaurantCard;