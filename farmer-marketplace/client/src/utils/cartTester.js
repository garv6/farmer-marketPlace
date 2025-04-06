/**
 * Cart Functionality Test Script
 * This script tests the cart functionality by simulating adding products to the cart
 * and verifying that the cart is updated correctly.
 */

// Test product data
const testProducts = [
  {
    id: 'test-product-1',
    name: 'Organic Apples',
    price: 3.99,
    image: 'https://via.placeholder.com/150',
    description: 'Fresh organic apples from local farms'
  },
  {
    id: 'test-product-2',
    name: 'Farm Fresh Eggs',
    price: 5.49,
    image: 'https://via.placeholder.com/150',
    description: 'Free-range eggs from happy chickens'
  },
  {
    id: 'test-product-3',
    name: 'Organic Honey',
    price: 8.99,
    image: 'https://via.placeholder.com/150',
    description: 'Pure, raw honey from local beekeepers'
  }
];

/**
 * Clears the cart in localStorage
 */
function clearCart() {
  try {
    localStorage.removeItem('cart');
    console.log('✅ Cart cleared successfully');
    return true;
  } catch (error) {
    console.error('❌ Failed to clear cart:', error);
    return false;
  }
}

/**
 * Adds a product to the cart
 * @param {Object} product - The product to add to the cart
 */
function addProductToCart(product) {
  try {
    // Create a standardized cart item
    const cartItem = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price) || 0,
      image: product.image || '',
      quantity: 1
    };
    
    // Get current cart from localStorage
    let cart = [];
    try {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        cart = JSON.parse(cartData);
        if (!Array.isArray(cart)) {
          console.error('Cart is not an array:', cart);
          cart = [];
        }
      }
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      cart = [];
    }
    
    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === cartItem.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if product already exists
      cart[existingItemIndex].quantity += 1;
      console.log(`✅ Updated quantity for ${product.name} in cart`);
    } else {
      // Add new item to cart
      cart.push(cartItem);
      console.log(`✅ Added ${product.name} to cart`);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
    
    return true;
  } catch (error) {
    console.error(`❌ Failed to add ${product.name} to cart:`, error);
    return false;
  }
}

/**
 * Gets the current cart from localStorage
 * @returns {Array} The cart items
 */
function getCart() {
  try {
    const cartData = localStorage.getItem('cart');
    if (!cartData) {
      console.log('Cart is empty');
      return [];
    }
    
    const cart = JSON.parse(cartData);
    console.log('✅ Current cart:', cart);
    return cart;
  } catch (error) {
    console.error('❌ Failed to get cart:', error);
    return [];
  }
}

/**
 * Runs a complete test of the cart functionality
 */
function runCartTest() {
  console.log('🔍 Starting cart functionality test...');
  
  // Clear the cart first
  clearCart();
  
  // Add each test product to the cart
  testProducts.forEach(product => {
    addProductToCart(product);
  });
  
  // Get the updated cart
  const cart = getCart();
  
  // Verify cart contents
  if (cart.length === testProducts.length) {
    console.log(`✅ Cart contains ${cart.length} items as expected`);
  } else {
    console.error(`❌ Cart contains ${cart.length} items, expected ${testProducts.length}`);
  }
  
  // Check if cart update event is working
  console.log('🔄 Testing cart update event...');
  let eventReceived = false;
  
  const handleCartUpdate = () => {
    console.log('✅ Cart update event received');
    eventReceived = true;
  };
  
  window.addEventListener('cartUpdated', handleCartUpdate);
  
  // Add another product to trigger the event
  addProductToCart(testProducts[0]);
  
  // Clean up event listener
  window.removeEventListener('cartUpdated', handleCartUpdate);
  
  if (eventReceived) {
    console.log('✅ Cart update event is working correctly');
  } else {
    console.error('❌ Cart update event is not working');
  }
  
  console.log('🏁 Cart functionality test completed');
}

// Export functions for use in other files
export { clearCart, addProductToCart, getCart, runCartTest };
