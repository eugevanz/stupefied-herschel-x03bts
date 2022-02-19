import { useState } from 'react';

export function DeleteMatchingRows({ selected, table, client }) {
  const { err, setError } = useState(null);
  const [checked, setChecked] = useState(false);

  async function onDelete() {
    const { data, error } = await client
      .from(table)
      .delete()
      .eq('id', selected.id);
    
    if (data) console.log(data);
    if (error) setError(error.message);
  }

  if (err) return (<div className='uk-card uk-card-danger uk-card-body  uk-border-rounded uk-margin'>
    <div className='uk-card-title'><b>Delete unsuccessful. Try again</b></div>
  </div>);

  return (<div className='uk-card uk-card-danger uk-card-body uk-border-rounded uk-card-small'>
    <div className='uk-text-small uk-margin'><span data-uk-icon='icon: warning'>&#8203;</span> This action cannot be undone</div>
    <div className='uk-width-1-1'>
      <button type='submit' className='uk-button uk-border-rounded uk-button-danger uk-width-expand@s' onClick={ onDelete } disabled={ !checked }>Delete</button>
    </div>

    <div className='uk-margin uk-grid-small uk-child-width-auto uk-grid'>
        <label><input className='uk-checkbox uk-text-meta' type='checkbox' onChange={ e => setChecked(!checked) }></input> <span className='uk-text-meta'>Confirm delete.</span></label>
      </div>
  </div>);
}