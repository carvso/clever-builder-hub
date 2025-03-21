
import { Order } from "@/types/order";
import { SupabaseService } from "./SupabaseService";

/**
 * Service for sending email notifications about orders
 */
export class NotificationService {
  /**
   * Process a new order - saves to Supabase and sends email notifications
   */
  static async processNewOrder(orderData: Order): Promise<{ success: boolean; orderId?: string; error?: string; details?: any }> {
    try {
      console.log("Processing new order:", orderData);
      
      // Check if Supabase is configured
      if (!SupabaseService.isConfigured()) {
        console.error("Supabase is not configured properly. Email notifications will not be sent.");
        console.error("Make sure you've set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.");
        console.error("Current environment values:", {
          SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? "Set" : "Not set",
          SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? "Set" : "Not set"
        });
        
        // Even if Supabase isn't configured, we'll continue in mock mode
      }
      
      // Ensure orders table exists if Supabase is configured
      if (SupabaseService.isConfigured()) {
        const tableCheck = await SupabaseService.ensureOrdersTableExists();
        if (!tableCheck.success) {
          console.warn("Warning: Could not verify orders table exists:", tableCheck.error);
          // We continue anyway, as the saveOrder method will attempt to handle this
        }
      }
      
      // Step 1: Save the order to Supabase
      const saveResult = await SupabaseService.saveOrder(orderData);
      if (!saveResult.success) {
        console.error("Failed to save order:", saveResult.error);
        return { success: false, error: `Errore nel salvataggio dell'ordine: ${saveResult.error}` };
      }
      
      // Step 2: Trigger email notifications via Supabase Edge Function
      if (saveResult.orderId) {
        console.log(`Order saved with ID ${saveResult.orderId}, now sending email notification`);
        console.log("TEST MODE: All emails will be sent to vcarusobusiness@gmail.com only");
        const notifyResult = await SupabaseService.sendOrderEmailNotification(saveResult.orderId);
        
        if (!notifyResult.success) {
          console.warn("Order saved but email notifications failed:", notifyResult.error);
          console.warn("Notification error details:", JSON.stringify(notifyResult.details, null, 2));
          // We continue even if notifications fail, since the order is saved
          return { 
            success: true, 
            orderId: saveResult.orderId, 
            error: "Ordine salvato ma l'invio dell'email ha avuto problemi.",
            details: notifyResult.details
          };
        }
        
        console.log("Order processed and notifications sent successfully");
        return { success: true, orderId: saveResult.orderId, details: notifyResult.details };
      }
      
      return { success: true, orderId: saveResult.orderId };
    } catch (error) {
      console.error("Error processing order:", error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Format order data into a readable email message
   */
  static formatOrderMessage(orderData: Order): string {
    if (!orderData || !orderData.items || !Array.isArray(orderData.items)) {
      console.error("Invalid order data format:", orderData);
      return "Nuovo ordine ricevuto (dati non disponibili)";
    }
    
    try {
      const itemsList = orderData.items.map((item) => 
        `- ${item.name || 'Prodotto'} (${item.quantity || 0}x) - ${item.price || '0.00'}`
      ).join('\n');
      
      return `
        Nuovo ordine da EdilP2!
        
        Cliente: ${orderData.customer?.name || 'N/A'}
        Email: ${orderData.customer?.email || 'N/A'}
        Telefono: ${orderData.customer?.phone || 'N/A'}
        Data: ${new Date(orderData.orderDate).toLocaleString('it-IT')}
        
        ARTICOLI:
        ${itemsList}
        
        Totale: €${(orderData.total || 0).toFixed(2)}
        Totale con IVA (22%): €${((orderData.total || 0) * 1.22).toFixed(2)}
        ${orderData.notes ? `\nNote: ${orderData.notes}` : ''}
      `;
    } catch (error) {
      console.error("Error formatting order message:", error);
      return "Nuovo ordine ricevuto (errore nel formato)";
    }
  }
}
