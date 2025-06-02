import React, { useContext } from "react";
import myContext from "../../context/data/myContext";

function Filter() {
  const context = useContext(myContext);
  const {
    mode,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    product,
  } = context;

  if (!product) {
    return null; // If product is undefined, show nothing
  }

  // Get unique categories
  const uniqueCategories = [...new Set(product.map((item) => item.category))];

  const handleResetFilters = () => {
    setSearchkey("");
    setFilterType("");
    setFilterPrice("");
  };

  return (
    <div>
      <div className="container mx-auto px-4 mt-8">
        <div
          className="p-6 rounded-lg bg-gray-100 drop-shadow-xl border border-gray-200"
          style={{
            backgroundColor: mode === "dark" ? "#282c34" : "#f9fafb",
            color: mode === "dark" ? "white" : "#2d3748",
          }}
        >
          <div className="relative mb-4">
            <div className="absolute flex items-center ml-3 h-full">
              <svg
                className="w-5 h-5 text-primary-gray-dark"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z" />
              </svg>
            </div>
            <input
              type="text"
              name="searchkey"
              value={searchkey}
              onChange={(e) => setSearchkey(e.target.value)}
              id="searchkey"
              placeholder="Search products..."
              className="pl-10 pr-4 py-3 w-full rounded-md bg-violet-50 border-transparent outline-none text-sm focus:ring-2 focus:ring-indigo-600"
              style={{
                backgroundColor: mode === "dark" ? "rgb(64 66 70)" : "#fff",
                color: mode === "dark" ? "white" : "#2d3748",
              }}
            />
          </div>

          <div className="flex items-center justify-between mt-6 mb-4">
            <p className="font-semibold text-lg">Filters</p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded-md"
              style={{ color: mode === "dark" ? "white" : "#2d3748" }}
            >
              Reset Filters
            </button>
          </div>

          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Category Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 text-sm focus:ring-2 focus:ring-indigo-600"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(64 66 70)" : "#fff",
                  color: mode === "dark" ? "white" : "#2d3748",
                }}
              >
                <option value="">Select Category</option>
                {uniqueCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Price Filter */}
              <select
  value={filterPrice}
  onChange={(e) => setFilterPrice(e.target.value)}
  className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 text-sm focus:ring-2 focus:ring-indigo-600"
  style={{
    backgroundColor: mode === "dark" ? "rgb(64 66 70)" : "#fff",
    color: mode === "dark" ? "white" : "#2d3748",
  }}
>
  <option value="">Best Match</option>
  <option value="lth">Price: Low to High</option>
  <option value="htl">Price: High to Low</option>
</select>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter  ;
