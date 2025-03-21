
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
  static async ensureOrdersTableExists(): Promise<{ success: boolean; error?: string }> {
    if (!supabase) {
      console.warn("Supabase not configured, cannot create tables");
      return { success: false, error: "Supabase not configured" };
    }

    try {
      // Call the RPC function to create the table and set up policies
      const { data, error: rpcError } = await supabase.rpc('create_orders_table');
      
      if (rpcError) {
        console.error("Failed to create/update orders table:", rpcError);
        return { success: false, error: rpcError.message };
      }
      
      console.log("Orders table exists or was created with result:", data);
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
      
      // Try all available methods to call the Edge Function
      const methods = [
        async () => {
          // Method 1: Use supabase.functions.invoke
          console.log(`About to invoke Edge Function 'send-order-email' with order ID: ${orderId}`);
          const functionResponse = await supabase.functions.invoke('send-order-email', {
            body: { orderId }
          });
          return functionResponse;
        },
        async () => {
          // Method 2: Use fetch with proper CORS headers
          const functionUrl = `${supabaseUrl}/functions/v1/send-order-email`;
          console.log(`Attempting to call Edge Function directly via fetch at: ${functionUrl}`);
          
          const response = await fetch(functionUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${supabaseKey}`,
              'apikey': supabaseKey,
              'Accept': 'application/json',
              'X-Client-Info': 'supabase-js/2.x'
            },
            body: JSON.stringify({ orderId }),
            mode: 'cors',
            credentials: 'include'
          });
          
          if (!response.ok) {
            console.error("Direct fetch failed with status:", response.status, response.statusText);
            throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
          }
          
          const data = await response.json();
          return { data, error: null };
        }
      ];
      
      let lastError = null;
      
      // Try each method in sequence
      for (const method of methods) {
        try {
          const result = await method();
          
          if (result.error) {
            console.error("Method failed with error:", result.error);
            lastError = result.error;
            continue; // Try the next method
          }
          
          console.log("Edge Function response:", JSON.stringify(result.data, null, 2));
          
          if (result.data && result.data.success === false) {
            console.error("Edge Function reported failure:", result.data.error);
            return { success: false, error: result.data.error, details: result.data };
          }
          
          console.log("Email notification request processed successfully with response:", result.data);
          return { success: true, details: result.data };
        } catch (error) {
          console.error("Method failed with exception:", error);
          lastError = error;
          // Continue to the next method
        }
      }
      
      // All methods failed, return the last error
      return { 
        success: true,  // Consider this a soft failure - order is saved even if email fails
        error: lastError ? (lastError as Error).message : "All notification methods failed",
        details: lastError
      };
    } catch (error) {
      console.error("Exception invoking Edge Function:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      
      // For this specific use case, we'll consider the order process successful 
      // even if email notification fails
      return { success: true, error: (error as Error).message, details: error };
    }
  }
}
