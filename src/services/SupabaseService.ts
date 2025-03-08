
import { createClient } from '@supabase/supabase-js'
import { Order } from '@/types/order';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

export class SupabaseService {
  /**
   * Save order to Supabase database
   */
  static async saveOrder(order: Order): Promise<{ success: boolean; error?: string; orderId?: string }> {
    try {
      console.log("Saving order to Supabase:", order);
      
      const { data, error } = await supabase
        .from('orders')
        .insert(order)
        .select('id')
        .single();
      
      if (error) {
        console.error("Error saving order to Supabase:", error);
        return { success: false, error: error.message };
      }
      
      console.log("Order saved successfully:", data);
      return { success: true, orderId: data.id };
    } catch (error) {
      console.error("Exception saving order:", error);
      return { success: false, error: (error as Error).message };
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
        return { error: error.message };
      }
      
      return { order: data as Order };
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  /**
   * Trigger Supabase Edge Function to send notifications
   */
  static async sendOrderNotifications(orderId: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log("Invoking Edge Function to send notifications for order:", orderId);
      
      const { data, error } = await supabase.functions.invoke('send-order-notifications', {
        body: { orderId }
      });
      
      if (error) {
        console.error("Error invoking Edge Function:", error);
        return { success: false, error: error.message };
      }
      
      console.log("Notifications sent successfully:", data);
      return { success: true };
    } catch (error) {
      console.error("Exception invoking Edge Function:", error);
      return { success: false, error: (error as Error).message };
    }
  }
}
