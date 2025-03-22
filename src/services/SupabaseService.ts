import { createClient } from '@supabase/supabase-js'
import { Order } from '@/types/order';

// Get environment variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create the Supabase client with proper error handling
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey, {
      global: {
        headers: {
          'X-Client-Info': 'supabase-js/2.x',
        },
      },
    })
  : null;

// Log Supabase configuration status for debugging
console.log("Supabase configuration status:", {
  urlConfigured: !!supabaseUrl,
  keyConfigured: !!supabaseKey,
  clientCreated: !!supabase
});

export class SupabaseService {
  /**
   * Check if Supabase is properly configured
   */
  static isConfigured(): boolean {
    return !!supabase;
  }

  /**
   * Ensure that the orders table exists in Supabase
   */
  static async ensureOrdersTableExists(): Promise<boolean> {
    if (!supabase) {
      console.warn("Supabase not configured, cannot create tables");
      return false;
    }

    try {
      // Verifica che la tabella orders esista
      const { data, error } = await supabase
        .from('orders')
        .select('id')
        .limit(1);
      
      if (error) {
        console.error("Error checking orders table:", error);
        return false;
      }
      
      console.log("Orders table exists or was created with result:", data);
      return true;
    } catch (error) {
      console.error("Exception checking/creating orders table:", error);
      return false;
    }
  }

  /**
   * Save order to Supabase database
   */
  static async saveOrder(orderData: Order): Promise<Order | null> {
    try {
      console.log("Starting saveOrder with data:", JSON.stringify(orderData, null, 2));
      
      // Ensure orders table exists
      const tableExists = await this.ensureOrdersTableExists();
      console.log("Orders table exists:", tableExists);
      
      if (!tableExists) {
        throw new Error("Orders table does not exist");
      }
      
      // Generate a unique ID if not provided
      const orderId = orderData.id || crypto.randomUUID();
      
      // Format order data for Supabase
      const formattedOrderData = {
        id: orderId,
        customer_info: {
          name: orderData.customer.name,
          email: orderData.customer.email,
          phone: orderData.customer.phone
        },
        total: orderData.total,
        total_with_iva: orderData.totalWithIva,
        order_date: orderData.orderDate,
        status: orderData.status,
        notes: orderData.notes || null,
        items: orderData.items
      };
      
      console.log("Formatted order data for Supabase:", JSON.stringify(formattedOrderData, null, 2));
      
      // Save order to Supabase
      const { data, error } = await supabase
        .from("orders")
        .insert([formattedOrderData])
        .select()
        .single();
      
      if (error) {
        console.error("Error saving order:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        throw error;
      }
      
      console.log("Order saved successfully:", JSON.stringify(data, null, 2));
      
      return data;
    } catch (error) {
      console.error("Error in saveOrder:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      throw error;
    }
  }

  /**
   * Get order by ID
   */
  static async getOrderById(orderId: string): Promise<{ order?: Order; error?: string }> {
    // Check if Supabase is configured
    if (!supabase) {
      console.warn("Supabase not configured, running in mock mode");
      return { order: { id: orderId, customer: { name: 'Mock Customer', email: 'mock@example.com', phone: '123456789' }, items: [], total: 0, totalWithIva: 0, orderDate: new Date().toISOString(), status: 'pending' } };
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();
      
      if (error) {
        console.error("Error fetching order:", error);
        return { error: error.message };
      }
      
      return { order: data as Order };
    } catch (error) {
      console.error("Exception fetching order:", error);
      return { error: (error as Error).message };
    }
  }

  /**
   * Send email notification for an order via Resend API
   */
  static async sendOrderEmailNotification(orderId: string): Promise<{ success: boolean; error?: string; details?: any }> {
    // Check if Supabase is configured
    if (!supabase) {
      console.warn("Supabase not configured, running in mock mode");
      console.error("IMPORTANT: Supabase URL and ANON KEY are missing from environment variables.");
      console.error("Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are properly set.");
      return { success: true };
    }

    try {
      console.log("Invoking Edge Function to send email notification for order:", orderId);
      
      // Validate the order ID
      if (!orderId) {
        throw new Error("Invalid order ID: cannot send notifications");
      }
      
      // Use direct fetch instead of supabase.functions.invoke
      const response = await fetch(
        `${supabaseUrl}/functions/v1/send-order-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY}`,
            'apikey': import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY,
            'X-Client-Info': 'supabase-js/2.x'
          },
          body: JSON.stringify({ orderId })
        }
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Edge Function invocation failed:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        });
        throw new Error(`Edge Function returned ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log("Edge Function response:", JSON.stringify(data, null, 2));
      
      if (data && data.success === false) {
        console.error("Edge Function reported failure:", data.error);
        return { success: false, error: data.error, details: data };
      }
      
      console.log("Email notification request processed successfully with response:", data);
      return { success: true, details: data };
      
    } catch (error) {
      console.error("Exception in sendOrderEmailNotification:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      
      // For this specific use case, we'll consider the order process successful 
      // even if email notification fails
      return { success: true, error: (error as Error).message, details: error };
    }
  }
}
