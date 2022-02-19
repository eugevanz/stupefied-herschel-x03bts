import moment from 'moment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMilestoneQueryData, useProfileQueryData, useProjectGroupQueryData, useTaskQueryData } from '../hooks/useQueryData';

export function UpdateMatchingRows({ selected, table, title, client }) {
  const {register, handleSubmit} = useForm();
  const [owner, setowner] = useState(null);
  const [checked, setchecked] = useState(false);

  async function onSubmit(formData) {
    const { data, error } = await client
      .from(table)
      .update({ ...formData })
      .eq('id', selected.id);
    
    if (data) console.log(data);
    if (error) alert(error.message);
  }

  const {data: projectGroups} = useProjectGroupQueryData(client);
  const {data: projects} = useProjectGroupQueryData(client);
  const {data: milestones} = useMilestoneQueryData(client);
  const {data: tasks} = useTaskQueryData(client);

  const {data: profiles} = useProfileQueryData(client);
  if (profiles && (table !== 'profiles' || table !== 'project_groups')) 
  setowner(profiles.filter(item => 
    item.id === selected.user_id ? item.name : 'No owner'));

  return (<div className='uk-card uk-card-default uk-card-small uk-card-body  uk-border-rounded uk-border-rounded'>
    <ul data-uk-accordion='animation: false'>
      <li>
        <a className='uk-accordion-title uk-text-meta uk-text-bold uk-margin-large-bottom' href={`update-${ table }`}>{title}</a>

        <form name='update-form' className='uk-form-stacked uk-margin uk-accordion-content' onSubmit={ handleSubmit(onSubmit) } data-uk-grid hidden>

          { table !== 'logs' ? <div className='uk-width-1-1'>
            <label className='uk-form-label uk-text-meta' htmlFor='form-stacked-text'>Name</label>
            <div className='uk-form-controls'>
              <input { ...register('name') } className='uk-input uk-form-small' id='form-stacked-text' type='text' placeholder={ selected.name }></input>
            </div>
          </div> : null }

          { table === 'projects' ? <div className='uk-width-1-1'>
            <label className='uk-form-label uk-text-meta' htmlFor='form-stacked-text'>Description</label>
            <div className='uk-form-controls'>
              <textarea { ...register('description') } className='uk-textarea uk-form-small' rows='5' id='form-stacked-text' placeholder={ selected.description }></textarea>
            </div>
          </div> : null }

          {owner?.length && (table !== 'profiles' || table !== 'project_groups') ? <div className='uk-width-1-2'>
            <label className='uk-form-label uk-text-meta' htmlFor='form-stacked-text'>Owner</label>
            <div className='uk-form-controls'>
              <select { ...register('user_id') } className='uk-select uk-form-small' disabled={ true }>
                { owner.map(item => <option>{ item.name }</option>) }
              </select>
            </div>
          </div> : null }

          {projects?.length && table === 'milestones' ? <div className='uk-width-1-2'>
            <label className='uk-form-label uk-text-meta' htmlFor='form-stacked-text'>Project</label>
            <div className='uk-form-controls'>
              <select { ...register('project_id') } className='uk-select uk-form-small' defaultValue={(projects.find(item => 
              item.id === selected.project_id)).name ?? 'none'}>
                {projects.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </div>
          </div> : null}

          {tasks?.length && (table === 'documents' || table === 'logs') ? <div className='uk-width-1-2'>
            <label className='uk-form-label uk-text-meta' htmlFor='form-stacked-text'>Task</label>
            <div className='uk-form-controls'>
              <select { ...register('task_id') } className='uk-select uk-form-small' defaultValue={(tasks.find(item => 
              item.id === selected.task_id)).name ?? 'none'}>
                {tasks.map(item => 
                <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </div>
          </div> : null }

          {table === 'logs' || table === 'tasks' || table === 'milestones' ? <div className='uk-width-1-2'>
            <label className='uk-form-label uk-text-meta' htmlFor='form-stacked-text'>Status</label>
            <div className='uk-form-controls'>
              {table === 'logs' ? <select { ...register('status') } className='uk-select uk-form-small' defaultValue={ selected.status }>
                <option value='Active'>Pending</option>
                <option value='Completed'>Approved</option>
              </select> : <select { ...register('status') } className='uk-select uk-form-small' defaultValue={ selected.status }>
                <option value='Active'>Active</option>
                <option value='Completed'>Completed</option>
              </select>}
            </div>
          </div> : null}

          { table === 'projects' || table === 'logs' || table === 'milestones' ? <div className='uk-width-1-2'>
            <label className='uk-form-label uk-text-meta' htmlFor='form-stacked-text'>Start Date</label>
            <div className='uk-form-controls'>
              <input { ...register('start_date') } className='uk-input uk-form-small' id='form-stacked-text' type='text' placeholder={ moment(selected.start_date).format('MMMM Do YYYY') }></input>
            </div>
          </div> : null }

          { table === 'projects' || table === 'logs' || table === 'milestones' ? <div className='uk-width-1-2'>
            <label className='uk-form-label uk-text-meta' htmlFor='form-stacked-text'>End Date</label>
            <div className='uk-form-controls'>
              <input { ...register('end_date') } className='uk-input uk-form-small' id='form-stacked-text' type='text' placeholder={ moment(selected.end_date).format('MMMM Do YYYY') }></input>
            </div>
          </div> : null }

          { table === 'profiles' ? <div className='uk-width-1-1'>
            <label className='uk-form-label uk-text-meta' htmlFor='form-stacked-text'>Avatar</label>
            <div className='uk-form-controls'>
              <input { ...register('avatar_url') } className='uk-input uk-form-small' id='form-stacked-text' type='text' placeholder='link to avatar'></input>
            </div>
          </div> : null }

          { table === 'profiles' ? <div className='uk-width-1-1'>
            <label className='uk-form-label uk-text-meta' htmlFor='form-stacked-text'>Email</label>
            <div className='uk-form-controls'>
              <input { ...register('email') } className='uk-input uk-form-small' id='form-stacked-text' type='text' placeholder={ selected.email }></input>
            </div>
          </div> : null }

          {projectGroups?.length && table === 'projects' ? <div className='uk-width-1-2'>
            <label className='uk-form-label uk-text-meta' htmlFor='form-stacked-text'>Project Group</label>
            <div className='uk-form-controls'>
              <select { ...register('project_group_id') } className='uk-select uk-form-small' defaultValue={(projectGroups.find(item => 
              item.id === selected.project_group_id)).name ?? 'none'}>
                { projectGroups.map(item => 
                <option key={ item.id } value={ item.id }>{ item.name }</option>) }
              </select>
            </div>
          </div> : null }

          {milestones && table === 'tasks' ? <div className='uk-width-1-2'>
            <label className='uk-form-label uk-text-meta' htmlFor='form-stacked-text'>Milestone</label>
            <div className='uk-form-controls'>
              <select { ...register('milestone_id') } className='uk-select uk-form-small' defaultValue={(milestones.find(item => 
              item.id === selected.milestone_id)).name ?? 'none'}>
                {milestones.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
              </select>
            </div>
          </div> : null }

          <div className='uk-width-1-1@s'>
            <button type='submit' className='uk-button uk-button-primary uk-width-expand@s' disabled={ !checked }>Update</button>
          </div>

          <div className='uk-margin uk-grid-small uk-child-width-auto uk-grid'>
            <label><input className='uk-checkbox uk-text-meta' type='checkbox' onChange={ e => setchecked(!checked) }></input> <span className='uk-text-meta'>Confirm update.</span></label>
          </div>
        </form>
      </li>
    </ul>
  </div>);
}