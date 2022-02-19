import netlifyIdentity from 'netlify-identity-widget';
import { useEffect, useState } from 'react';

import { SearchAcrossProjects } from '../components/SearchAcrossProjects';
import { ReadAllRows } from '../components/ReadAllRows';
import { Details } from '../Projects/Details';
import { InsertRow } from '../Projects/InsertRow';
import { UpdateMatchingRows } from '../Projects/UpdateMatchingRows';
import { DeleteMatchingRows } from '../Projects/DeleteMatchingRows';
import { WithFiltering } from '../Projects/WithFiltering';

import { useProjectQueryData } from "../hooks/useQueryData";
import { useTaskQueryData } from '../hooks/useQueryData';
import { useMilestoneQueryData } from '../hooks/useQueryData';

export function Projects({client}) {
  const user = netlifyIdentity.currentUser();

  const [myProjects, setmyProjects] = useState(null);
  
  const {data: milestones} = useMilestoneQueryData(client);

  const {isLoading: isProjectsLoading, data: projects, isError: isProjectsError} = useProjectQueryData(client);
  if (projects) setmyProjects(projects.filter(item => item.user_id === user?.id));

  const {data: tasks} = useTaskQueryData(client);

  
  const [selected, setselected] = useState(null);
  const [selectedTasks, setselectedTasks] = useState(null);
  const [selectedMilestones, setselectedMilestones] = useState(null);

  useEffect(() => {
    if (selected) {
      setselectedTasks(tasks?.filter(item => item.project_id === selected.id));
      setselectedMilestones(milestones?.filter(item => item.project_id === selected.id));
    }
  }, [selected, tasks, milestones]);
  
  if (isProjectsLoading) return (<div className='uk-flex uk-flex-center'>
    <div className='uk-card uk-card-body'>
      <span data-uk-spinner='ratio: 6'></span>
    </div>
  </div>);

  if (isProjectsError) return (<div className='uk-flex uk-flex-center'>
  <div className='uk-card uk-card-body'>
    Something went wrong. Investigating...
  </div>
  </div>);

  return (<div data-uk-filter='target: .js-filter; duration: 500; animation: delayed-fade'>

    <div className='uk-child-width-1-2@m js-filter' data-uk-grid='masonry: true; parallax: 48'>

      <div data-tags='default'>
        <SearchAcrossProjects title='projects' table={ projects } setselected={setselected}></SearchAcrossProjects>
      </div>

      <div data-tags='create update'>
        <a className='uk-grid-medium uk-flex-middle' href='#chevron-left' data-uk-filter-control="[data-tags*='details']" data-uk-scroll data-uk-grid>
          { selected ? <div className='uk-width-auto' data-uk-icon='icon: chevron-left; ratio: 2'>&#8203;</div> : null }
        </a>
      </div>

      <div data-tags='details'>
        <a className='uk-grid-medium uk-flex-middle uk-active' href='#close-selected' data-uk-filter-control="[data-tags*='default']" data-uk-scroll data-uk-grid>
          { selected ? <div className='uk-width-auto' data-uk-icon='icon: close; ratio: 2'>&#8203;</div> : null }
        </a>
      </div>

      <div data-tags='update'>
        { selected ? <UpdateMatchingRows selected={ selected } table='projects' title='Update' client={client}></UpdateMatchingRows> : null }
      </div>

      <div data-tags='update'>
        { selected ? <InsertRow selected={ selected } fn='milestones' title='Create a new Milestone'></InsertRow> : null }
      </div>

      <div data-tags='update'>
        { selected ? <InsertRow selected={ selected } fn='tasks' title='Create a new Task'></InsertRow> : null }
      </div>

      <div data-tags='details update'>
        { selected ? <Details selected={ selected } table='projects'></Details> : <div className='uk-text-muted uk-text-small uk-padding'>Select a project to see it's details</div> }
      </div>

      <div data-tags='details'>
        { selectedTasks && selectedTasks.length ? <WithFiltering table={ selectedTasks } title='Tasks'></WithFiltering> : <div className='uk-flex uk-flex-center'>
          <div className='uk-card uk-card-body'>
            <span data-uk-spinner='ratio: 6'></span>
          </div>
        </div> }
      </div>

      <div data-tags='details'>
        { selectedMilestones && selectedMilestones.length ? <WithFiltering setselected={ setselected } table={ selectedMilestones } title='Milestones'></WithFiltering> : <div className='uk-flex uk-flex-center'>
          <div className='uk-card uk-card-body'>
            <span data-uk-spinner='ratio: 6'></span>
          </div>
        </div> }
      </div>

      <div data-tags='default'>
        { projects.length ? <ReadAllRows setselected={ setselected } contents={ projects } title='All Projects'></ReadAllRows> : <div className='uk-text-muted uk-text-small uk-padding'>There are no projects to show</div> }
      </div>

      <div data-tags='default'>
        { myProjects && myProjects.length ? <WithFiltering setselected={ setselected } table={ myProjects } title='My Projects'></WithFiltering> : <div className='uk-text-muted uk-text-small uk-padding'>You don't have any projects</div> }
      </div>

      {/* <div data-tags='default'>
        <ReadAllRows setselected={ setselected } table='project_groups' title='All project groups in this portal'></ReadAllRows>
      </div> */}
      
      <div data-tags='create default'>
        <InsertRow selected={ selected ?? null } fn='projects' title='Create a new project'></InsertRow>
      </div>
      
      <div data-tags='create default'>
        <InsertRow selected={ selected ?? null } fn='project_groups' title='Create a Project Group'></InsertRow>
      </div>

      <div data-tags='update'>
        { selected ? <DeleteMatchingRows selected={ selected } table='projects'></DeleteMatchingRows> : null }
      </div>

    </div>
  </div>);
}