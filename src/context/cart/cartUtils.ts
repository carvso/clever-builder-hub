
import { CartItem } from "./cartTypes";

export const calculateOrderTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    // Handle different price formats (€10.99, 10,99€, 10.99, etc.)
    let price: number;
    try {
      // First remove currency symbols and spaces
      const priceString = item.price.replace(/[^\d,.]/g, '');
      // Replace comma with dot for decimal point
      const normalizedPrice = priceString.replace(',', '.');
      price = parseFloat(normalizedPrice);
      
      // If price is NaN, throw an error
      if (isNaN(price)) {
        console.error(`Invalid price format: ${item.price}, parsed as: ${price}`);
        price = 0;
      }
    } catch (error) {
      console.error(`Error parsing price: ${item.price}`, error);
      price = 0;
    }
    
    return total + price * item.quantity;
  }, 0);
};
