import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './CreatePostPage.scss';

import MyPZContainer from '@mypz/react-kit/components/container/MyPZContainer';
import MyPZAlert from '@mypz/react-kit/components/alert/MyPZAlert';
import { createPost } from '../../../api/blogs/postsApi';
import PostForm from '../../../components/form/post/PostForm';

const CreatePostPage = () => {
  const history = useNavigate();

  const [errorAlert, setErrorAlert] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (formData) => {
    setIsProcessing(true);
    try {
      await createPost(formData);
      history(`/blogs/posts/update/${formData.slug}`);
    } catch (e) {
      console.log('post create error:', e.message);
      setErrorAlert(e.message);
    }
    setIsProcessing(false);
  };

  const renderAlert = () => {
    if (errorAlert) {
      return (<MyPZAlert type="error">{errorAlert}</MyPZAlert>);
    }

    return null;
  };

  return (
    <div className="page-create-post">
      <MyPZContainer>
        {renderAlert()}
        <h1>Create Post</h1>
        <PostForm isProcessing={isProcessing} onSubmit={handleSubmit} />
      </MyPZContainer>
    </div>
  );
}

export default CreatePostPage;
