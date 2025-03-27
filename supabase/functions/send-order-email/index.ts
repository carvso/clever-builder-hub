import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { corsHeaders } from '../_shared/cors.ts';
import { Resend } from 'https://esm.sh/resend@2.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

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
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total: number;
  total_with_iva: number;
  order_date: string;
  status: string;
  notes?: string;
  items: OrderItem[];
}

// Function to format the order into a readable HTML message
function formatOrderHtml(order: Order): string {
  let productsHtml = '';
  
  if (order.items && order.items.length > 0) {
    productsHtml = `
      <h3>Prodotti ordinati</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="padding: 8px; text-align: left; border: 1px solid #e5e7eb;">Prodotto</th>
            <th style="padding: 8px; text-align: center; border: 1px solid #e5e7eb;">Quantità</th>
            <th style="padding: 8px; text-align: right; border: 1px solid #e5e7eb;">Prezzo</th>
            <th style="padding: 8px; text-align: right; border: 1px solid #e5e7eb;">Totale</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map(item => `
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${item.name}</td>
              <td style="padding: 8px; text-align: center; border: 1px solid #e5e7eb;">${item.quantity}</td>
              <td style="padding: 8px; text-align: right; border: 1px solid #e5e7eb;">${item.price}</td>
              <td style="padding: 8px; text-align: right; border: 1px solid #e5e7eb;">${calculateItemTotal(item)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  return `
    <h2>Nuovo ordine ricevuto</h2>
    <p><strong>ID Ordine:</strong> ${order.id}</p>
    <p><strong>Data:</strong> ${new Date(order.order_date).toLocaleString('it-IT')}</p>
    <p><strong>Stato:</strong> ${order.status}</p>
    <p><strong>Note:</strong> ${order.notes || 'Nessuna nota'}</p>
    <p><strong>Totale:</strong> €${order.total.toFixed(2)}</p>
    <p><strong>Totale con IVA:</strong> €${order.total_with_iva.toFixed(2)}</p>
    <p><strong>P.IVA:</strong> 02134040894</p>
    <h3>Informazioni Cliente</h3>
    <p><strong>Nome:</strong> ${order.customer_name}</p>
    <p><strong>Email:</strong> ${order.customer_email}</p>
    <p><strong>Telefono:</strong> ${order.customer_phone}</p>
    ${productsHtml}
  `;
}

// Function to format customer confirmation email in HTML
function formatCustomerHtml(order: Order): string {
  let productsHtml = '';
  
  if (order.items && order.items.length > 0) {
    productsHtml = `
      <h3>Dettaglio prodotti</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="padding: 8px; text-align: left; border: 1px solid #e5e7eb;">Prodotto</th>
            <th style="padding: 8px; text-align: center; border: 1px solid #e5e7eb;">Quantità</th>
            <th style="padding: 8px; text-align: right; border: 1px solid #e5e7eb;">Prezzo</th>
            <th style="padding: 8px; text-align: right; border: 1px solid #e5e7eb;">Totale</th>
          </tr>
        </thead>
        <tbody>
          ${order.items.map(item => `
            <tr>
              <td style="padding: 8px; border: 1px solid #e5e7eb;">${item.name}</td>
              <td style="padding: 8px; text-align: center; border: 1px solid #e5e7eb;">${item.quantity}</td>
              <td style="padding: 8px; text-align: right; border: 1px solid #e5e7eb;">${item.price}</td>
              <td style="padding: 8px; text-align: right; border: 1px solid #e5e7eb;">${calculateItemTotal(item)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  return `
    <h2>Grazie per il tuo ordine!</h2>
    <p>Caro/a ${order.customer_name},</p>
    <p>Abbiamo ricevuto il tuo ordine e lo stiamo elaborando.</p>
    <p><strong>ID Ordine:</strong> ${order.id}</p>
    <p><strong>Data:</strong> ${new Date(order.order_date).toLocaleString('it-IT')}</p>
    <p><strong>Totale:</strong> €${order.total.toFixed(2)}</p>
    <p><strong>Totale con IVA:</strong> €${order.total_with_iva.toFixed(2)}</p>
    <p><strong>P.IVA:</strong> 02134040894</p>
    ${productsHtml}
    <p>Ti contatteremo presto per confermare l'elaborazione del tuo ordine.</p>
    <p>Cordiali saluti,<br>Il team di EdilP2</p>
  `;
}

// Helper function to calculate item total
function calculateItemTotal(item: OrderItem): string {
  const price = parseFloat(item.price.replace('€/pz', '').replace('€', ''));
  return `€${(price * item.quantity).toFixed(2)}`;
}

// Function to send an email notification using Resend API
async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['paolomangiafico29@gmail.com'],
      subject,
      html
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

serve(async (req) => {
  console.log('=== Edge Function Started ===');
  console.log('Request URL:', req.url);
  console.log('Request method:', req.method);
  console.log('Request headers:', Object.fromEntries(req.headers.entries()));
  
  // Handle CORS preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    console.log("Handling OPTIONS request");
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Log environment variables (without sensitive values)
    console.log('Environment variables status:', {
      hasResendKey: !!Deno.env.get('RESEND_API_KEY'),
      hasServiceRoleKey: !!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
      hasSupabaseUrl: !!Deno.env.get('SUPABASE_URL'),
      hasSupabaseAnonKey: !!Deno.env.get('SUPABASE_ANON_KEY')
    });

    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    console.log("Environment variables:", {
      SUPABASE_URL: supabaseUrl ? "Set" : "Not set",
      SUPABASE_SERVICE_ROLE_KEY: supabaseKey ? "Set" : "Not set",
      RESEND_API_KEY: Deno.env.get("RESEND_API_KEY") ? "Set" : "Not set"
    });
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase credentials not found in environment variables");
    }

    // Create a Supabase client
    console.log("Creating Supabase client with URL:", supabaseUrl);
    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Get the request body
    console.log("Attempting to parse request body...");
    let body;
    try {
      const bodyText = await req.text();
      console.log("Raw request body:", bodyText);
      body = JSON.parse(bodyText);
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid JSON in request body",
          details: parseError.message 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }
    
    console.log("Parsed request body:", body);
    
    const { orderId } = body;
    
    if (!orderId) {
      console.error("Missing orderId in request body:", body);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Order ID is required",
          receivedBody: body 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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
    
    if (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
    
    if (!order) {
      console.error("Order not found:", orderId);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Order not found" 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404 
        }
      );
    }
    
    console.log("Raw order data:", JSON.stringify(order, null, 2));
    
    // Format the order data
    const formattedOrder: Order = {
      id: order.id,
      customer_name: order.customer_info?.name || order.customer_name || 'N/A',
      customer_email: order.customer_info?.email || order.customer_email || 'N/A',
      customer_phone: order.customer_info?.phone || order.customer_phone || 'N/A',
      total: order.total || 0,
      total_with_iva: order.total_with_iva || 0,
      order_date: order.order_date || new Date().toISOString(),
      status: order.status || 'pending',
      notes: order.notes,
      items: [] // Per ora lasciamo l'array vuoto dato che non abbiamo accesso agli items
    };

    console.log("Raw order data for items check:", JSON.stringify(order, null, 2));

    // Controlliamo se c'è il campo items diretto nell'ordine
    if (order.items) {
      console.log("Found direct items field:", JSON.stringify(order.items, null, 2));
      try {
        // Se è una stringa JSON, proviamo a fare il parse
        if (typeof order.items === 'string') {
          formattedOrder.items = JSON.parse(order.items);
        } else {
          // Altrimenti assumiamo che sia già un array
          formattedOrder.items = Array.isArray(order.items) ? order.items : [];
        }
      } catch (e) {
        console.error("Error parsing items from order.items:", e);
      }
    } 
    // Se l'ordine ha un campo items_data, prova a usarlo
    else if (order.items_data) {
      try {
        formattedOrder.items = Array.isArray(order.items_data) ? order.items_data : JSON.parse(order.items_data);
      } catch (e) {
        console.error("Error parsing items_data:", e);
      }
    } 
    // In alternativa prova a recuperare gli items separatamente
    else {
      try {
        const { data: items } = await supabaseClient
          .from("order_items")
          .select("*")
          .eq("order_id", orderId);
        
        if (items && items.length > 0) {
          formattedOrder.items = items;
          console.log("Items fetched separately:", JSON.stringify(items, null, 2));
        }
      } catch (e) {
        console.error("Error fetching order items separately:", e);
      }
    }

    console.log("Final formatted order with items:", JSON.stringify(formattedOrder, null, 2));
    
    // Validate order data before sending email
    if (!formattedOrder.customer_name || !formattedOrder.customer_email || !formattedOrder.customer_phone) {
      console.error("Invalid order data:", formattedOrder);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid order data",
          details: "Missing required customer information"
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }
    
    // Format order details for email
    const orderHtml = formatOrderHtml(formattedOrder);
    const customerHtml = formatCustomerHtml(formattedOrder);

    // Send email to customer
    const customerEmailResult = await sendEmail({
      to: formattedOrder.customer_email,
      subject: 'Conferma del tuo ordine - EdilP2',
      html: customerHtml
    });

    // Send email to admin
    const adminEmailResult = await sendEmail({
      to: 'ordini@edilp2.com',
      subject: `Nuovo ordine #${formattedOrder.id}`,
      html: orderHtml
    });

    return new Response(JSON.stringify({
      success: true,
      customer: customerEmailResult,
      admin: adminEmailResult
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Error in Edge Function:", error);
    console.error("Error stack:", error.stack);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        stack: error.stack,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
