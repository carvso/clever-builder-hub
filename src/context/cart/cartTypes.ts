
import { Customer } from "@/types/order";

export type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  quantity: number;
  image: string;
};

export type CartItem = Product;

export type CartState = {
  items: CartItem[];
  total: number;
  isSubmitting: boolean;
};

export type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_SUBMITTING"; payload: boolean };

export type CartContextType = {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  checkout: (customerInfo: Customer, notes?: string) => Promise<{ success: boolean; orderId?: string }>;
};
