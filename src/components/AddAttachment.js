export function AddAttachment({ title }) {
  return (<div className='uk-card data-uk-card-default uk-card-body  uk-border-rounded uk-margin'>
    <div className='uk-card-title uk-margin-remove-bottom'><i>Add { title } Attachment</i></div>
    <div className='uk-text-default'>Get all the projects in the portal for the logged in user.</div>
    <div className='js-upload uk-inline uk-margin-small-right' data-uk-tooltip='title: Add attachments to a task; pos: left' data-form-custom>
      <input type='file' data-multiple></input>
      <a href='#href' className='uk-icon-button' data-uk-icon='icon: cloud-upload'><span>&#8203;</span></a>
    </div>
  </div>); 
}