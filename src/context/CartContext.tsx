import React, { createContext, useContext, useReducer, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { NotificationService } from "@/services/NotificationService";
import { Customer, Order } from "@/types/order";

type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  quantity: number;
  image: string;
};

type CartItem = Product;

type CartState = {
  items: CartItem[];
  total: number;
  isSubmitting: boolean;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_SUBMITTING"; payload: boolean };

type CartContextType = {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  checkout: (customerInfo: Customer, notes?: string) => Promise<{ success: boolean; orderId?: string }>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };
    case "SET_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.payload,
      };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(cartReducer, { 
    items: [], 
    total: 0,
    isSubmitting: false 
  });

  const addItem = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
    toast({
      title: "Articolo aggiunto",
      description: `${product.name} è stato aggiunto al carrello`,
    });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const checkout = async (customerInfo: Customer, notes?: string): Promise<{ success: boolean; orderId?: string }> => {
    if (state.items.length === 0) {
      toast({
        title: "Errore",
        description: "Il carrello è vuoto",
        variant: "destructive",
      });
      return { success: false };
    }

    try {
      dispatch({ type: "SET_SUBMITTING", payload: true });
      console.log("Starting checkout process with customer info:", customerInfo);
      
      // Calculate order total
      const orderTotal = state.items.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^\d,.]/g, '').replace(',', '.'));
        return total + price * item.quantity;
      }, 0);

      console.log("Calculated order total:", orderTotal);

      // Prepare order data
      const orderData: Order = {
        customer: customerInfo,
        items: state.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: orderTotal,
        totalWithIva: orderTotal * 1.22,
        orderDate: new Date().toISOString(),
        status: 'pending',
        notes: notes
      };

      console.log("Prepared order data:", orderData);

      // Process order through NotificationService
      const result = await NotificationService.processNewOrder(orderData);
      
      if (result.success) {
        console.log("Order processed successfully, ID:", result.orderId);
        
        // Clear cart after successful order
        dispatch({ type: "CLEAR_CART" });
        
        toast({
          title: "Ordine confermato",
          description: "Il tuo ordine è stato registrato. Ti contatteremo presto per confermare i dettagli.",
        });
        
        return { success: true, orderId: result.orderId };
      } else {
        console.error("Order processing failed:", result.error);
        
        toast({
          title: "Errore",
          description: result.error || "Si è verificato un errore durante l'invio dell'ordine. Per favore, riprova più tardi.",
          variant: "destructive",
        });
        
        return { success: false };
      }
    } catch (error) {
      console.error("Checkout error:", error);
      
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'invio dell'ordine. Per favore, riprova più tardi.",
        variant: "destructive",
      });
      
      return { success: false };
    } finally {
      dispatch({ type: "SET_SUBMITTING", payload: false });
    }
  };

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, updateQuantity, clearCart, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
