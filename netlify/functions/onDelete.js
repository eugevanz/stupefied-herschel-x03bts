import { createClient } from '@supabase/supabase-js';

const { 
  REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_SERVICE_ROLE 
} = process.env;

export async function handler (event, context) {
  const { table, id } = JSON.parse(event.body);

  const { data, error } = await createClient(
    REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_SERVICE_ROLE
    )
      .from(table)
      .delete()
      .eq('id', id);

  return {
    statusCode: 200,
    body: JSON.stringify({ data: data, error: error })
  };
}