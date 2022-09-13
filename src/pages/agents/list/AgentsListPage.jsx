import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { MyPZContainer, MyPZTextField, MyPZButton, MyPZTable, MyPZPagination } from '@mypz/react-kit';

import './AgentsListPage.scss';

import {downloadAgentsListCSV, listAgents} from '../../../api/agents/agentsApi';

let delayer = null;

const AgentsListPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [listValues, setListValues] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const handleChangeValue = (e) => {
    setSearchValue(e.target.value);
  };

  const fetchList = async (email, pageRequest) => {
    const res = await listAgents({ email, page: pageRequest });
    setListValues(res.agents);
    setTotalItems(res.stats.totalItems);
    setTotalPages(res.stats.totalPages);
  };

  useEffect(() => {
    if (!searchValue) {
      fetchList(searchValue, page);
      return;
    }
    clearTimeout(delayer);
    delayer = setTimeout(() => {
      fetchList(searchValue, page);
    }, 500);
  }, [searchValue, page]);

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const handleDownloadCSV = async () => {
    setIsProcessing(true);
    await downloadAgentsListCSV();
    setIsProcessing(false);
  };

  const renderList = () => {
    return (<MyPZTable
      data={listValues}
      headRenders={[
        () => (<div>Id</div>),
        () => (<div>Email</div>),
        () => (<div>First name</div>),
        () => (<div>Last name</div>),
        () => (<div>Created</div>),
        () => (<div>Updated</div>),
        () => (<div>Actions</div>),
      ]}
      lineRenders={[
        (l) => (<div>{l.id}</div>),
        (l) => (<div>{l.email}</div>),
        (l) => (<div>{l.firstName}</div>),
        (l) => (<div>{l.lastName}</div>),
        (l) => (<div>{moment(l.createdAt).fromNow()}</div>),
        (l) => (<div>{moment(l.updatedAt).fromNow()}</div>),
        (l) => (<div className="page-agents-list__see-details">
          <Link to={`/agents/update/${l.slug}`}>
            <MyPZButton>Update</MyPZButton>
          </Link>
        </div>),
      ]}
    />);
  };

  return (
    <div className="page-agents-list">
      <MyPZContainer>
        <h1>Agents list</h1>
        <div className="page-agents-list__actions">
          <Link to='/agents/create'>
            <MyPZButton>Create New Agent</MyPZButton>
          </Link>
          <div>
            <MyPZButton disabled={isProcessing} onClick={handleDownloadCSV}>Download All Agents CSV</MyPZButton>
          </div>
        </div>
        <div className="page-agents-list__search-field">
          <MyPZTextField
            placeholder="Search by email"
            onChange={handleChangeValue}
            value={searchValue}
          />
        </div>
        <div>
          {renderList()}
        </div>
        <div className="page-agents-list__pagination-block">
          <div className="page-agents-list__pagination-block__total">
            {`${totalItems} Agents`}
          </div>
          <div className="page-agents-list__pagination-block__selector">
            <MyPZPagination
              maxPage={totalPages}
              currentPage={page}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </MyPZContainer>
    </div>
  );
}

export default AgentsListPage;
