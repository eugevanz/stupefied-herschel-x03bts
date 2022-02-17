import { createClient } from "@supabase/supabase-js";

const { 
  REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_SERVICE_ROLE 
} = process.env;

export async function handler(event, context) {
  const { data: milestones, error } = await createClient(
    REACT_APP_SUPABASE_URL,
    REACT_APP_SUPABASE_SERVICE_ROLE
  )
    .from("milestones")
    .select("*");

  return {
    statusCode: 200,
    body: JSON.stringify({ milestones: milestones, error: error })
  };
}
