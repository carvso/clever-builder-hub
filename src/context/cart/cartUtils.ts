
import { CartItem } from "./cartTypes";

export const calculateOrderTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^\d,.]/g, '').replace(',', '.'));
    return total + price * item.quantity;
  }, 0);
};
