import React, { useContext, useEffect, useRef, useState } from 'react';

import { MainContext, MainProvider, useSupabaseClient } from './store'

import { Loading } from './Views/Loading';
import { Projects } from './Views/Projects';
import { Users } from './Views/Users';
import { Timesheets } from './Views/Timesheets';
import { Tasks } from './Views/Tasks';
import { Milestones } from './Views/Milestones';
import { DocumentsAndFolders } from './Views/DocumentsAndFolders';
import { Dashboard } from './Views/Dashboard';

import { ReadAllRows } from './Projects/ReadAllRows';

import { ResetPasswordForm } from './Views/ResetPasswordForm';

function Main() {
  const { 
    user, setUser, projects, onFetchProjects, project_groups, onFetchProjectGroups 
  } = useContext(MainContext);
  const client = useSupabaseClient();
  const fetchProjectGroups = useRef(onFetchProjectGroups);
  const fetchProjects = useRef(onFetchProjects);

  async function onSignOut() {
    client.auth.signOut().then(data => {
      if (data.error) console.log(data.error.error_description || data.error.message)
      else setUser(null);
    });
  }

  function ListOfProjects(groupID) {
    const groupFilter = projects.filter(item => item.project_group_id === groupID);

    return (groupFilter.map(item => <li key={ item.id } className='uk-text-meta'>
      { item.name }
    </li>));
  }

  useEffect(() => {
    if (user) {
      if (!project_groups) fetchProjectGroups.current();
      if (!projects) fetchProjects.current();
    } 
  }, [project_groups, user, projects]);
  
  if (!user) return (<Loading client={ client }></Loading>);

  return (<div className='uk-background-default'>
    <button className='uk-button uk-button-link uk-width-1-4@m uk-margin-right uk-margin-left uk-margin-top uk-margin-large-bottom uk-inline'>
      <div className='uk-grid-small uk-flex-middle' data-uk-grid>
        <div className='uk-width-auto'>
          <img className='uk-border-circle' width='40' height='40' src={ `${ process.env.PUBLIC_URL }/images/art-hauntington-jzY0KRJopEI-unsplash.jpg` } alt='hauntington'></img>
        </div>
        <div className='uk-width-expand uk-text-left'>
          <h3 className='uk-card-title uk-text-small uk-text-bold uk-margin-remove-bottom'>User name goes here</h3>
          <p className='uk-text-meta uk-margin-remove-top'>{ user.email }</p>
        </div>
      </div>

      <div data-uk-dropdown="mode: click">
        <ul className='uk-list uk-list-large uk-list-divider'>
          <li className='uk-text-meta'>{ user.email }</li>
          <li>
            <button className='uk-button uk-button-small uk-button-danger uk-width-1-1' onClick={ onSignOut }>Sign out</button>
          </li>
        </ul>
      </div>
    </button>

    <section className='uk-margin-left uk-margin-right uk-margin'>
      <div data-uk-grid='masonry: true; parallax: 48'>

        <div className='uk-width-1-4@m'>
          <ul className='uk-tab-right uk-margin-large-bottom' data-uk-tab='connect: #component-tab-left; animation: uk-animation-fade'>
            <li><a href='#link'><span data-uk-icon='icon: database; ratio: 0.7' className='uk-margin-small-right'></span>Projects</a></li>
            <li><a href='#link'><span data-uk-icon='icon: calendar; ratio: 0.7' className='uk-margin-small-right'></span>Dashboard</a></li>
            <li><a href='#link'><span data-uk-icon='icon: check; ratio: 0.7' className='uk-margin-small-right'></span>Milestones</a></li>
            <li><a href='#link'><span data-uk-icon='icon: list; ratio: 0.7' className='uk-margin-small-right'></span>Tasks</a></li>
            <li><a href='#link'><span data-uk-icon='icon: clock; ratio: 0.7' className='uk-margin-small-right'></span>Timesheets</a></li>
            <li><a href='#link'><span data-uk-icon='icon: users; ratio: 0.7' className='uk-margin-small-right'></span>Users</a></li>
            <li><a href='#link'><span data-uk-icon='icon: folder; ratio: 0.7' className='uk-margin-small-right'></span>Documents</a></li>
          </ul>

          <div className='uk-card uk-card-secondary uk-card-small uk-card-body uk-border-rounded'>
            <div className='uk-width-expand uk-margin-large uk-text-bold uk-text-small uk-text-muted'>Project Groups</div>

            <ul data-uk-accordion='collapsible: false'>
              { project_groups && project_groups.length ? project_groups.map(item => <li key={ item.id }>

                <a className='uk-accordion-title uk-text-bold uk-text-default' href='#list-item'>
                  { item.name }
                </a>

                { projects && projects.length ? <div className='uk-accordion-content'>
                  <ul className='uk-list uk-list-collapse  uk-list-square'>
                    { ListOfProjects(item.id) }
                  </ul>
                </div> : null }

              </li>) : <li><i>There are no projects groups to show</i></li> }
            </ul>
          </div>
        </div>

        <div className='uk-width-expand@m uk-margin'>
          <ul id='component-tab-left' className='uk-switcher'>
            <li><Projects></Projects></li>
            {/* <li><Dashboard></Dashboard></li> */}
            {/* <li><Milestones></Milestones></li> */}
            <li><Tasks></Tasks></li>
            {/* <li><Timesheets></Timesheets></li> */}
            {/* <li><Users></Users></li> */}
            {/* <li><DocumentsAndFolders></DocumentsAndFolders></li> */}
          </ul>
        </div>

      </div>
    </section>
  </div>);
}

export default function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    const url = window.location.href;
    if (url.search('type=recovery') !== -1 && url.search('token') !== -1) {
      const queryStringParameters = url.slice(url.search('token'), url.indexOf('&'));
      setToken(queryStringParameters.split('=')[1]);
    }
  }, []);

  if (token) return (<ResetPasswordForm token={ token }></ResetPasswordForm>);

  return (<Main></Main>);
}
