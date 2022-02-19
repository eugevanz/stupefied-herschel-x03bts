import { useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'momentjs';

export function SearchAcrossProjects({ title, table, setSelected }) {
  const { register, handleSubmit, reset } = useForm();

  const [isOpen, setisOpen] = useState(false);
  const [filtered, setfiltered] = useState(null);

  function onSubmit({ search_text }) {
    setisOpen(true);
    if (search_text && table) {
      const searchText = search_text.toLowerCase();

      if (title === 'logs') 
      setfiltered(table.filter(item => (item.start).includes(searchText) || (item.end).includes(searchText)))
        else 
        setfiltered(table.filter(item => ((item.name).toLowerCase()).includes(searchText)));
    }
  }

  function onReset() {
    reset();
    setisOpen(false);
  }

  function ListItem({item}) {
    return (<li key={ item.id } className='uk-margin'>
      <a className='uk-link-toggle uk-grid-medium uk-flex-middle' href='#list-item' data-uk-filter-control="[data-tags*='details']" onClick={() => setSelected(item)} data-uk-scroll data-uk-grid>

        <div className='uk-width-auto'>
          <img className='uk-border-circle' src={ `${ process.env.PUBLIC_URL }/images/art-hauntington-jzY0KRJopEI-unsplash.jpg` } width='36' height='36' alt='profile-pic'></img>
        </div>

        <div className='uk-width-expand'>
          <div className='uk-text-bold uk-text-link uk-margin-remove'>{ item.name ?? item.task_id }</div>
          <div className='uk-comment-meta uk-margin-remove-top'>Created on { moment(item.created_at).format('MMMM Do YYYY') }</div>
        </div>
      </a>
    </li>);
  }

  return (<div className='uk-card-default uk-card-body uk-border-rounded'>
    <button className='uk-float-right' type='button' data-uk-close onClick={onReset}></button>
    <form className='uk-search uk-search-navbar' onSubmit={ handleSubmit(onSubmit) }>
      <span data-uk-search-icon></span>
      <input { ...register('search_text') } className='uk-search-input' type='search' placeholder={ title }></input>
    </form>
    {isOpen ? <div dat-uk-drop>
      <div className='uk-card uk-card-body uk-card-default'>
        <ul className='uk-list'>
          {filtered?.map(item => <ListItem item={item}></ListItem>)}
        </ul>
      </div>
    </div> : null}
  </div>);
}