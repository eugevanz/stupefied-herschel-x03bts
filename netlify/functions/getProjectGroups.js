import { createClient } from "@supabase/supabase-js";

const { 
  REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_SERVICE_ROLE 
} = process.env;

export async function handler(event, context) {
  const { data: project_groups, error } = await createClient(
    REACT_APP_SUPABASE_URL,
    REACT_APP_SUPABASE_SERVICE_ROLE
  )
    .from("project_groups")
    .select("*");

  return {
    statusCode: 200,
    body: JSON.stringify({ project_groups: project_groups, error: error })
  };
}
