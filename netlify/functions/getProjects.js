import { createClient } from "@supabase/supabase-js";

const { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_SERVICE_ROLE } = process.env;

export async function handler(event, context) {
  const { data: projects, error } = await createClient(
    REACT_APP_SUPABASE_URL,
    REACT_APP_SUPABASE_SERVICE_ROLE
  )
    .from("projects")
    .select("*");

  return {
    statusCode: 200,
    body: JSON.stringify({ projects: projects, error: error })
  };
}
