import React, { useState, useEffect } from 'react';

import './AgentForm.scss';

import MyPZTextField from '@mypz/react-kit/components/inputs/textField/MyPZTextField';
import MyPZButton from '@mypz/react-kit/components/inputs/button/MyPZButton';
import MyPZSelect from '@mypz/react-kit/components/inputs/select/MyPZSelect';

import ImageCrop from '../../imageCrop/ImageCrop';

export const AgentForm = (props) => {
  const { agent, isProcessing, onSubmit, isUpdate, agencies } = props;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [agencyId, setAgencyId] = useState('');
  const [email, setEmail] = useState('');
  const [facebook, setFacebook] = useState('');
  const [fax, setFax] = useState('');
  const [imageId, setImageId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [language, setLanguage] = useState('');
  const [license, setLicense] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [mobile, setMobile] = useState('');
  const [phone, setPhone] = useState('');
  const [skype, setSkype] = useState('');
  const [tax, setTax] = useState('');
  const [twitter, setTwitter] = useState('');
  const [website, setWebsite] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [youtube, setYoutube] = useState('');

  useEffect(() => {
    if (agent) {
      setFirstName(agent.firstName ?? '');
      setLastName(agent.lastName ?? '');
      setAddress(agent.address ?? '');
      setAgencyId(agent.agencyId);
      setEmail(agent.email ?? '');
      setFacebook(agent.facebook ?? '');
      setFax(agent.fax ?? '');
      setImageId(agent.imageId ?? null);
      setImageUrl(agent.imageUrl);
      setLanguage(agent.language ?? '');
      setLicense(agent.license ?? '');
      setMobile(agent.mobile ?? '');
      setPhone(agent.phone ?? '');
      setSkype(agent.skype ?? '');
      setTax(agent.tax ?? '');
      setTwitter(agent.twitter ?? '');
      setWebsite(agent.website ?? '');
      setWhatsapp(agent.whatsapp ?? '');
      setYoutube(agent.youtube ?? '');
      setLinkedin(agent.linkedin ?? '');
    }
  }, [agent]);

  const onImageUploaded = (imageId, imageUrl) => {
    setImageId(imageId);
    setImageUrl(imageUrl);
  }

  const isValidForm = () => {
    return !!firstName && !!lastName && !!agencyId && (!!imageId || !!imageUrl) && !!email && !!license;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    
    if (!isValidForm()) {
      return;
    }

    onSubmit({
      firstName,
      lastName,
      address,
      agencyId,
      facebook,
      fax,
      imageId,
      language,
      license,
      mobile,
      phone,
      skype,
      tax,
      twitter,
      website,
      whatsapp,
      youtube,
      email,
      linkedin,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="First Name" placeholder="Agent firstname" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Last Name" placeholder="Agent lastname" onChange={(e) => setLastName(e.target.value)} value={lastName} />
        </div>
        <div className="form-agent__field">
          <ImageCrop
            onImageUploaded={onImageUploaded}
            imageWidth={150}
            imageHeight={150}
            uploadButtonLabel='Add Agent Image'
            imageUrl={imageUrl}
          />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Email" placeholder="email@email.com" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="License" onChange={(e) => setLicense(e.target.value)} value={license} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Tax" onChange={(e) => setTax(e.target.value)} value={tax} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Phone" placeholder="+971 xxx xxx xxx" onChange={(e) => setPhone(e.target.value)} value={phone} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Mobile" placeholder="+971 xxx xxx xxx" onChange={(e) => setMobile(e.target.value)} value={mobile} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Whatsapp" placeholder="Whatsapp number" onChange={(e) => setWhatsapp(e.target.value)} value={whatsapp} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Fax" onChange={(e) => setFax(e.target.value)} value={fax} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Address" placeholder="Falcon City Villas, Falcon City Of Wonders, Dubai" onChange={(e) => setAddress(e.target.value)} value={address} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Facebook" placeholder="Facebook account" onChange={(e) => setFacebook(e.target.value)} value={facebook} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Linkedin" placeholder="Linkedin account" onChange={(e) => setLinkedin(e.target.value)} value={linkedin} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Skype" placeholder="Skype ID" onChange={(e) => setSkype(e.target.value)} value={skype} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Twitter" placeholder="Twitter account" onChange={(e) => setTwitter(e.target.value)} value={twitter} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Youtube" placeholder="Youtube channel" onChange={(e) => setYoutube(e.target.value)} value={youtube} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Website" placeholder="https://agent-website.com" onChange={(e) => setWebsite(e.target.value)} value={website} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Languages" placeholder="English, French, Arabe" onChange={(e) => setLanguage(e.target.value)} value={language} />
        </div>
        <div className="form-agent__field">
          <MyPZSelect options={agencies || []} value={agencyId} onChange={(e) => setAgencyId(e.target.value)} label="Agency" />
        </div>
        <MyPZButton disabled={isProcessing || !isValidForm()} onClick={handleSubmit}>{isUpdate ? 'Update' : 'Create'}</MyPZButton>
      </form>
    </>
  );
}

export default AgentForm;
