import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './UpdatePostPage.scss';

import MyPZContainer from '@mypz/react-kit/components/container/MyPZContainer';
import MyPZAlert from '@mypz/react-kit/components/alert/MyPZAlert';
import PostForm from '../../../components/form/post/PostForm';

import { showPost, updatePost } from '../../../api/blogs/postsApi';

const UpdatePostPage = () => {
  const history = useNavigate();
  const { slug } = useParams();

  const [isSuccess, setIsSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const callApi = async () => {
      try {
        const postResult = await showPost(slug);
        setPostData(postResult.post);
      } catch (error) {
        console.log('post get error:', error.message);
        setErrorAlert(error.message);
        history('/blogs/posts/create');
      }
    };
    callApi();
  }, [slug, history]);

  const handleSubmit = async (formData) => {
    const {
      title,
      slug,
      coverImageId,
      coverImageUrl,
      content,
      category,
      metaDescription,
      miniatureImageUrl,
      miniatureImageId,
      minutesToRead,
      publishedAt,
      shortDescription,
    } = formData;

    const params = {
      ...(title && postData.title !== title && { title }),
      ...(slug && postData.slug !== slug && { slug }),
      ...(coverImageId && { coverImageId }),
      ...(coverImageUrl && { coverImageUrl }),
      ...(postData.content !== content && { content }),
      ...(postData.category !== category && { category }),
      ...(postData.metaDescription !== metaDescription && { metaDescription }),
      ...(miniatureImageUrl && { miniatureImageUrl }),
      ...(miniatureImageId && { miniatureImageId }),
      ...(postData.minutesToRead !== minutesToRead && { minutesToRead: parseInt(minutesToRead) }),
      ...(postData.publishedAt !== publishedAt && { publishedAt }),
      ...(postData.shortDescription !== shortDescription && { shortDescription }),
    };

    setIsProcessing(true);
    try {
      await updatePost(postData.slug, params);
      setIsSuccess(true);
      if (postData.slug !== slug) {
        history(`/blogs/posts/update/${slug}`);
      }
    } catch (e) {
      console.log('post update error:', e.message);
      setErrorAlert(e.message);
    }
    setIsProcessing(false);
  };

  const renderAlert = () => {
    if (isSuccess) {
      return (<MyPZAlert>Post Updated</MyPZAlert>);
    }

    if (errorAlert) {
      return (<MyPZAlert type="error">{errorAlert}</MyPZAlert>);
    }

    return null;
  };

  return (
    <div className="page-update-post">
      <MyPZContainer>
        {renderAlert()}
        <h1>Update Post</h1>
        <PostForm post={postData} isProcessing={isProcessing} onSubmit={handleSubmit} isUpdate />
      </MyPZContainer>
    </div>
  );
}

export default UpdatePostPage;
