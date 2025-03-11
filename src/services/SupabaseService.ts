
import { createClient } from '@supabase/supabase-js'
import { Order } from '@/types/order';

// Get environment variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create the Supabase client with proper error handling
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
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
  static async ensureOrdersTableExists(): Promise<{ success: boolean; error?: string }> {
    if (!supabase) {
      console.warn("Supabase not configured, cannot create tables");
      return { success: false, error: "Supabase not configured" };
    }

    try {
      // Check if the orders table exists
      const { data: tableExists, error: checkError } = await supabase
        .from('orders')
        .select('id')
        .limit(1);
      
      if (checkError && checkError.code === '42P01') { // PostgreSQL error code for undefined_table
        console.log("Orders table doesn't exist, attempting to create it");
        
        // Table doesn't exist, create it using PostgreSQL via RPC
        // This requires appropriate permissions on the service role
        const { error: createError } = await supabase.rpc('create_orders_table');
        
        if (createError) {
          console.error("Failed to create orders table:", createError);
          return { success: false, error: createError.message };
        }
        
        console.log("Orders table created successfully");
        return { success: true };
      } else if (checkError) {
        console.error("Error checking orders table:", checkError);
        return { success: false, error: checkError.message };
      }
      
      // Table exists
      console.log("Orders table exists");
      return { success: true };
    } catch (error) {
      console.error("Exception checking/creating orders table:", error);
      return { success: false, error: (error as Error).message };
    }
  }

  /**
   * Save order to Supabase database
   */
  static async saveOrder(order: Order): Promise<{ success: boolean; error?: string; orderId?: string }> {
    // Check if Supabase is configured
    if (!supabase) {
      console.warn("Supabase not configured, running in mock mode");
      return { success: true, orderId: `mock-${Date.now()}` };
    }

    try {
      console.log("Saving order to Supabase:", order);
      
      // Validate the order format
      if (!order.customer || !order.items || !Array.isArray(order.items)) {
        throw new Error("Invalid order format: missing customer or items data");
      }

      // Format the order object to match Supabase's expected format
      const orderData = {
        customer_info: order.customer,
        items: order.items,
        total: order.total,
        total_with_iva: order.totalWithIva,
        order_date: order.orderDate,
        status: order.status,
        notes: order.notes || null
      };
      
      console.log("Formatted order data for Supabase:", orderData);
      
      const { data, error } = await supabase
        .from('orders')
        .insert(orderData)
        .select('id')
        .single();
      
      if (error) {
        console.error("Error saving order to Supabase:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        
        // If the error is due to missing table, try to create it
        if (error.code === '42P01') {
          const tableCreation = await SupabaseService.ensureOrdersTableExists();
          if (tableCreation.success) {
            // Retry saving the order
            console.log("Retrying order save after table creation");
            const retryResult = await supabase
              .from('orders')
              .insert(orderData)
              .select('id')
              .single();
              
            if (retryResult.error) {
              console.error("Error on retry:", retryResult.error);
              return { success: false, error: retryResult.error.message };
            }
            
            console.log("Order saved successfully on retry:", retryResult.data);
            return { success: true, orderId: retryResult.data.id };
          }
        }
        
        return { success: false, error: error.message };
      }
      
      console.log("Order saved successfully:", data);
      return { success: true, orderId: data.id };
    } catch (error) {
      console.error("Exception saving order:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      return { success: false, error: (error as Error).message };
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
   * Send email notification for an order via Brevo SMTP
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
      
      // Call the Edge Function with detailed logging
      console.log(`About to invoke Edge Function 'send-order-email' with order ID: ${orderId}`);
      const functionResponse = await supabase.functions.invoke('send-order-email', {
        body: { orderId }
      });
      
      const { data, error } = functionResponse;
      
      if (error) {
        console.error("Error invoking Edge Function:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        return { success: false, error: error.message, details: error };
      }
      
      console.log("Edge Function response:", JSON.stringify(data, null, 2));
      
      if (data && data.success === false) {
        console.error("Edge Function reported failure:", data.error);
        return { success: false, error: data.error, details: data };
      }
      
      console.log("Email notification request processed successfully with response:", data);
      return { success: true, details: data };
    } catch (error) {
      console.error("Exception invoking Edge Function:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      return { success: false, error: (error as Error).message, details: error };
    }
  }
}
