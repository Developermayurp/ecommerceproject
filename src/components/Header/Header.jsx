import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Logo from "../../assets/Logo/online-shop-e-commerce-logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeCart, updateQuantity } from "../../redux/slice/CartSlice";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const cart = useSelector((state) => state.cart?.cart || []);
  const dispatch = useDispatch();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = () => {
    navigate(`/product/filter?search=${searchText}`);
  };

  const handleQuantityChange = (product_id, value) => {
    const quantity = Number(value);
    if (quantity > 0) {
      dispatch(updateQuantity({ product_id, quantity }));
    }
  };

  const handleRemove = (product_id) => {
    dispatch(removeCart({ product_id }));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <header className="bg-white shadow-md p-4 md:px-6 flex items-center justify-between sticky top-0 z-50">
        <Link to="/">
          <div className="flex items-center space-x-4">
            <img src={Logo} alt="bazzar" className="h-10 w-auto" />
            <p className="text-lg font-bold">E-bazzar</p>
          </div>
        </Link>

        <div className="hidden md:flex flex-1 mx-44">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />
          <button
            onClick={handleSearch}
            className="bg-[#324C85] py-1 px-3 mx-2 text-white rounded-lg "
          >
            search
          </button>
        </div>

        <nav className="hidden md:flex space-x-6 text-gray-700 items-center">
          <Link to="/" className="hover:text-[#324C85] transition">
            Home
          </Link>
          <Link
            to="/product/wishlist"
            className="hover:text-[#324C85] transition"
          >
            <FaRegHeart className="text-2xl" />
          </Link>
          <button
            className="relative hover:text-[#324C85] transition"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
          >
            <FaShoppingCart className="text-2xl" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cart.length}
              </span>
            )}
          </button>
          <Link
            to="/product/wishlist"
            className="hover:text-[#324C85] transition"
          >
            <CgProfile className="text-2xl" />
          </Link>
        </nav>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button
            className="relative"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
          >
            <FaShoppingCart className="text-2xl text-[#324C85]" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cart.length}
              </span>
            )}
          </button>
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <AiOutlineClose size={28} className="text-[#324C85]" />
            ) : (
              <AiOutlineMenu size={28} className="text-[#324C85]" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div
            className={`absolute top-16 left-0 w-full bg-white shadow-md md:hidden 
                transition-all duration-300 ease-in-out 
                transform origin-top scale-y-100 opacity-100 
                animate-slide-down`}
          >
            <ul className="flex flex-col items-end space-y-2 p-4 text-gray-700 w-full text-end rounded-md">
              <Link to="/">
                <li className="w-full hover:bg-gray-200 active:bg-gray-200 transition">
                  <p className="block w-full p-2 hover:text-[#324C85]">Home</p>
                </li>
              </Link>
              <Link to="/product/wishlist">
                <li className="w-full hover:bg-gray-200 active:bg-gray-200 transition">
                  <p className="block w-full p-2 hover:text-[#324C85]">
                    Wishlist
                  </p>
                </li>
              </Link>
              <li className="w-full hover:bg-gray-200 active:bg-gray-200 transition">
                <a href="#" className="block w-full p-2 hover:text-[#324C85]">
                  Login/Signup
                </a>
              </li>
            </ul>

            {/* Mobile Search Bar */}
            <div className="px-4 mb-2">
              <input
                type="text"
                placeholder="Search for products, brands and more"
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#324C85] transition"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#324C85] py-1 px-3 mx-2 text-white rounded-lg mb-2"
            >
              search
            </button>
          </div>
        )}
      </header>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 "
            onClick={() => setIsCartOpen(false)}
          />
          {/* Drawer */}
          <div className="ml-auto w-full max-w-md bg-white h-full shadow-lg flex flex-col z-50">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">Cart</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <AiOutlineClose size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex items-center bg-white shadow rounded p-2"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-contain mr-2"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.title}</p>
                        <p className="text-customRed font-bold text-sm">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="flex items-center mt-1">
                          <label className="mr-1 text-xs">Qty:</label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.product_id,
                                e.target.value
                              )
                            }
                            className="w-12 border rounded px-1 py-0.5 text-xs"
                          />
                        </div>
                      </div>
                      <button
                        className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                        onClick={() => handleRemove(item.product_id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t">
              <div className="text-right font-bold text-lg">
                Total: ${total.toFixed(2)}
              </div>
              {/* Add checkout button or other actions here if needed */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
