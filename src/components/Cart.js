import React, { useState, useEffect } from "react"
import { FaRupeeSign, FaTrash, FaMinus, FaPlus, FaInfoCircle } from "react-icons/fa"
import Modal from "react-modal"

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const [localCart, setLocalCart] = useState(cart)
  const [loading, setLoading] = useState(false)
  const [discountCode, setDiscountCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"))
    if (savedCart) {
      setLocalCart(savedCart)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(localCart))
  }, [localCart])

  const handleUpdateQuantity = (id, quantity) => {
    setLoading(true)
    updateQuantity(id, quantity)
    setLocalCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
    setLoading(false)
  }

  const handleRemoveFromCart = (id) => {
    setLoading(true)
    removeFromCart(id)
    setLocalCart((prevCart) => prevCart.filter((item) => item.id !== id))
    setLoading(false)
  }

  const total = localCart.reduce((sum, item) => sum + item.price * item.quantity * 82.23, 0) * (1 - discount / 100)

  const applyDiscountCode = () => {
    if (discountCode === "DISCOUNT10") {
      setDiscount(10)
    } else {
      alert("Invalid discount code")
    }
  }

  const openModal = (item) => {
    setSelectedItem(item)
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {localCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {localCart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">
                    <FaRupeeSign className="inline-block mr-1" />
                    {(item.price * 82.23).toFixed(2)}
                  </p>
                  <button onClick={() => openModal(item)} className="text-blue-500 hover:text-blue-700">
                    <FaInfoCircle className="inline-block mr-1" /> More Info
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 p-2 rounded-l"
                  disabled={item.quantity === 1}
                  aria-label="Decrease quantity"
                >
                  <FaMinus />
                </button>
                <span className="bg-gray-100 py-2 px-4">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 p-2 rounded-r"
                  aria-label="Increase quantity"
                >
                  <FaPlus />
                </button>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                  aria-label="Remove item"
                >
                  <FaTrash />
                </button>
                {loading && <span className="ml-2">Loading...</span>}
              </div>
            </div>
          ))}
          <div className="mt-6">
            <p className="text-xl font-bold">
              Total: <FaRupeeSign className="inline-block mr-1" />
              {total.toFixed(2)}
            </p>
            <div className="flex items-center mt-4">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Discount code"
                className="border p-2 rounded"
                aria-label="Discount code"
              />
              <button
                onClick={applyDiscountCode}
                className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                aria-label="Apply discount code"
              >
                Apply
              </button>
            </div>
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors duration-200 w-full">
              Checkout
            </button>
          </div>
        </>
      )}
      {modalIsOpen && selectedItem && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false}>
          <h2 className="text-2xl font-bold mb-4">{selectedItem.name}</h2>
          <img src={selectedItem.image || "/placeholder.svg"} alt={selectedItem.name} className="mb-4" />
          <p>{selectedItem.description}</p>
          <button onClick={closeModal} className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors duration-200">
            Close
          </button>
        </Modal>
      )}
    </div>
  )
}

export default Cart