import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './CreateAgencyPage.scss';

import MyPZContainer from '@mypz/react-kit/components/container/MyPZContainer';
import MyPZAlert from '@mypz/react-kit/components/alert/MyPZAlert';
import AgencyForm from '../../../components/form/agency/AgencyForm';

import { createAgency } from '../../../api/agencies/agenciesApi';

const CreateAgencyPage = () => {
  const history = useNavigate();

  const [errorAlert, setErrorAlert] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (formData) => {
    setIsProcessing(true);
    try {
      const agencyResult = await createAgency(formData);
      history(`/agencies/update/${agencyResult.agency.slug}`);
    } catch (e) {
      console.log('agency create error:', e.message);
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
    <div className="page-create-agency">
      <MyPZContainer>
        {renderAlert()}
        <h1>Create Agency</h1>
        <AgencyForm isProcessing={isProcessing} onSubmit={handleSubmit} />
      </MyPZContainer>
    </div>
  );
}

export default CreateAgencyPage;
