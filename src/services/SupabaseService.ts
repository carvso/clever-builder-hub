
import { createClient } from '@supabase/supabase-js'
import { Order } from '@/types/order';

// Get environment variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create the Supabase client with proper error handling
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export class SupabaseService {
  /**
   * Check if Supabase is properly configured
   */
  static isConfigured(): boolean {
    return !!supabase;
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
      
      const { data, error } = await supabase
        .from('orders')
        .insert(order)
        .select('id')
        .single();
      
      if (error) {
        console.error("Error saving order to Supabase:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
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
   * Trigger Supabase Edge Function to send email notifications
   */
  static async sendOrderNotifications(orderId: string): Promise<{ success: boolean; error?: string }> {
    // Check if Supabase is configured
    if (!supabase) {
      console.warn("Supabase not configured, running in mock mode");
      return { success: true };
    }

    try {
      console.log("Invoking Edge Function to send email notifications for order:", orderId);
      
      // Validate the order ID
      if (!orderId) {
        throw new Error("Invalid order ID: cannot send notifications");
      }
      
      const { error } = await supabase.functions.invoke('send-order-notifications', {
        body: { orderId }
      });
      
      if (error) {
        console.error("Error invoking Edge Function:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        return { success: false, error: error.message };
      }
      
      console.log("Email notification sent successfully");
      return { success: true };
    } catch (error) {
      console.error("Exception invoking Edge Function:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      return { success: false, error: (error as Error).message };
    }
  }
}
