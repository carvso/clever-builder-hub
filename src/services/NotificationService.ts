import { Order } from "@/types/order";
import { SupabaseService } from "./SupabaseService";

/**
 * Service for sending email notifications about orders
 */
export class NotificationService {
  /**
   * Process a new order - saves to Supabase and sends email notifications
   */
  static async processNewOrder(order: Order): Promise<{ success: boolean; orderId?: string; error?: string }> {
    try {
      console.log("Processing new order:", JSON.stringify(order, null, 2));
      
      // Save order to database
      const savedOrder = await SupabaseService.saveOrder(order);
      if (!savedOrder) {
        console.error("Failed to save order");
        return { success: false, error: "Impossibile salvare l'ordine" };
      }
      
      console.log("Order saved with ID", savedOrder.id, ", now sending email notification");
      
      // In test mode, all emails will be sent to vcarusobusiness@gmail.com only
      console.log("TEST MODE: All emails will be sent to vcarusobusiness@gmail.com only");
      
      // Send email notification
      const emailResult = await SupabaseService.sendOrderEmailNotification(savedOrder.id);
      console.log("Email notification result:", emailResult);
      
      // Consider the operation successful even if email fails
      return { 
        success: true, 
        orderId: savedOrder.id,
        error: emailResult.error 
      };
    } catch (error) {
      console.error("Error processing order:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Errore sconosciuto durante l'elaborazione dell'ordine" 
      };
    }
  }

  /**
   * Test the Edge Function with a mock order
   */
  static async testEdgeFunction(): Promise<void> {
    try {
      console.log("Testing Edge Function with mock order...");
      
      // Create a mock order
      const mockOrder: Order = {
        customer: {
          name: "Test Customer",
          email: "test@example.com",
          phone: "1234567890"
        },
        items: [
          {
            name: "Test Product",
            quantity: 1,
            price: "10.00"
          }
        ],
        total: 10,
        totalWithIva: 12.2,
        orderDate: new Date().toISOString(),
        status: 'pending',
        notes: "This is a test order"
      };

      // Save the mock order first
      console.log("Saving mock order...");
      const result = await this.processNewOrder(mockOrder);
      
      if (!result.success) {
        console.error("Failed to save mock order:", result.error);
        return;
      }

      console.log("Mock order saved with ID:", result.orderId);
    } catch (error) {
      console.error("Error testing Edge Function:", error);
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
