
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Update allowed origins to be more permissive
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Credentials': 'true',
};

interface Customer {
  name: string;
  email: string;
  phone: string;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

interface Order {
  id?: string;
  customer: Customer;
  items: OrderItem[];
  total: number;
  totalWithIva: number;
  orderDate: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

// Function to format the order into a readable HTML message
function formatOrderHtml(order: Order): string {
  try {
    const itemsList = order.items.map((item) => 
      `<tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name || 'Prodotto'}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity || 0}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.price || '0.00'}</td>
      </tr>`
    ).join('');
    
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
        <h2 style="color: #4a5568; text-align: center;">Nuovo ordine da EdilP2!</h2>
        
        <div style="margin-bottom: 20px; padding: 15px; background-color: #f9fafb; border-radius: 5px;">
          <h3 style="margin-top: 0; color: #4a5568;">Informazioni Cliente</h3>
          <p><strong>Nome:</strong> ${order.customer?.name || 'N/A'}</p>
          <p><strong>Email:</strong> ${order.customer?.email || 'N/A'}</p>
          <p><strong>Telefono:</strong> ${order.customer?.phone || 'N/A'}</p>
          <p><strong>Data:</strong> ${new Date(order.orderDate).toLocaleString('it-IT')}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #4a5568;">Dettaglio Ordine</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f1f5f9;">
                <th style="padding: 10px; text-align: left;">Prodotto</th>
                <th style="padding: 10px; text-align: center;">Quantità</th>
                <th style="padding: 10px; text-align: right;">Prezzo</th>
              </tr>
            </thead>
            <tbody>
              ${itemsList}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Totale:</td>
                <td style="padding: 10px; text-align: right; font-weight: bold;">€${(order.total || 0).toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Totale con IVA (22%):</td>
                <td style="padding: 10px; text-align: right; font-weight: bold;">€${(order.totalWithIva || 0).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        ${order.notes ? `
        <div style="margin-bottom: 20px; padding: 15px; background-color: #f9fafb; border-radius: 5px;">
          <h3 style="margin-top: 0; color: #4a5568;">Note</h3>
          <p>${order.notes}</p>
        </div>
        ` : ''}
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #718096; font-size: 14px;">
          <p>Questo è un messaggio automatico. Non rispondere a questa email.</p>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Error formatting order HTML message:", error);
    return "<p>Nuovo ordine ricevuto (errore nel formato)</p>";
  }
}

// Function to format customer confirmation email in HTML
function formatCustomerConfirmationHtml(order: Order): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
      <h2 style="color: #4a5568; text-align: center;">Grazie per il tuo ordine!</h2>
      
      <p>Gentile ${order.customer.name},</p>
      
      <p>Abbiamo ricevuto la tua richiesta e la stiamo elaborando. Ti contatteremo presto per confermare i dettagli e organizzare il ritiro.</p>
      
      <div style="margin: 20px 0; padding: 15px; background-color: #f9fafb; border-radius: 5px;">
        <h3 style="margin-top: 0; color: #4a5568;">Riepilogo Ordine</h3>
        <p><strong>Numero Ordine:</strong> #${order.id}</p>
        <p><strong>Data:</strong> ${new Date(order.orderDate).toLocaleString('it-IT')}</p>
        <p><strong>Totale:</strong> €${(order.total || 0).toFixed(2)}</p>
        <p><strong>Totale con IVA (22%):</strong> €${(order.totalWithIva || 0).toFixed(2)}</p>
      </div>
      
      <p>Grazie per aver scelto EdilP2!</p>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #718096; font-size: 14px;">
        <p>Questo è un messaggio automatico. Non rispondere a questa email.</p>
      </div>
    </div>
  `;
}

// Function to send an email notification using Resend API
async function sendEmailNotification(order: Order): Promise<boolean> {
  try {
    console.log("Starting email notification process for order:", order.id);
    
    // Get Resend API key from environment variables
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const STORE_EMAIL = Deno.env.get("STORE_EMAIL") || "vcarusobusiness@gmail.com";
    
    if (!RESEND_API_KEY) {
      console.error("Resend API Key not found in environment variables");
      throw new Error("Resend API Key not found in environment variables");
    }
    
    console.log("Using Resend API Key (first few chars):", RESEND_API_KEY.substring(0, 5) + "...[hidden]");
    console.log("Store email:", STORE_EMAIL);
    
    // Format the message body
    const orderHtml = formatOrderHtml(order);
    console.log("Formatted email HTML message");
    
    // Send email to store owner
    console.log("Sending email to store owner:", STORE_EMAIL);
    const ownerEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'ordini@edilp2.com', // Make sure this is a verified domain in Resend
        to: STORE_EMAIL,
        subject: `Nuovo Ordine #${order.id} - EdilP2`,
        html: orderHtml,
      }),
    });
    
    if (!ownerEmailResponse.ok) {
      console.error("Failed to send owner email:", await ownerEmailResponse.text());
      throw new Error(`Failed to send owner email: ${ownerEmailResponse.statusText}`);
    }
    
    const ownerEmailResult = await ownerEmailResponse.json();
    console.log("Email to owner sent successfully:", ownerEmailResult);
    
    // Send confirmation email to customer
    if (order.customer.email) {
      console.log("Sending confirmation email to customer:", order.customer.email);
      const customerHtml = formatCustomerConfirmationHtml(order);
      
      const customerEmailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'ordini@edilp2.com', // Make sure this is a verified domain in Resend
          to: order.customer.email,
          subject: "Conferma Ordine - EdilP2",
          html: customerHtml,
        }),
      });
      
      if (!customerEmailResponse.ok) {
        console.error("Failed to send customer email:", await customerEmailResponse.text());
        console.warn("Continuing despite customer email failure");
      } else {
        const customerEmailResult = await customerEmailResponse.json();
        console.log("Confirmation email to customer sent successfully:", customerEmailResult);
      }
    } else {
      console.warn("No customer email provided, skipping customer notification");
    }
    
    return true;
  } catch (error) {
    console.error("Error sending email notification:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return false;
  }
}

