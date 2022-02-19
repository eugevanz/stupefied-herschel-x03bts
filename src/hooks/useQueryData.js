import { useQuery } from "react-query";

export function useProjectGroupQueryData(client) {
  return useQuery('project_groups', async () => {
    const { data: project_groups, error } = await client
      .from('project_groups')
      .select('*');
      
    if (error) alert(error.message);
    return project_groups ?? null;
  });
}

export function useProjectQueryData(client) {
  return useQuery('projects', async () => {
    const { data: projects, error } = await client
      .from('projects')
      .select('*');
      
    if (error) alert(error.message);
    return projects ?? null;
  });
}

export function useMilestoneQueryData(client) {
  return useQuery('milestones', async () => {
    const { data: milestones, error } = await client
      .from('milestones')
      .select('*');
      
    if (error) alert(error.message);
    return milestones ?? null;
  });
}

export function useTaskQueryData(client) {
  return useQuery('tasks', async () => {
    const { data: tasks, error } = await client
      .from('tasks')
      .select('*');
      
    if (error) alert(error.message);
    return tasks ?? null;
  });
}

export function useLogQueryData(client) {
  return useQuery('logs', async () => {
    const { data: logs, error } = await client
      .from('logs')
      .select('*');
      
    if (error) alert(error.message);
    return logs ?? null;
  });
}

export function useDocumentQueryData(client) {
  return useQuery('documents', async () => {
    const { data: documents, error } = await client
      .from('documents')
      .select('*');
      
    if (error) alert(error.message);
    return documents ?? null;
  });
}

export function useProfileQueryData(client) {
  return useQuery('profiles', async () => {
    const { data: profiles, error } = await client
      .from('profiles')
      .select('*');
      
    if (error) alert(error.message);
    return profiles ?? null;
  });
}