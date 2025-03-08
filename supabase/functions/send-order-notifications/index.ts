
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Twilio } from "https://deno.land/x/twilio@1.0.2/mod.ts";
import sendgrid from "https://deno.land/x/sendgrid@0.0.3/mod.ts";

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

// Function to format the order into a readable message
function formatOrderMessage(order: Order): string {
  try {
    const itemsList = order.items.map((item) => 
      `- ${item.name || 'Prodotto'} (${item.quantity || 0}x) - ${item.price || '0.00'}`
    ).join('\n');
    
    return `
      Nuovo ordine da EdilP2!
      
      Cliente: ${order.customer?.name || 'N/A'}
      Email: ${order.customer?.email || 'N/A'}
      Telefono: ${order.customer?.phone || 'N/A'}
      Data: ${new Date(order.orderDate).toLocaleString('it-IT')}
      
      ARTICOLI:
      ${itemsList}
      
      Totale: €${(order.total || 0).toFixed(2)}
      Totale con IVA (22%): €${(order.totalWithIva || 0).toFixed(2)}
      ${order.notes ? `\nNote: ${order.notes}` : ''}
    `;
  } catch (error) {
    console.error("Error formatting order message:", error);
    return "Nuovo ordine ricevuto (errore nel formato)";
  }
}

// Function to send an email notification
async function sendEmailNotification(order: Order): Promise<boolean> {
  try {
    console.log("Starting email notification process for order:", order.id);
    
    const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
    const STORE_EMAIL = Deno.env.get("STORE_EMAIL") || "vcarusobusiness@gmail.com";
    
    if (!SENDGRID_API_KEY) {
      console.error("SendGrid API Key not found in environment variables");
      throw new Error("SendGrid API Key not found in environment variables");
    }
    
    console.log("Using SendGrid API Key:", SENDGRID_API_KEY.substring(0, 5) + "...[hidden]");
    console.log("Store email:", STORE_EMAIL);
    
    // Initialize SendGrid
    sendgrid.init(SENDGRID_API_KEY);
    
    // Format the message body
    const messageBody = formatOrderMessage(order);
    console.log("Formatted email message:", messageBody);
    
    // Send email to store owner
    console.log("Sending email to store owner:", STORE_EMAIL);
    const ownerEmailPayload = {
      to: STORE_EMAIL,
      from: "noreply@edilp2.com",
      subject: `Nuovo Ordine #${order.id} - EdilP2`,
      text: messageBody,
      html: messageBody.replace(/\n/g, "<br>"),
    };
    console.log("Owner email payload:", ownerEmailPayload);
    
    const ownerEmailSent = await sendgrid.send(ownerEmailPayload);
    console.log("Email to owner response:", ownerEmailSent);
    
    // Send confirmation email to customer
    if (order.customer.email) {
      console.log("Sending confirmation email to customer:", order.customer.email);
      const customerMessage = `
        Gentile ${order.customer.name},
        
        Grazie per il tuo ordine! Abbiamo ricevuto la tua richiesta e la stiamo elaborando.
        
        Dettagli Ordine:
        ${messageBody}
        
        Ti contatteremo presto per confermare i dettagli e organizzare il ritiro.
        
        Grazie per aver scelto EdilP2!
      `;
      
      const customerEmailPayload = {
        to: order.customer.email,
        from: "noreply@edilp2.com",
        subject: "Conferma Ordine - EdilP2",
        text: customerMessage,
        html: customerMessage.replace(/\n/g, "<br>"),
      };
      console.log("Customer email payload:", customerEmailPayload);
      
      const customerEmailSent = await sendgrid.send(customerEmailPayload);
      console.log("Confirmation email to customer response:", customerEmailSent);
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

// Function to send a WhatsApp notification
async function sendWhatsAppNotification(order: Order): Promise<boolean> {
  try {
    console.log("Starting WhatsApp notification process for order:", order.id);
    
    const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID");
    const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN");
    const TWILIO_PHONE_NUMBER = Deno.env.get("TWILIO_PHONE_NUMBER");
    const STORE_PHONE_NUMBER = Deno.env.get("STORE_PHONE_NUMBER") || "+393241527770";
    
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
      console.error("Twilio credentials not found in environment variables");
      throw new Error("Twilio credentials not found in environment variables");
    }
    
    console.log("Using Twilio credentials:", {
      accountSid: TWILIO_ACCOUNT_SID.substring(0, 5) + "...[hidden]", 
      authToken: "...[hidden]",
      phoneNumber: TWILIO_PHONE_NUMBER,
      storePhoneNumber: STORE_PHONE_NUMBER
    });
    
    // Initialize Twilio client
    const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    
    // Format the message
    const messageBody = formatOrderMessage(order);
    console.log("Formatted WhatsApp message:", messageBody);
    
    // Prepare message payload
    const messagePayload = {
      body: messageBody,
      from: `whatsapp:${TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${STORE_PHONE_NUMBER}`
    };
    console.log("WhatsApp message payload:", messagePayload);
    
    // Send WhatsApp message
    const message = await client.messages.create(messagePayload);
    
    console.log("WhatsApp message sent, SID:", message.sid);
    return true;
  } catch (error) {
    console.error("Error sending WhatsApp notification:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return false;
  }
}

serve(async (req) => {
  console.log("Edge function triggered with request:", req.url);
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
        { headers: { "Content-Type": "application/json" }, status: 400 }
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
        { headers: { "Content-Type": "application/json" }, status: 404 }
      );
    }
    
    console.log("Order found:", order);
    
    // Send notifications
    console.log("Sending email notification...");
    const emailResult = await sendEmailNotification(order as Order);
    console.log("Email notification result:", emailResult);
    
    console.log("Sending WhatsApp notification...");
    const whatsappResult = await sendWhatsAppNotification(order as Order);
    console.log("WhatsApp notification result:", whatsappResult);
    
    // Update order status if notifications were sent
    if (emailResult || whatsappResult) {
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
        whatsapp: whatsappResult,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in Edge Function:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        stack: error.stack,
      }),
      { headers: { "Content-Type": "application/json" }, status: 500 }
    );
  }
});
