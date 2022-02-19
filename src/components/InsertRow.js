import { useState } from "react";
import { useForm } from "react-hook-form";
import netlifyIdentity from "netlify-identity-widget";
import {
  useMilestoneQueryData,
  useProjectGroupQueryData,
  useProjectQueryData,
  useTaskQueryData
} from "../hooks/useQueryData";

export function InsertRow({ selected, fn, title, client }) {
  const user = netlifyIdentity.currentUser();

  const { data: milestones } = useMilestoneQueryData(client);
  const { data: projects } = useProjectQueryData(client);
  const { data: project_groups } = useProjectGroupQueryData(client);
  const { data: tasks } = useTaskQueryData(client);

  const { register, handleSubmit, reset } = useForm();
  const [checked, setChecked] = useState(false);

  async function onSubmit(formData) {
    await client
      .from(fn)
      .insert([formData])
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    reset();
  }

  function listItemsOfType(data, filter) {
    return data.filter((item) => item.project_id === filter);
  }

  function registerDescription() {
    if (fn === "projects")
      return (
        <div className="uk-width-1-1">
          <label
            className="uk-form-label uk-text-meta"
            htmlFor="form-stacked-text"
          >
            Description
          </label>
          <div className="uk-form-controls">
            <input
              {...register("description")}
              className="uk-input uk-form-small"
              id="form-stacked-text"
              type="text"
              placeholder="Description"
            ></input>
          </div>
        </div>
      );
  }

  function registerEndDate() {
    if (fn === "projects" || fn === "logs" || fn === "milestones")
      return (
        <div className="uk-width-1-2">
          <label
            className="uk-form-label uk-text-meta"
            htmlFor="form-stacked-text"
          >
            End Date
          </label>
          <div className="uk-form-controls">
            <input
              {...register("end_date")}
              className="uk-input uk-form-small"
              id="form-stacked-text"
              type="date"
              placeholder="End Date"
            ></input>
          </div>
        </div>
      );
  }

  function registerMilestoneID() {
    if (milestones?.length && fn === "tasks")
      return (
        <div className="uk-width-1-1">
          <label
            className="uk-form-label uk-text-meta"
            htmlFor="form-stacked-text"
          >
            Milestone
          </label>
          <div className="uk-form-controls">
            <select
              {...register("milestone_id")}
              className="uk-select uk-form-small"
              defaultValue={
                milestones.find(
                  (item) => item.project_id === selected.project_id
                ).name ?? "none"
              }
            >
              {listItemsOfType(milestones, selected.project_id).map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
  }

  function registerName() {
    if (fn !== "logs")
      return (
        <div className="uk-width-1-1">
          <label
            className="uk-form-label uk-text-meta"
            htmlFor="form-stacked-text"
          >
            Name
          </label>
          <div className="uk-form-controls">
            <input
              {...register("name")}
              className="uk-input uk-form-small"
              id="form-stacked-text"
              type="text"
              placeholder="Name"
            ></input>
          </div>
        </div>
      );
  }

  function registerProjectGroupID() {
    if (project_groups?.length && fn === "projects")
      return (
        <div className="uk-width-1-2">
          <label
            className="uk-form-label uk-text-meta"
            htmlFor="form-stacked-text"
          >
            Project Group
          </label>
          <div className="uk-form-controls">
            <select
              {...register("project_group_id")}
              className="uk-select uk-form-small"
            >
              {project_groups.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
  }

  function registerProjectID() {
    if (
      projects?.length &&
      (fn === "documents" ||
        fn === "logs" ||
        fn === "milestones" ||
        fn === "tasks")
    )
      return (
        <div className="uk-width-1-1">
          <label
            className="uk-form-label uk-text-meta"
            htmlFor="form-stacked-text"
          >
            Project
          </label>
          <div className="uk-form-controls">
            {selected?.hasOwnProperty("project_id") ? (
              <input
                {...register("project_id")}
                className="uk-input uk-form-small"
                id="form-stacked-text"
                type="text"
                placeholder={selected.project_id}
                disabled={true}
              ></input>
            ) : (
              <select
                {...register("project_id")}
                className="uk-select uk-form-small"
              >
                {projects.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      );
  }

  function registerStartDate() {
    if (fn === "projects" || fn === "logs" || fn === "milestones")
      return (
        <div className="uk-width-1-2">
          <label
            className="uk-form-label uk-text-meta"
            htmlFor="form-stacked-text"
          >
            Start Date
          </label>
          <div className="uk-form-controls">
            <input
              {...register("start_date")}
              className="uk-input uk-form-small"
              id="form-stacked-text"
              type="date"
              placeholder="Start Date"
            ></input>
          </div>
        </div>
      );
  }

  function registerStatus() {
    if (fn === "milestones" || fn === "logs" || fn === "tasks")
      return (
        <div className="uk-width-1-2">
          <label
            className="uk-form-label uk-text-meta"
            htmlFor="form-stacked-text"
          >
            Status
          </label>
          <div className="uk-form-controls">
            {fn === "logs" ? (
              <select
                {...register("status")}
                className="uk-select uk-form-small"
                defaultValue={selected.status}
              >
                <option value="Active">Pending</option>
                <option value="Completed">Approved</option>
              </select>
            ) : (
              <select
                {...register("status")}
                className="uk-select uk-form-small"
                defaultValue={selected.status}
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
            )}
          </div>
        </div>
      );
  }

  function registerTaskID() {
    if (tasks?.length && (fn === "documents" || fn === "logs"))
      return (
        <div className="uk-width-1-1">
          <label
            className="uk-form-label uk-text-meta"
            htmlFor="form-stacked-text"
          >
            Task
          </label>
          <div className="uk-form-controls">
            <select
              {...register("task_id")}
              className="uk-select uk-form-small"
            >
              {tasks.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
  }

  function registerUserID() {
    if (fn !== "project_groups")
      return (
        <div className="uk-width-1-1">
          <label
            className="uk-form-label uk-text-meta"
            htmlFor="form-stacked-text"
          >
            Owner
          </label>
          <div className="uk-form-controls">
            <select
              {...register("user_id")}
              className="uk-select uk-form-small"
              disabled={true}
            >
              <option value={user.id}>{user.email}</option>
            </select>
          </div>
        </div>
      );
  }

  return (
    <div
      id={`insert-${fn}`}
      className="uk-card uk-card-default uk-card-small uk-card-body  uk-border-rounded"
    >
      <ul data-uk-accordion="animation: false">
        <li>
          <a
            className="uk-accordion-title uk-margin-large-bottom"
            href={`insert-${fn}`}
          >
            <div className="uk-text-meta uk-text-bold">{title}</div>
            <div className="uk-text-meta">
              Creates a project group in the portal.
            </div>
          </a>

          <form
            name="new-project"
            className="uk-form-stacked uk-margin uk-accordion-content"
            data-uk-grid
            onSubmit={handleSubmit(onSubmit)}
            hidden
          >
            {registerName()}

            {registerDescription()}

            {registerUserID()}

            {registerProjectID()}

            {registerTaskID()}

            {registerStatus()}

            {registerStartDate()}

            {registerEndDate()}

            {registerProjectGroupID()}

            {registerMilestoneID()}

            <div className="uk-width-1-1">
              <button
                type="submit"
                className="uk-button uk-button-primary uk-width-expand@s"
                disabled={!checked}
              >
                Create
              </button>
            </div>

            <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
              <label>
                <input
                  className="uk-checkbox uk-text-meta"
                  type="checkbox"
                  onChange={(e) => setChecked(!checked)}
                ></input>{" "}
                <span className="uk-text-meta">Confirm creation.</span>
              </label>
            </div>
          </form>
        </li>
      </ul>
    </div>
  );
}
