import axios from 'axios';

// Different bicycle-related images for variety
const uniqueImages = [
  "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1560072810-1cffb09fafa0?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1581798459217-8302c3d0d2d5?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1595280158699-56bf6f1d6e01?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1579149636625-d7e287d47056?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1581792175304-79e2c95f0e9c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1588345931591-b66bcb8302f7?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1595288035303-2ffb54d4ee4c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1588345931591-b66bcb8302f7?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1581798459217-8302c3d0d2d5?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1560072810-1cffb09fafa0?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1595280158699-56bf6f1d6e01?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1579149636625-d7e287d47056?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1581792175304-79e2c95f0e9c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1588345931591-b66bcb8302f7?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1595288035303-2ffb54d4ee4c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1588345931591-b66bcb8302f7?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1581798459217-8302c3d0d2d5?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&q=80"
];

async function updateProducts() {
  try {
    // Get all products
    const response = await axios.get('https://6985988b6964f10bf253c4da.mockapi.io/users/1/product');
    const products = response.data;

    console.log(`Updating ${products.length} products with unique images...`);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      
      // Assign a unique image based on the index
      const newImage = uniqueImages[i % uniqueImages.length];
      
      // Update the product with the new image
      await axios.put(`https://6985988b6964f10bf253c4da.mockapi.io/users/1/product/${product.id}`, {
        ...product,
        cover: newImage
      });
      
      console.log(`Updated product ${i + 1}/${products.length}: ${product.titleEn || product.titleRu}`);
    }

    console.log('All products updated successfully!');
  } catch (error) {
    console.error('Error updating products:', error.message);
  }
}

updateProducts();