
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
      PERFORM pg_notify('supabase_functions', json_build_object('action', 'delete', 'name', function_name)::text);
      RAISE NOTICE 'Delete command sent for function %', function_name;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Failed to delete function %, but continuing: %', function_name, SQLERRM;
  END;
  
  -- Create/recreate the function using pg_notify
  PERFORM pg_notify('supabase_functions', json_build_object(
    'action', 'create',
    'name', function_name,
    'verify_jwt', FALSE,
    'invoke_options', json_build_object(
      'rate_limits', json_build_array(
        json_build_object(
          'name', 'service_role',
          'calls', 1000,
          'period', 60
        )
      )
    )
  )::text);
  
  RAISE NOTICE 'Create command sent for edge function %', function_name;
EXCEPTION WHEN OTHERS THEN
  RAISE EXCEPTION 'Failed to create/redeploy edge function %: %', function_name, SQLERRM;
END
$$;
