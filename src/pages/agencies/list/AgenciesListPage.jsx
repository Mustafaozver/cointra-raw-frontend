import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { MyPZContainer, MyPZTextField, MyPZButton, MyPZTable, MyPZPagination } from '@mypz/react-kit';

import './AgenciesListPage.scss';

import { listAgencies } from '../../../api/agencies/agenciesApi';

let delayer = null;

const AgenciesListPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [listValues, setListValues] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const handleChangeValue = (e) => {
    setSearchValue(e.target.value);
  };

  const fetchList = async (name, pageRequest) => {
    const res = await listAgencies({ name, page: pageRequest });
    setListValues(res.agencies);
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

  const renderList = () => {
    return (<MyPZTable
      data={listValues}
      headRenders={[
        () => (<div>Id</div>),
        () => (<div>Name</div>),
        () => (<div>Created</div>),
        () => (<div>Updated</div>),
        () => (<div>Actions</div>),
      ]}
      lineRenders={[
        (l) => (<div>{l.id}</div>),
        (l) => (<div>{l.name}</div>),
        (l) => (<div>{moment(l.createdAt).fromNow()}</div>),
        (l) => (<div>{moment(l.updatedAt).fromNow()}</div>),
        (l) => (<div className="page-agencies-list__see-details">
          <Link to={`/agencies/update/${l.slug}`}>
            <MyPZButton>Update</MyPZButton>
          </Link>
        </div>),
      ]}
    />);
  };

  return (
    <div className="page-agencies-list">
      <MyPZContainer>
        <h1>Agencies list</h1>
        <div className="page-agencies-list__create-new">
          <Link to='/agencies/create'>
            <MyPZButton>Create Agency</MyPZButton>
          </Link>
        </div>
        <div className="page-agencies-list__search-field">
          <MyPZTextField
            placeholder="Search by name"
            onChange={handleChangeValue}
            value={searchValue}
          />
        </div>
        <div>
          {renderList()}
        </div>
        <div className="page-agencies-list__pagination-block">
          <div className="page-agencies-list__pagination-block__total">
            {`${totalItems} Agencies`}
          </div>
          <div className="page-agencies-list__pagination-block__selector">
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

export default AgenciesListPage;