serve(async (req) => {
  console.log("Edge function triggered with request:", req.url);
  
  // Handle CORS preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    console.log("Handling OPTIONS preflight request");
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  
  try {
    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase credentials not found in environment variables");
    }
    
    console.log("Creating Supabase client with URL:", supabaseUrl);
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Get the request body
    const body = await req.json();
    console.log("Request body:", body);
    
    const { orderId } = body;
    
    if (!orderId) {
      console.error("Missing orderId in request");
      return new Response(
        JSON.stringify({ success: false, error: "Order ID is required" }),
        { 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          }, 
          status: 400 
        }
      );
    }
    
    console.log("Fetching order details for order ID:", orderId);
    // Get the order from the database
    const { data: order, error } = await supabaseClient
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();
    
    if (error || !order) {
      console.error("Error fetching order:", error?.message || "Order not found");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: error?.message || "Order not found" 
        }),
        { 
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          }, 
          status: 404 
        }
      );
    }
    
    console.log("Order found:", order);
    
    // Send email notification using Resend
    console.log("Sending email notification via Resend...");
    const emailResult = await sendEmailNotification(order as Order);
    console.log("Email notification result:", emailResult);
    
    // Update order status if email was sent
    if (emailResult) {
      console.log("Updating order status to 'confirmed'");
      const { error: updateError } = await supabaseClient
        .from("orders")
        .update({ status: "confirmed" })
        .eq("id", orderId);
      
      if (updateError) {
        console.error("Error updating order status:", updateError);
      } else {
        console.log("Order status updated successfully");
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        email: emailResult,
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        } 
      }
    );
  } catch (error) {
    console.error("Error in Edge Function:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        stack: error.stack,
      }),
      { 
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        }, 
        status: 500 
      }
    );
  }
});
