import { useState } from 'react';
import { FileWithPath } from 'react-dropzone';
import Input from '../shared/Input';
import TextArea from '../shared/TextArea';
import FileUploader from '../shared/FileUploader';
import Button from '../shared/Button';
import { useCreatePost } from '../../lib/react-query/queriesAndMutations';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();

  // Form states
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [tags, setTags] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // split the tags into an array of tags
    const tagArray = tags.split(',');

    // compile it into a single object
    const postData = {
      title,
      caption,
      file,
      tags: tagArray,
    };
  
    await createPost(postData);
  }

  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleSubmit}>
        {/* Input Fields */}
        <Input type='text' label='Title' name='title' value={title} setState={setTitle} placeholder='Your awesome title' />
        <TextArea label='Caption' placeholder='Your awesome caption' value={caption} setState={setCaption} />
        <FileUploader label='Add Meme' value={file} setState={setFile} />
        <Input type='text' placeholder='Funny, Dark, Hilarious' label='Tags (separated by comma "," )' name='tags' value={tags} setState={setTags} />
        
        {/* Submit button */}
        <span style={{ display: 'flex', alignSelf: 'flex-end', gap: '15px' }}>
          <Button className='post-cancel-button' type='button'>Cancel</Button>
          <Button className='post-submit-button' type='submit'>{isLoadingCreate ? "Creating..." : "Submit"}</Button>
        </span>
      </form>
    </div>
  )
}

export default PostForm
