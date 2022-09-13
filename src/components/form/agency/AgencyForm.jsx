import React, { useState, useEffect } from 'react';

import './AgencyForm.scss';

import MyPZTextField from '@mypz/react-kit/components/inputs/textField/MyPZTextField';
import MyPZButton from '@mypz/react-kit/components/inputs/button/MyPZButton';
import MyPZTextArea from '@mypz/react-kit/components/inputs/textArea/MyPZTextArea';

import ImageCrop from '../../imageCrop/ImageCrop';

const initialData = {
  name: '',
  imageId: null,
  imageUrl: null,
  email: '',
  address: '',
  phone: '',
  mobile: '',
  whatsapp: '',
  fax: '',
  license: '',
  tax: '',
  website: '',
  instagram: '',
  facebook: '',
  youtube: '',
  language: '',
  rera: '',
  notificationEmails: '',
};

const AgencyForm = (props) => {
  const { agency, isProcessing, onSubmit, isUpdate } = props;
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (key) => (e) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  useEffect(() => {
    if (agency) {
      setFormData({...initialData, ...agency});
    }
  }, [agency]);

  const onGameImageUploaded = (imageId, imageUrl) => {
    setFormData({...formData, ...{imageId, imageUrl}});
  };

  const isValidForm = () => {
    return !!formData.name && (!!formData.imageId || !!formData.imageUrl) && !!formData.email && !!formData.license;
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
        <div className="form-agency__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Name" placeholder="Agency name" onChange={handleInputChange('name')} value={formData.name} />
        </div>
        <div className="form-agency__field">
          <ImageCrop
            onImageUploaded={onGameImageUploaded}
            imageWidth={150}
            imageHeight={150}
            uploadButtonLabel='Add Agency Image'
            imageUrl={formData.imageUrl}
          />
        </div>
        <div className="form-agency__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Web Site" placeholder="https://agency-website.com" onChange={handleInputChange('website')} value={formData.website} />
        </div>
        <div className="form-agency__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Email" placeholder="email@email.com" onChange={handleInputChange('email')} value={formData.email} />
        </div>
        <div className="form-agency__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Phone" placeholder="+971 xxx xxx xxx" onChange={handleInputChange('phone')} value={formData.phone} />
        </div>
        <div className="form-agency__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Mobile" placeholder="+971 xxx xxx xxx" onChange={handleInputChange('mobile')} value={formData.mobile} />
        </div>
        <div className="form-agency__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Whatsapp" placeholder="+971 xxx xxx xxx" onChange={handleInputChange('whatsapp')} value={formData.whatsapp} />
        </div>
        <div className="form-agency__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Fax" placeholder="+971 xxx xxx xxx" onChange={handleInputChange('fax')} value={formData.fax} />
        </div>

        <div className="form-agency__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Address" placeholder="Falcon City Villas, Falcon City Of Wonders, Dubai" onChange={handleInputChange('address')} value={formData.address} />
        </div>
        <div className="form-agency__field">
          <MyPZTextField disabled={isProcessing} type="text" label="License" placeholder="LICENSE" onChange={handleInputChange('license')} value={formData.license} />
        </div>
        <div className="form-agency__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Tax" onChange={handleInputChange('tax')} value={formData.tax} />
        </div>
        <div className="form-agency__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Instagram" placeholder="@instagram" onChange={handleInputChange('instagram')} value={formData.instagram} />
        </div>
        <div className="form-agency__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Facebook" placeholder="Facebook account" onChange={handleInputChange('facebook')} value={formData.facebook} />
        </div>
        <div className="form-agency__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Linkedin" placeholder="Linkedin Name" onChange={handleInputChange('linkedin')} value={formData.linkedin} />
        </div>
        <div className="form-agency__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Youtube" placeholder="Youtube channel" onChange={handleInputChange('youtube')} value={formData.youtube} />
        </div>
        <div className="form-agency__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Languages" placeholder="French, English, Arabe" onChange={handleInputChange('language')} value={formData.language} />
        </div>
        <div className="form-agency__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Rera" onChange={handleInputChange('rera')} value={formData.rera} />
        </div>
        <div className="form-agency__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Notification Emails" placeholder="manager@agency.com,manager2@agency.com" onChange={handleInputChange('notificationEmails')} value={formData.notificationEmails} />
        </div>
        <div className="form-agency__field">
          <span className="form-agency__field__label">Description</span>
          <MyPZTextArea onChange={handleInputChange('description')} value={formData.description} />
        </div>
        <MyPZButton disabled={isProcessing || !isValidForm()} onClick={handleSubmit}>{isUpdate ? 'Update' : 'Create'}</MyPZButton>
      </form>
    </>
  );
}

export default AgencyForm;
