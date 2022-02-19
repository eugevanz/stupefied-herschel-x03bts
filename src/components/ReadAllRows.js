import moment from 'moment';

export function ReadAllRows({ setSelected, contents, title }) {
  function onSelect(item) {
    if (setSelected) setSelected(item);
  }
  
  return (<div className='uk-card uk-card-secondary uk-card-small uk-card-body uk-border-rounded'>

    <div className='uk-width-expand uk-margin-large uk-text-bold uk-text-small uk-text-muted'>{ title }</div>

    <ul className='uk-list uk-list-large uk-list-divider uk-margin'>
      { contents.length > 0 ? contents.map(item => <li key={ item.id }>

        <a className='uk-link-toggle' href='#list-item' data-uk-filter-control="[data-tags*='details']" onClick={ () => onSelect(item) } data-uk-scroll>
          <div className='uk-text-bold uk-link-text'>{ (item.name).toUpperCase() }</div>
          <div className='uk-text-meta'>Created on { moment(item.created_at).format('MMMM Do YYYY') }</div>
        </a>

      </li>) : <li><i>Nothing to show</i></li> }
    </ul>
  </div>);
}