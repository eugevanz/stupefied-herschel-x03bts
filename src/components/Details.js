import moment from "moment";
import { useState } from "react";
import { useProfileQueryData, useProjectGroupQueryData, useProjectQueryData } from "../hooks/useQueryData";

export function Details({ selected, table, client }) {
  const { data: projects } = useProjectQueryData(client);
  const { data: project_groups } = useProjectGroupQueryData(client);
  const {data: profiles} = useProfileQueryData(client);

  const [name, setName] = useState(null);
  const [projectGroupName, setProjectGroupName] = useState(null);
  const [projectNames, setProjectNames] = useState(null);

  if (profiles) setName(profiles.find(item => 
    item.id === selected.user_id).name);

  if (projects && table === 'projects') setProjectGroupName(project_groups.find(item => 
    item.id === selected.project_group_id).name);

  if (project_groups && table === 'project_groups') setProjectNames(projects.filter(item => 
    item.project_group_id === selected.id ? {name: item.name, id: item.id} : null));

  function itemText(property, text) { 
    return (<div className="uk-text-small"><code>{ property }</code> { text }</div>);
  }

  if (table !== 'projects' || table !== 'project_groups') return null;

  return (<div id='details' className='uk-card uk-card-primary uk-card-small uk-border-rounded'>

    <div className='uk-card-header'>
      <div className='uk-grid-small uk-flex-middle' data-uk-grid>
        <div className='uk-width-auto'>
          <img alt='profile' className='uk-border-circle' width='40' height='40' src={ `${ process.env.PUBLIC_URL }/images/art-hauntington-jzY0KRJopEI-unsplash.jpg` }></img>
        </div>
        <div className='uk-width-expand'>
          { table === 'profiles' ? <div className='uk-text-bold'>{ selected.email }</div> : <div className='uk-text-bold'>{ selected.name }</div> }
        </div>
      </div>
    </div>

    <div className='uk-card-body'>
      { table === 'projects' ? <div className='uk-text-normal uk-margin-large-bottom'>
        { selected.description }
      </div> : null }

      {projectNames?.length && table === 'project_groups' ? <ul className='uk-list uk-text-small uk-margin-large-bottom'>
        { projectNames.map((item, i) => <li key={ i }>{ item.name }</li>) }
      </ul> : null}
    </div>

    <div className='uk-card-footer'>
      <ul className='uk-list uk-list-collapse'>

        { table === 'profiles' ? itemText('Since', moment(selected.created_at).format('MMMM Do YYYY'))  : null }

        {name && (table !== 'profiles' || table !== 'project_groups') ? itemText('Owner', name) : null }
        
        { table === 'documents' || table === 'logs' || table === 'milestones' ? itemText('Project', selected.project_id) : null }

        { table === 'documents' || table === 'logs' ? itemText('Task', selected.task_id) : null }

        { table === 'documents' || table === 'logs' ? itemText('Status', selected.status) : null }

        { table === 'profiles' ? null : itemText('Start', moment(selected.start_date).format('MMMM Do YYYY')) }

        { table === 'profiles' ? null : itemText('End', moment(selected.end_date).format('MMMM Do YYYY')) }

        {projectGroupName && table === 'projects' ? itemText('Project Group', projectGroupName) : null }

        { table === 'tasks' ? itemText('Milestone', selected.milestone_id) : null }

      </ul>

      <button className='uk-icon-button uk-float-right' data-uk-icon='icon: pencil' data-uk-filter-control="[data-tags*='update']" data-uk-scroll><span>&#8203;</span></button>
    </div>
  </div>);
}