
CREATE OR REPLACE FUNCTION create_orders_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if table exists
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'orders') THEN
    -- Create the orders table
    CREATE TABLE public.orders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      customer_info JSONB NOT NULL,
      items JSONB[] NOT NULL,
      total DECIMAL(10,2) NOT NULL,
      total_with_iva DECIMAL(10,2) NOT NULL,
      order_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
      status TEXT NOT NULL,
      notes TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );

    -- Set up RLS (Row Level Security)
    ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

    -- Create a policy that allows all operations for authenticated users
    CREATE POLICY "Enable all operations for authenticated users" ON public.orders
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);

    -- Create a policy that allows insert for anonymous users
    CREATE POLICY "Enable insert for anonymous users" ON public.orders
      FOR INSERT
      TO anon
      WITH CHECK (true);

    RETURN true;
  ELSE
    -- Table exists, but let's check if the policies are set correctly
    -- Drop existing policies to avoid conflicts
    DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON public.orders;
    DROP POLICY IF EXISTS "Enable insert for anonymous users" ON public.orders;
    
    -- Recreate policies
    CREATE POLICY "Enable all operations for authenticated users" ON public.orders
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
      
    CREATE POLICY "Enable insert for anonymous users" ON public.orders
      FOR INSERT
      TO anon
      WITH CHECK (true);
      
    RETURN true;
  END IF;
END;
$$;
