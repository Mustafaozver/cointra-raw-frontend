import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './UpdateAgencyPage.scss';

import MyPZContainer from '@mypz/react-kit/components/container/MyPZContainer';
import MyPZAlert from '@mypz/react-kit/components/alert/MyPZAlert';
import MyPZButton from '@mypz/react-kit/components/inputs/button/MyPZButton';
import AgencyForm from '../../../components/form/agency/AgencyForm';

import {disableAgency, showAgency, updateAgency} from '../../../api/agencies/agenciesApi';

const UpdateAgencyPage = () => {
  const history = useNavigate();
  const { slug } = useParams();

  const [isSuccess, setIsSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [agencyData, setAgencyData] = useState(null);

  useEffect(() => {
    const callApi = async () => {
      try {
        const agencyResult = await showAgency(slug);
        setAgencyData(agencyResult.agency);
      } catch (error) {
        console.log('agency get error:', error.message);
        setErrorAlert(error.message);
        history('/agencies/create');
      }
    };
    callApi();
  }, [slug, history]);

  const handleSubmit = async (formData) => {
    const {
      name,
      imageId,
      email,
      address,
      phone,
      mobile,
      fax,
      whatsapp,
      license,
      tax,
      website,
      instagram,
      facebook,
      linkedin,
      youtube,
      language,
      description,
      notificationEmails,
      rera,
    } = formData;

    const params = {
      ...(name && agencyData.name !== name && { name }),
      ...(imageId && { imageId }),
      ...(email && agencyData.email !== email && { email }),
      ...(agencyData.address !== address && { address }),
      ...(agencyData.phone !== phone && { phone }),
      ...(agencyData.mobile !== mobile && { mobile }),
      ...(agencyData.whatsapp !== whatsapp && { whatsapp }),
      ...(agencyData.fax !== fax && { fax }),
      ...(license && agencyData.license !== license && { license }),
      ...(agencyData.tax !== tax && { tax }),
      ...(agencyData.website !== website && { website }),
      ...(agencyData.instagram !== instagram && { instagram }),
      ...(agencyData.facebook !== facebook && { facebook }),
      ...(agencyData.linkedin !== linkedin && { linkedin }),
      ...(agencyData.youtube !== youtube && { youtube }),
      ...(agencyData.language !== language && { language }),
      ...(agencyData.description !== description && { description }),
      ...(agencyData.rera !== rera && { rera }),
      ...(agencyData.notificationEmails !== notificationEmails && { notificationEmails }),
    };

    setIsProcessing(true);
    try {
      await updateAgency(slug, params);
      setIsSuccess(true);
    } catch (e) {
      console.log('agency update error:', e.message);
      setErrorAlert(e.message);
    }
    setIsProcessing(false);
  };

  const renderAlert = () => {
    if (isSuccess) {
      return (<MyPZAlert>Agency Updated</MyPZAlert>);
    }

    if (errorAlert) {
      return (<MyPZAlert type="error">{errorAlert}</MyPZAlert>);
    }

    return null;
  };

  const handleDisableAgency = async () => {
    try {
      await disableAgency(slug);
    } catch (e) {
      console.log('error:', e);
    }
  };

  const renderAgencyStatus = () => {
    if (!agencyData) {
      return null;
    }

    if (agencyData.status === 'disabled') {
      return (
        <div className="page-update-agency__status">
          <MyPZButton disabled={true}>Disabled</MyPZButton>
        </div>
      );
    }

    return (
      <div className="page-update-agency__status">
        <div className="page-update-agency__status-action">
          <MyPZButton onClick={handleDisableAgency}>Disable Agency</MyPZButton>
        </div>
      </div>
    );
  };

  return (
    <div className="page-update-agency">
      <MyPZContainer>
        {renderAlert()}
        <h1>Update Agency</h1>
        {renderAgencyStatus()}
        <AgencyForm agency={agencyData} isProcessing={isProcessing} onSubmit={handleSubmit} isUpdate />
      </MyPZContainer>
    </div>
  );
}

export default UpdateAgencyPage;
