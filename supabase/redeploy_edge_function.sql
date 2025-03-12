
-- SQL query to redeploy the send-order-email edge function
DO $$
DECLARE
  function_name TEXT := 'send-order-email';
  function_exists BOOLEAN;
BEGIN
  -- Check if the function exists
  SELECT EXISTS (
    SELECT 1 FROM storage.objects 
    WHERE name = 'functions/' || function_name || '/index.ts'
  ) INTO function_exists;

  IF function_exists THEN
    -- First, we'll delete the existing function deployment
    PERFORM supabase_functions.delete_function(function_name);
    
    -- Then recreate the function from the existing code
    -- This effectively redeploys the function with any changes made to the source file
    PERFORM supabase_functions.create_function(
      name := function_name,
      verify_jwt := FALSE, -- Set this to TRUE if you need JWT verification
      invoke_options := '{
        "rate_limits": [{
          "name": "service_role",
          "calls": 1000,
          "period": 60
        }]
      }'::jsonb
    );
    
    RAISE NOTICE 'Edge function % has been redeployed successfully', function_name;
  ELSE
    RAISE EXCEPTION 'Edge function % does not exist', function_name;
  END IF;
END
$$;
