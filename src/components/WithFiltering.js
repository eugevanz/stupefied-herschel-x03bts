import { useRef, useState } from 'react';
import moment from 'moment';
import { useSupabaseClient} from '../store';

export function WithFiltering({ setSelected, table, title }) {

  function ListItem({ item }) {
    const client = useRef(useSupabaseClient());
    const [confirmed, setconfirmed] = useState(false);
    const [status, setstatus] = useState('Active');

    function onChange(e) {
      e.preventDefault();
      if (e.target.value !== item.status) {
        setconfirmed(true);
        setstatus(e.target.value);
      }
      else setconfirmed(false);
    }

    function onClick() {
      if (confirmed) client.current
        .from('tasks')
        .update({ status })
        .eq('id', item.id)
        .then(() => setconfirmed(false))
        .catch(err => console.error(err));
    }

    function onSelect() {
      if (setSelected) setSelected(item);
    }

    return (<li key={ item.id } className='uk-margin'>
      <a className='uk-link-toggle uk-grid-medium uk-flex-middle' href='#list-item' data-uk-filter-control="[data-tags*='details']" onClick={ onSelect } data-uk-scroll data-uk-grid>

        <div className='uk-width-auto'>
          <img className='uk-border-circle' src={ `${ process.env.PUBLIC_URL }/images/art-hauntington-jzY0KRJopEI-unsplash.jpg` } width='36' height='36' alt='profile-pic'></img>
        </div>

        <div className='uk-width-expand'>
          <div className='uk-text-bold uk-text-link uk-margin-remove'>{ item.name ?? item.task_id }</div>
          <div className='uk-comment-meta uk-margin-remove-top'>Created on { moment(item.created_at).format('MMMM Do YYYY') }</div>
        </div>
      </a>
      
      { item.status ? <div className='uk-flex uk-margin-small'>
        <select className='uk-select uk-form-small uk-border-rounded uk-margin-right' onChange={ onChange } defaultValue={ item.status }>
          <option value='Active'>Active</option>
          <option value='Completed'>Completed</option>
        </select>
        <button className='uk-button uk-button-primary uk-button-small uk-border-rounded' onClick={ onClick } disabled={ !confirmed }>Confirm</button>
      </div> : null }
    </li>);
  }

  return (<div className='uk-card uk-card-small uk-card-body uk-card-default uk-border-rounded uk-margin-right'>
    <div className='uk-text-bold uk-text-small uk-text-muted uk-margin-large'>{ title }</div>
    <ul className='uk-list'>
      { table.length > 0 ? table.map(item => <ListItem key={ item.id } item={ item }></ListItem>) : <li><i>Nothing to show</i></li> }
    </ul>
  </div>);
}