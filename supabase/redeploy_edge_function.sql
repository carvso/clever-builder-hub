
-- SQL query to create or redeploy the send-order-email edge function
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

  -- Try to delete the function if it exists (but continue if it fails)
  BEGIN
    IF function_exists THEN
      PERFORM supabase_functions.delete_function(function_name);
      RAISE NOTICE 'Existing function % deleted', function_name;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Failed to delete function %, but continuing: %', function_name, SQLERRM;
  END;
  
  -- Create/recreate the function
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
  
  RAISE NOTICE 'Edge function % has been created/redeployed successfully', function_name;
EXCEPTION WHEN OTHERS THEN
  RAISE EXCEPTION 'Failed to create/redeploy edge function %: %', function_name, SQLERRM;
END
$$;
