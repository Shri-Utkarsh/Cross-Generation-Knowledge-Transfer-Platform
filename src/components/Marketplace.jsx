const Marketplace = ({ products, onBuy }) => {
  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">🛒 Marketplace</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-xl p-6 rounded-2xl flex flex-col justify-between h-full"
          >
            <div>
              <img
                src={item.image || "https://via.placeholder.com/200"}
                alt={item.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-lg text-green-500 font-semibold mb-4">{item.price}</p>
            </div>
            <button
              onClick={() => onBuy(item)}
              className="w-full mt-auto bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg text-lg font-semibold transition duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Marketplace;
