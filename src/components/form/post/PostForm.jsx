import React, { useState, useEffect } from 'react';
import { convert } from 'url-slug';
import moment from 'moment';

import './PostForm.scss';

import MyPZTextField from '@mypz/react-kit/components/inputs/textField/MyPZTextField';
import MyPZButton from '@mypz/react-kit/components/inputs/button/MyPZButton';
import MyPZRichText from '@mypz/react-kit/components/inputs/richText/MyPZRichText';
import MyPZSelect from '@mypz/react-kit/components/inputs/select/MyPZSelect';
import DatetimePicker from '@mypz/react-kit/components/inputs/datetimePicker/DatetimePicker';

import ImageCrop from '../../imageCrop/ImageCrop';

const initialData = {
  title: '',
  slug: '',
  category: 'blog',
  coverImageId: null,
  coverImageUrl: null,
  miniatureImageId: null,
  miniatureImageUrl: null,
  content: '',
  minutesToRead: 5,
  shortDescription: '',
  metaDescription: '',
  publishedAt: moment(),
};

const categoryOptionTypes = [
  {
    value: 'blog',
    text: 'Blog',
  },
  {
    value: 'guide',
    text: 'Guide',
  },
];

const PostForm = (props) => {
  const { post, isProcessing, onSubmit, isUpdate } = props;
  const [formData, setFormData] = useState(initialData);

  const handleTimeChange = (key) => (time) => {
    setFormData({ ...formData, [key]: time});
  };

  const handleInputChange = (key) => (e) => {
    const newFormData = { ...formData, [key]: e.target.value };
    if (key === 'title' || key === 'slug') {
      newFormData.slug = convert(e.target.value);
    }
    if (key === 'minutesToRead') {
      newFormData[key] = parseInt(e.target.value);
    }
    setFormData(newFormData);
  };

  const handleRichTextChange = (key) => (v) => {
    setFormData({ ...formData, [key]: v });
  }

  useEffect(() => {
    if (post) {
      setFormData({...initialData, ...post});
    }
  }, [post]);

  const onCoverImageUploaded = (coverImageId, coverImageUrl) => {
    setFormData({...formData, ...{coverImageId, coverImageUrl}});
  };

  const onMiniatureImageUploaded = (miniatureImageId, coverImageUrl) => {
    setFormData({...formData, ...{miniatureImageId, coverImageUrl}});
  };

  const isValidForm = () => {
    return !!formData.title && !!formData.content && !!formData.title &&
      (!!formData.coverImageId || !!formData.coverImageUrl) &&
      (!!formData.miniatureImageId || !!formData.miniatureImageUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);

    if (!isValidForm()) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-post__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Title" placeholder="Post title" onChange={handleInputChange('title')} value={formData.title} />
        </div>
        <div className="form-post__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Slug" placeholder="Post slug / url" onChange={handleInputChange('slug')} value={formData.slug} />
        </div>
        <div className="form-post__field">
          <MyPZSelect
            label="Category"
            value={formData.category}
            onChange={handleInputChange('category')}
            options={categoryOptionTypes}
          />
        </div>
        <div className="form-post__field">
          <ImageCrop
            onImageUploaded={onCoverImageUploaded}
            imageWidth={1440}
            imageHeight={600}
            uploadButtonLabel='Add Post Cover Image'
            coverImageUrl={formData.coverImageUrl}
          />
        </div>
        <div className="form-post__field">
          <ImageCrop
            onImageUploaded={onMiniatureImageUploaded}
            imageWidth={300}
            imageHeight={210}
            uploadButtonLabel='Add Post Miniature Image'
            coverImageUrl={formData.miniatureImageUrl}
          />
        </div>
        <div className="form-post__field">
          <span className="form-post__field__label">Content</span>
          <MyPZRichText
            onChange={handleRichTextChange('content')}
            value={formData.content}
          />
        </div>
        <div className="form-post__field">
          <MyPZTextField disabled={isProcessing} type="number" label="Minutes to Read" placeholder="5" onChange={handleInputChange('minutesToRead')} value={formData.minutesToRead} />
        </div>
        <div className="form-post__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Short Description" placeholder="Short description..." onChange={handleInputChange('shortDescription')} value={formData.shortDescription} />
        </div>
        <div className="form-post__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Meta Description" placeholder="some keywords for meta description..." onChange={handleInputChange('metaDescription')} value={formData.metaDescription} />
        </div>
        <div className="form-post__field">
          <DatetimePicker
            label="Published At"
            value={formData.publishedAt}
            onChange={handleTimeChange('publishedAt')}
            />
        </div>
        <MyPZButton disabled={isProcessing || !isValidForm()} onClick={handleSubmit}>{isUpdate ? 'Update' : 'Create'}</MyPZButton>
      </form>
    </>
  );
}

export default PostForm;
