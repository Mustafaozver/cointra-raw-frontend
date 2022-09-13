import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MyPZContainer from '@mypz/react-kit/components/container/MyPZContainer';
import MyPZAlert from '@mypz/react-kit/components/alert/MyPZAlert';

import './CreateAgentPage.scss';

import AgentForm from '../../../components/form/agent/AgentForm';

import { listAgencies } from '../../../api/agencies/agenciesApi';
import { createAgent } from '../../../api/agents/agentsApi';

export const CreateAgentPage = () => {
  const history = useNavigate();

  const [errorAlert, setErrorAlert] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agenciesOptions, setAgenciesOptions] = useState(null);

  useEffect(() => {
    const callApi = async () => {
      const agenciesResult = await listAgencies();

      const agenciesTransformed = agenciesResult.agencies.map((a) => ({
        text: a.name,
        value: a.id,
      }));
      setAgenciesOptions(agenciesTransformed);
    };

    callApi();
  }, []);

  const handleSubmit = async (formData) => {
    setIsProcessing(true);

    try {
      const agentsResult = await createAgent(formData);
      history(`/agents/update/${agentsResult.agent.slug}`);
    } catch (e) {
      console.log('agent create error:', e.message);
      setErrorAlert(e.message);
    }
    setIsProcessing(false);
  };

  const renderAlert = () => {
    if (!errorAlert) {
      return null;
    }
    
    return (<MyPZAlert type="error">{errorAlert}</MyPZAlert>);
  };

  return (
    <div className="page-create-agent">
      <MyPZContainer>
        {renderAlert()}
        <h1>Create Agent</h1>
        <AgentForm isProcessing={isProcessing} onSubmit={handleSubmit} agencies={agenciesOptions} />
      </MyPZContainer>
    </div>
  );
};

export default CreateAgentPage;
