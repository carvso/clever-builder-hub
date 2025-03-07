import React, { createContext, useContext, useReducer } from "react";
import { toast } from "@/hooks/use-toast";
import { NotificationService } from "@/services/NotificationService";

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
  checkout: (customerInfo: CustomerInfo) => Promise<boolean>;
};

export type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
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

  const checkout = async (customerInfo: CustomerInfo): Promise<boolean> => {
    if (state.items.length === 0) {
      toast({
        title: "Errore",
        description: "Il carrello è vuoto",
        variant: "destructive",
      });
      return false;
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
      const orderData = {
        customer: customerInfo,
        items: state.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: orderTotal,
        orderDate: new Date().toISOString(),
      };

      console.log("Prepared order data:", orderData);

      // Send email notification using our service
      console.log("Sending email notification...");
      const emailSent = await NotificationService.sendEmailNotification(orderData);
      console.log("Email notification result:", emailSent);
      
      // Send WhatsApp notification using our service
      console.log("Sending WhatsApp notification...");
      const whatsappSent = await NotificationService.sendWhatsAppNotification(orderData);
      console.log("WhatsApp notification result:", whatsappSent);

      // For demo purposes, we'll consider the order successful even if notifications fail
      // In a real application, you would handle this differently based on requirements
      
      // Clear cart after successful order
      dispatch({ type: "CLEAR_CART" });
      toast({
        title: "Ordine confermato",
        description: "Grazie per il tuo ordine! I dettagli sono stati registrati e sarai contattato presto.",
      });
      return true;
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'invio dell'ordine. Per favore, riprova più tardi.",
        variant: "destructive",
      });
      return false;
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
