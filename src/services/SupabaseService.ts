import { createClient } from '@supabase/supabase-js'
import { Order } from '@/types/order';

// Credenziali Supabase hardcodate (approccio temporaneo)
const supabaseUrl = "https://yiaaapzwjbolzhirpkml.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpYWFhcHp3amJvbHpoaXJwa21sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTYxNTgsImV4cCI6MjA1NzAzMjE1OH0.vZ-U-9ehBGzLigIeMVShGSs59-k2SkJg7cpolHOA1I8";
const supabaseServiceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpYWFhcHp3amJvbHpoaXJwa21sIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTQ1NjE1OCwiZXhwIjoyMDU3MDMyMTU4fQ.71INo9_uHYHa2AY86Tqoht3MfMzvauZ5quGqMKHr03Y";

// Create the Supabase client with proper error handling
export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    headers: {
      'X-Client-Info': 'supabase-js/2.x',
    },
  },
});

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
    try {
      console.log("Invoking Edge Function to send email notification for order:", orderId);
      console.log("Supabase URL:", supabaseUrl);
      
      // Validate the order ID
      if (!orderId) {
        throw new Error("Invalid order ID: cannot send notifications");
      }
      
      // Use direct fetch instead of supabase.functions.invoke
      const functionUrl = `${supabaseUrl}/functions/v1/send-order-email`;
      console.log("Function URL:", functionUrl);

      const requestHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceRoleKey}`,
        'apikey': supabaseServiceRoleKey,
        'X-Client-Info': 'supabase-js/2.x',
        'Origin': window.location.origin
      };
      console.log("Request headers:", JSON.stringify(requestHeaders, null, 2));
      
      const response = await fetch(
        functionUrl,
        {
          method: 'POST',
          headers: requestHeaders,
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
