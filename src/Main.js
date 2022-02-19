import netlifyIdentity from "netlify-identity-widget";
import { useQuery } from "react-query";
import { createClient } from "@supabase/supabase-js";

import { Projects } from "./views/Projects";

export function Main({ user }) {
  const {
    REACT_APP_SUPABASE_URL,
    REACT_APP_SUPABASE_SERVICE_ROLE
  } = process.env;
  const client = createClient(
    REACT_APP_SUPABASE_URL,
    REACT_APP_SUPABASE_SERVICE_ROLE
  );

  const { data: project_groups } = useQuery("project_groups", async () => {
    const { data: project_groups, error } = await client
      .from("project_groups")
      .select("*");

    if (project_groups) return project_groups;
    if (error) alert(error.message);
  });

  const { data: projects } = useQuery("projects", async () => {
    const { data: projects, error } = await client
      .from("project_groups")
      .select("*");

    if (projects) return projects;
    if (error) alert(error.message);
  });

  function ListOfProjects(groupID) {
    const groupFilter = projects.filter(
      (item) => item.project_group_id === groupID
    );

    return groupFilter.map((item) => (
      <li key={item.id} className="uk-text-meta">
        {item.name}
      </li>
    ));
  }

  return (
    <div className="uk-background-muted">
      <button className="uk-button uk-button-link uk-width-1-4@m uk-margin-right uk-margin-left uk-margin-top uk-margin-large-bottom uk-inline">
        <div className="uk-grid-small uk-flex-middle" data-uk-grid>
          <div className="uk-width-auto">
            <img
              className="uk-border-circle"
              width="40"
              height="40"
              src={`${process.env.PUBLIC_URL}/images/art-hauntington-jzY0KRJopEI-unsplash.jpg`}
              alt="hauntington"
            ></img>
          </div>
          <div className="uk-width-expand uk-text-left">
            <h3 className="uk-card-title uk-text-small uk-text-bold uk-margin-remove-bottom">
              {user?.user_metadata?.full_name ?? "NoName"}
            </h3>
            <p className="uk-text-meta uk-margin-remove-top">{user?.email}</p>
          </div>
        </div>

        <div data-uk-dropdown="mode: click">
          <ul className="uk-list uk-list-large uk-list-divider">
            <li className="uk-text-meta">{user?.email}</li>
            <li>
              <button
                className="uk-button uk-button-small uk-button-danger uk-width-1-1"
                onClick={() => netlifyIdentity.logout()}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </button>

      <section className="uk-margin-left uk-margin-right uk-margin">
        <div data-uk-grid="masonry: true; parallax: 48">
          <div className="uk-width-1-4@m">
            <ul
              className="uk-tab-right uk-margin-large-bottom"
              data-uk-tab="connect: #component-tab-left; animation: uk-animation-fade"
            >
              <li>
                <a href="#link">
                  <span
                    data-uk-icon="icon: database; ratio: 0.7"
                    className="uk-margin-small-right"
                  ></span>
                  Projects
                </a>
              </li>
              <li>
                <a href="#link">
                  <span
                    data-uk-icon="icon: calendar; ratio: 0.7"
                    className="uk-margin-small-right"
                  ></span>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#link">
                  <span
                    data-uk-icon="icon: check; ratio: 0.7"
                    className="uk-margin-small-right"
                  ></span>
                  Milestones
                </a>
              </li>
              <li>
                <a href="#link">
                  <span
                    data-uk-icon="icon: list; ratio: 0.7"
                    className="uk-margin-small-right"
                  ></span>
                  Tasks
                </a>
              </li>
              <li>
                <a href="#link">
                  <span
                    data-uk-icon="icon: clock; ratio: 0.7"
                    className="uk-margin-small-right"
                  ></span>
                  Timesheets
                </a>
              </li>
              <li>
                <a href="#link">
                  <span
                    data-uk-icon="icon: users; ratio: 0.7"
                    className="uk-margin-small-right"
                  ></span>
                  Users
                </a>
              </li>
              <li>
                <a href="#link">
                  <span
                    data-uk-icon="icon: folder; ratio: 0.7"
                    className="uk-margin-small-right"
                  ></span>
                  Documents
                </a>
              </li>
            </ul>

            <div className="uk-card uk-card-secondary uk-card-small uk-card-body uk-border-rounded">
              <div className="uk-width-expand uk-margin-large uk-text-bold uk-text-small uk-text-muted">
                Project Groups
              </div>

              <ul data-uk-accordion="collapsible: false">
                {project_groups?.length ? (
                  project_groups.map((item) => (
                    <li key={item.id}>
                      <a
                        className="uk-accordion-title uk-text-bold uk-text-default"
                        href="#list-item"
                      >
                        {item.name}
                      </a>

                      {projects?.length ? (
                        <div className="uk-accordion-content">
                          <ul className="uk-list uk-list-collapse  uk-list-square">
                            {ListOfProjects(item.id)}
                          </ul>
                        </div>
                      ) : null}
                    </li>
                  ))
                ) : (
                  <li>
                    <i>There are no project groups to show</i>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="uk-width-expand@m uk-margin">
            <ul id="component-tab-left" className="uk-switcher">
              <li>
                <Projects client={client}></Projects>
              </li>
              {/* <li><Dashboard></Dashboard></li> */}
              {/* <li><Milestones></Milestones></li> */}
              {/* <li><Tasks></Tasks></li> */}
              {/* <li><Timesheets></Timesheets></li> */}
              {/* <li><Users></Users></li> */}
              {/* <li><DocumentsAndFolders></DocumentsAndFolders></li> */}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
