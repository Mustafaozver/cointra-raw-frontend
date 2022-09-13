import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import MyPZContainer from '@mypz/react-kit/components/container/MyPZContainer';
import MyPZAlert from '@mypz/react-kit/components/alert/MyPZAlert';

import './UpdateAgentPage.scss';

import AgentForm from '../../../components/form/agent/AgentForm';

import { listAgencies } from '../../../api/agencies/agenciesApi';
import { updateAgent, showAgent } from '../../../api/agents/agentsApi';

export const UpdateAgentPage = () => {
  const history = useNavigate();
  const { slug } = useParams();

  const [agentData, setAgentData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agenciesOptions, setAgenciesOptions] = useState(null);

  useEffect(() => {
    Promise.all([
      showAgent(slug),
      listAgencies(),
    ]).then(([agentResult, agenciesResult]) => {
      const agenciesTransformed = agenciesResult.agencies.map((a) => ({
        text: a.name,
        value: a.id,
      }));
      setAgentData(agentResult.agent);
      setAgenciesOptions(agenciesTransformed);
    }).catch((error) => {
      setErrorAlert(error.message);
      history('/agents/create');
    });
  }, [slug, history]);

  const handleSubmit = async (formData) => {
    const {
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
      linkedin,
      email,
    } = formData;

    const params = {
      ...(firstName && agentData.firstName !== firstName && { firstName }),
      ...(lastName && agentData.lastName !== lastName && { lastName }),
      ...(license && agentData.license !== license && { license }),
      ...(imageId && { imageId }),
      ...(email && agentData.email !== email && { email }),
      ...(phone && agentData.phone !== phone && { phone }),
      ...(agencyId && agentData.agencyId !== agencyId && { agencyId }),
      ...(address && agentData.address !== address && { address }),
      ...(facebook && agentData.facebook !== facebook && { facebook }),
      ...(fax && agentData.fax !== fax && { fax }),
      ...(language && agentData.language !== language && { language }),
      ...(mobile && agentData.mobile !== mobile && { mobile }),
      ...(skype && agentData.skype !== skype && { skype }),
      ...(tax && agentData.tax !== tax && { tax }),
      ...(twitter && agentData.twitter !== twitter && { twitter }),
      ...(website && agentData.website !== website && { website }),
      ...(whatsapp && agentData.whatsapp !== whatsapp && { whatsapp }),
      ...(youtube && agentData.youtube !== youtube && { youtube }),
      ...(linkedin && agentData.linkedin !== linkedin && { linkedin }),
    };

    setIsProcessing(true);

    try {
      await updateAgent(slug, params);
      setIsSuccess(true);
      setIsProcessing(false);
    } catch (e) {
      console.log('agent update error:', e.message);
      setErrorAlert(e.message);
    }
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

  return (
    <div className="page-update-agent">
      <MyPZContainer>
        {renderAlert()}
        <h1>Update Agent</h1>
        <AgentForm
          isProcessing={isProcessing}
          onSubmit={handleSubmit}
          agencies={agenciesOptions}
          agent={agentData}
          isUpdate
        />
      </MyPZContainer>
    </div>
  );
};

export default UpdateAgentPage;
