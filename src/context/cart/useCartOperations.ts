import { useReducer, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { cartReducer } from "./cartReducer";
import { CartState, Product } from "./cartTypes";
import { Customer, Order } from "@/types/order";
import { NotificationService } from "@/services/NotificationService";
import { calculateOrderTotal } from "./cartUtils";

export const useCartOperations = () => {
  const [state, dispatch] = useReducer(cartReducer, { 
    items: [], 
    total: 0,
    isSubmitting: false 
  });

  // Usiamo un ref per tenere traccia dell'ultimo prodotto aggiunto
  const lastAddedProduct = useRef<number | null>(null);

  const addItem = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
    
    // Mostra la notifica solo se è un prodotto diverso dall'ultimo aggiunto
    if (lastAddedProduct.current !== product.id) {
      toast({
        title: "Articolo aggiunto",
        description: `${product.name} è stato aggiunto al carrello`,
      });
      lastAddedProduct.current = product.id;
    }
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
      return { success: false };
    }

    try {
      dispatch({ type: "SET_SUBMITTING", payload: true });
      console.log("Starting checkout process with customer info:", customerInfo);
      
      // Calculate order total
      const orderTotal = calculateOrderTotal(state.items);

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
      
      if (result) {
        console.log("Order processed successfully");
        
        // Clear cart after successful order
        dispatch({ type: "CLEAR_CART" });
        
        return { success: true, orderId: orderData.orderDate };
      } else {
        console.error("Order processing failed");
        return { success: false };
      }
    } catch (error) {
      console.error("Checkout error:", error);
      return { success: false };
    } finally {
      dispatch({ type: "SET_SUBMITTING", payload: false });
    }
  };

  return {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    checkout,
  };
};
