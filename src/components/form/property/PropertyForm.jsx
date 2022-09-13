import React, { useState, useEffect } from 'react';

import './PropertyForm.scss';

import MyPZTextField from '@mypz/react-kit/components/inputs/textField/MyPZTextField';
import MyPZButton from '@mypz/react-kit/components/inputs/button/MyPZButton';
import MyPZSelect from '@mypz/react-kit/components/inputs/select/MyPZSelect';
import MyPZTextArea from '@mypz/react-kit/components/inputs/textArea/MyPZTextArea';

import propertyTypesConfig from '../../../data/config/propertyTypesConfig';

const statusProperty = [
  { text: 'draft', value: 'draft' },
  { text: 'review', value: 'review' },
  { text: 'publish', value: 'publish' },
  { text: 'sold', value: 'sold' },
  { text: 'removed', value: 'removed' },
];

const businessTypeProperty = [
  { text: 'rent', value: 'rent' },
  { text: 'sale', value: 'sale' },
];

const categoryProperty = [
  { text: 'commercial', value: 'commercial' },
  { text: 'residential', value: 'residential' },
];

const completionProperty = [
  { text: 'ready', value: 'ready' },
  { text: 'off', value: 'off' },
];

const furnishProperty = [
  { text: 'full', value: 'full' },
  { text: 'not', value: 'not' },
  { text: 'partial', value: 'partial' },
];

export const PropertyForm = (props) => {
  const {
    property,
    isProcessing,
    onSubmit,
    isUpdate,
    agencies,
    agents,
  } = props;

  const [title, setTitle] = useState('');
  const [permitNumber, setPermitNumber] = useState('');
  const [price, setPrice] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [parkings, setParkings] = useState('');
  const [size, setSize] = useState('');

  const [description, setDescription] = useState('');
  
  const [geopoint, setGeopoint] = useState({
    lat: 0,
    lng: 0,
  });

  const [agencyId, setAgencyId] = useState('');
  const [agentId, setAgentId] = useState('');
  const [status, setStatus] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [category, setCategory] = useState('');
  const [completionStatus, setCompletionStatus] = useState('');
  const [furnish, setFurnish] = useState('');
  const [propertyType, setPropertyType] = useState('');

  useEffect(() => {
    if (property) {
      setTitle(property.title);
      setPermitNumber(property.permitNumber);
      setPrice(property.price);
      setBathrooms(property.bathrooms);
      setBedrooms(property.bedrooms);
      setParkings(property.parkings);
      setSize(property.size);
      setDescription(property.description);
      setGeopoint([property.lat, property.lng]);
      setAgencyId(property.agencyId);
      setAgentId(property.agentId);
      setStatus(property.status);
      setBusinessType(property.businessType);
      setCategory(property.category);
      setCompletionStatus(property.completionStatus);
      setFurnish(property.furnish);
      setPropertyType(property.propertyType);
    }
  }, [property]);

  const transformDataType = (data) => data.map((p) => ({
    text: p.value,
    value: p.code,
  }));

  const isValidForm = () => {
    return !!title && !!price && !!permitNumber;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    
    if (!isValidForm()) {
      return;
    }

    onSubmit({
      agencyId,
      agentId,
      status,
      title,
      description,
      businessType,
      category,
      price,
      bathrooms,
      bedrooms,
      parkings,
      size,
      permitNumber,
      completionStatus,
      furnish,
      propertyType,
      geopoint,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Title" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="text" label="Permit Number" placeholder="Permit Number" onChange={(e) => setPermitNumber(e.target.value)} value={permitNumber} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="number" label="Price" placeholder="Price" onChange={(e) => setPrice(e.target.value)} value={price} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="number" label="Bathrooms" placeholder="Bathrooms" onChange={(e) => setBathrooms(e.target.value)} value={bathrooms} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="number" label="Bedrooms" placeholder="Bedrooms" onChange={(e) => setBedrooms(e.target.value)} value={bedrooms} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="number" label="Parkings" placeholder="Parkings" onChange={(e) => setParkings(e.target.value)} value={parkings} />
        </div>
        <div className="form-agent__field">
          <MyPZTextField disabled={isProcessing} type="number" label="Size" placeholder="Area size" onChange={(e) => setSize(e.target.value)} value={size} />
        </div>
        <div className="form-agent__field">
          <MyPZTextArea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-agent__field">
          <MyPZSelect options={agencies || []} value={agencyId} onChange={(e) => setAgencyId(e.target.value)} label="Agency" />
        </div>
        <div className="form-agent__field">
          <MyPZSelect options={agents || []} value={agentId} onChange={(e) => setAgentId(e.target.value)} label="Agent" />
        </div>
        <div className="form-agent__field">
          <MyPZSelect options={statusProperty} value={status} onChange={(e) => setStatus(e.target.value)} label="Status" />
        </div>
        <div className="form-agent__field">
          <MyPZSelect options={businessTypeProperty} value={businessType} onChange={(e) => setBusinessType(e.target.value)} label="Business type" />
        </div>
        <div className="form-agent__field">
          <MyPZSelect options={categoryProperty} value={category} onChange={(e) => setCategory(e.target.value)} label="Category" />
        </div>
        <div className="form-agent__field">
          <MyPZSelect options={completionProperty} value={completionStatus} onChange={(e) => setCompletionStatus(e.target.value)} label="Completion status" />
        </div>
        <div className="form-agent__field">
          <MyPZSelect options={furnishProperty} value={furnish} onChange={(e) => setFurnish(e.target.value)} label="Furnish" />
        </div>
        <div className="form-agent__field">
          <MyPZSelect options={transformDataType(propertyTypesConfig)} value={propertyType} onChange={(e) => setPropertyType(e.target.value)} label="Type" />
        </div>
        <MyPZButton disabled={isProcessing || !isValidForm()} onClick={handleSubmit}>{isUpdate ? 'Update' : 'Create'}</MyPZButton>
      </form>
    </>
  );
}

export default PropertyForm;
