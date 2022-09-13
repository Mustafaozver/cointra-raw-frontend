import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MyPZContainer from '@mypz/react-kit/components/container/MyPZContainer';
import MyPZAlert from '@mypz/react-kit/components/alert/MyPZAlert';

import './PropertiesUpdatePage.scss';

import PropertyForm from '../../../components/form/property/PropertyForm';

import { listAgencies } from '../../../api/agencies/agenciesApi';
import { listAgents } from '../../../api/agents/agentsApi';

import { updateProperty ,showProperty } from '../../../api/properties/propertiesApi';

const PropertiesUpdatePage = () => {
  const history = useNavigate();
  const { slug } = useParams();

  const [propertyData, setPropertyData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentsData, setAgentsData] = useState(null);
  const [agenciesOptions, setAgenciesOptions] = useState(null);

  useEffect(() => {
    Promise.all([
      showProperty(slug),
      listAgencies(),
      listAgents(),
    ]).then(([propertyResult, agenciesResult, agentsResult]) => {
      const agenciesTransformed = agenciesResult.agencies.map((a) => ({
        text: a.name,
        value: a.id,
      }));

      const agentsTransformed = agentsResult.agents.map((a) => ({
        text: `${a.firstName} ${a.lastName}`,
        value: a.id,
      }));

      setPropertyData(propertyResult.property);
      setAgentsData(agentsTransformed);
      setAgenciesOptions(agenciesTransformed);
    }).catch((error) => {
      setErrorAlert(error.message);
      history('/properties');
    });
  }, [slug, history]);

  const handleSubmit = async (formData) => {
    const {
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
      // geopoint,
    } = formData;

    const params = {
      ...(status && propertyData.status !== status && { status }),
      ...(title && propertyData.title !== title && { title }),
      ...(description && propertyData.description !== description && { description }),
      ...(businessType && propertyData.businessType !== businessType && { businessType }),
      ...(category && propertyData.category !== category && { category }),
      ...(price && propertyData.price !== price && { price }),
      ...(bathrooms && propertyData.bathrooms !== bathrooms && { bathrooms }),
      ...(bedrooms && propertyData.bedrooms !== bedrooms && { bedrooms }),
      ...(parkings && propertyData.parkings !== parkings && { parkings }),
      ...(size && propertyData.size !== size && { size }),
      ...(permitNumber && propertyData.permitNumber !== permitNumber && { permitNumber }),
      ...(completionStatus && propertyData.completionStatus !== completionStatus && { completionStatus }),
      ...(furnish && propertyData.furnish !== furnish && { furnish }),
      ...(propertyType && propertyData.propertyType !== propertyType && { propertyType }),
      // ...(geopoint && propertyData.geopoint !== geopoint && { geopoint }),
      ...(propertyData.agencyId !== agencyId && { agencyId }),
      ...(propertyData.agentId !== agentId && { agentId }),
    };

    setIsProcessing(true);

    try {
      const isSuccessUpdate = await updateProperty(slug, params);

      if (isSuccessUpdate.err) {
        setErrorAlert(isSuccessUpdate.err);
        setIsSuccess(false);
      } else {
        setIsSuccess(true);
      }

      setIsProcessing(false);
    } catch (e) {
      console.log('agent update error:', e.message);
      setErrorAlert(e.message);
    }
  };

  const renderAlert = () => {
    if (isSuccess) {
      return (<MyPZAlert>Property Updated</MyPZAlert>);
    }

    if (errorAlert) {
      return (<MyPZAlert type="error">{errorAlert}</MyPZAlert>);
    }

    return null;
  };

  return (
    <div className="page-update-property">
      <MyPZContainer>
        {renderAlert()}
        <h1>Update Property</h1>
        <PropertyForm
          isProcessing={isProcessing}
          onSubmit={handleSubmit}
          agencies={agenciesOptions}
          agents={agentsData}
          property={propertyData}
          isUpdate
        />
      </MyPZContainer>
    </div>
  );
};

export default PropertiesUpdatePage;
