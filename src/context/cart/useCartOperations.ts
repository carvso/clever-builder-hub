
import { useReducer } from "react";
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

  return {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    checkout
  };
};
