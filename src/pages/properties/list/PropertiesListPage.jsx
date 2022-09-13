import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { MyPZContainer, MyPZTextField, MyPZButton, MyPZTable, MyPZPagination } from '@mypz/react-kit';

import './PropertiesListPage.scss';

import { listProperties } from '../../../api/properties/propertiesApi';

let delayer = null;

const PropertiesListPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [listValues, setListValues] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const handleChangeValue = (e) => {
    setSearchValue(e.target.value);
  };

  const fetchList = async (title, pageRequest) => {
    const res = await listProperties({ title, page: pageRequest });
    setListValues(res.properties);
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
        () => (<div>Title</div>),
        () => (<div>Reference</div>),
        () => (<div>Status</div>),
        () => (<div>Created</div>),
        () => (<div>Updated</div>),
        () => (<div>Actions</div>),
      ]}
      lineRenders={[
        (l) => (<div>{l.id}</div>),
        (l) => (<div>{l.title}</div>),
        (l) => (<div>{l.reference}</div>),
        (l) => (<div>{l.status}</div>),
        (l) => (<div>{moment(l.createdAt).fromNow()}</div>),
        (l) => (<div>{moment(l.updatedAt).fromNow()}</div>),
        (l) => (<div className="page-properties-list__see-details">
          <Link to={`/properties/update/${l.slug}`}>
            <MyPZButton>Update</MyPZButton>
          </Link>
        </div>),
      ]}
    />);
  };

  return (
    <div className="page-properties-list">
      <MyPZContainer>
        <h1>Properties list</h1>
        <div className="page-properties-list__create-new">
          <Link to='/properties/create'>
            <MyPZButton>Create Property</MyPZButton>
          </Link>
        </div>
        <div className="page-properties-list__search-field">
          <MyPZTextField
            placeholder="Search by title"
            onChange={handleChangeValue}
            value={searchValue}
          />
        </div>
        <div>
          {renderList()}
        </div>
        <div className="page-properties-list__pagination-block">
          <div className="page-properties-list__pagination-block__total">
            {`${totalItems} Properties`}
          </div>
          <div className="page-properties-list__pagination-block__selector">
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

export default PropertiesListPage;
