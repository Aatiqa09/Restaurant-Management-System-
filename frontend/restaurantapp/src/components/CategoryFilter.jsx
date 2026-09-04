function CategoryFilter({
    categories,
    selectedCategory,
    setSelectedCategory
}) {

    return (

        <div className="mb-4">

            <h4 className="mb-3">
                Categories
            </h4>

            <button
                className={`btn me-2 mb-2 ${
                    selectedCategory === ""
                        ? "btn-primary"
                        : "btn-outline-primary"
                }`}
                onClick={() => setSelectedCategory("")}
            >
                All
            </button>

            {categories.map((category) => (

                <button
                    key={category}
                    className={`btn me-2 mb-2 ${
                        selectedCategory === category
                            ? "btn-primary"
                            : "btn-outline-primary"
                    }`}
                    onClick={() =>
                        setSelectedCategory(category)
                    }
                >
                    {category}
                </button>

            ))}

        </div>

    );

}

export default CategoryFilter;