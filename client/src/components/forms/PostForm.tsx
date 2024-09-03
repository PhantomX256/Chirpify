import { useState } from 'react';
import Input from '../shared/Input';
import TextArea from '../shared/TextArea';
import FileUploader from '../shared/FileUploader';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Input type='text' label='Title' name='title' value={title} setState={setTitle} placeholder='Your awesome title' />
        <TextArea label='Caption' placeholder='Your awesome caption' value={caption} setState={setCaption} />
        <FileUploader label='Add Meme' />
      </form>
    </div>
  )
}

export default PostForm
