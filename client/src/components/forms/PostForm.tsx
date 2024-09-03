import { useState } from 'react';
import Input from '../shared/Input';
import TextArea from '../shared/TextArea';
import FileUploader from '../shared/FileUploader';
import Button from '../shared/Button';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');

  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Input type='text' label='Title' name='title' value={title} setState={setTitle} placeholder='Your awesome title' />
        <TextArea label='Caption' placeholder='Your awesome caption' value={caption} setState={setCaption} />
        <FileUploader label='Add Meme' />
        <Input type='text' placeholder='Funny, Dark, Hilarious' label='Tags (separated by comma "," )' name='tags' value={tags} setState={setTags} />
        <span style={{ display: 'flex', alignSelf: 'flex-end', gap: '15px' }}>
          <Button className='post-cancel-button' type='button'>Cancel</Button>
          <Button className='post-submit-button' type='submit'>Submit</Button>
        </span>
      </form>
    </div>
  )
}

export default PostForm
