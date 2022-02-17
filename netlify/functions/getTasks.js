import { createClient } from "@supabase/supabase-js";

const { 
  REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_SERVICE_ROLE 
} = process.env;

export async function handler(event, context) {
  const { data: tasks, error } = await createClient(
    REACT_APP_SUPABASE_URL,
    REACT_APP_SUPABASE_SERVICE_ROLE
  )
    .from("tasks")
    .select("*");

  return {
    statusCode: 200,
    body: JSON.stringify({ tasks: tasks, error: error })
  };
}
