import React, { useState, useEffect } from 'react';
import {
  MyPZContainer,
  MyPZTextField,
  MyPZButton,
  MyPZhelpers,
  MyPZTable,
  MyPZSelect,
  MyPZAlert,
  MyPZPagination
} from '@mypz/react-kit';
import moment from 'moment';

import './ImportTrackingsListPage.scss';

import { getAllImportTrackings } from '../../../api/properties/propertyImportTrackingsApi';
import { importPropertiesFromUrl } from '../../../api/properties/propertiesApi';
import { adminListAgencies } from '../../../api/agencies/agenciesApi';

const ImportTrackingsListPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importUrl, setImportUrl] = useState('');
  const [agencyId, setAgencyId] = useState('');
  const [importTrackings, setImportTrackings] = useState([]);
  const [agenciesOptions, setAgenciesOptions] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchAgenciesList();
  }, []);

  const fetchAgenciesList = async () => {
    const agenciesResult = await adminListAgencies();
    const agenciesTransformed = agenciesResult.agencies.map((a) => ({
      text: a.name,
      value: a.id,
    }));
    setAgenciesOptions(agenciesTransformed);
  };

  useEffect(() => {
    fetchList(page);
  }, [page]);

  const fetchList = async (pageRequest) => {
    const res = await getAllImportTrackings(pageRequest);
    setImportTrackings(res.importTrackings);
    setTotalItems(res.stats.totalItems);
    setTotalPages(res.stats.totalPages);
  };

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  const renderList = () => {
    return (<MyPZTable
      data={importTrackings}
      headRenders={[
        () => (<div>Id</div>),
        () => (<div>Agency</div>),
        () => (<div>Url</div>),
        () => (<div>Started</div>),
        () => (<div>Status</div>),
        () => (<div>Progress</div>),
        () => (<div>Created</div>),
        () => (<div>Updated</div>),
        () => (<div>Skipped / Failed</div>),
        () => (<div>Speed (per min)</div>),
      ]}
      lineRenders={[
        (it) => (<div>{it.id}</div>),
        (it) => (<div>{it.agency.name}</div>),
        (it) => (<div className='page-tracking-import-list__url_data' title={it.url}>{it.url}</div>),
        (it) => (<div>{moment(it.createdAt).fromNow()}</div>),
        (it) => (<div>{it.status === 'processing' && moment.duration(moment().diff(moment(it.updatedAt))).asMinutes() > 10 ? 'interrupted' : it.status}</div>),
        (it) => (<div>{(it.completedCount / it.totalCount * 100).toFixed()}% ({it.completedCount} / {it.totalCount})</div>),
        (it) => (<div>{it.createdCount}</div>),
        (it) => (<div>{it.updatedCount}</div>),
        (it) => (<div>{it.failedCount}</div>),
        (it) => (<div>{Math.round(it.completedCount / (moment.duration(moment(it.updatedAt).diff(moment(it.createdAt))).asMinutes() || 1))}</div>),
      ]}
    />);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsProcessing(true);
      const importTracking = await importPropertiesFromUrl(importUrl, agencyId);
      setImportTrackings([importTracking.importTracking, ...importTrackings]);
      setIsSuccess(true);
    } catch (error) {
      setErrorAlert(error.message);
      setIsSuccess(false);
    }
    setIsProcessing(false);
    window.scrollTo(0, 0);
  };

  const isFormValid = () => {
    return MyPZhelpers.fullUrlRegex.test(importUrl) && agencyId;
  };

  const renderAlert = () => {
    if (isSuccess) {
      return (<MyPZAlert>Importing Property</MyPZAlert>);
    }

    if (errorAlert) {
      return (<MyPZAlert type="error">{errorAlert}</MyPZAlert>);
    }

    return null;
  };

  return (
    <div className="page-tracking-import-list">
      {renderAlert()}
      <MyPZContainer>
        <h1>Import Tracking list</h1>
        <form className="page-tracking-import-list__form" onSubmit={onFormSubmit}>
          <div className="page-tracking-import-list__form__input">
            <MyPZTextField disabled={isProcessing} type="text" label="XML Url" placeholder="https://something.com/something.xml" onChange={(e) => setImportUrl(e.target.value)} value={importUrl} />
          </div>
          <div className="page-tracking-import-list__form__input-select">
            <MyPZSelect options={agenciesOptions || []} value={agencyId} onChange={(e) => setAgencyId(e.target.value)} label="Agency" />
          </div>
          <div><MyPZButton disabled={isProcessing || !isFormValid()} type="submit">Add new import</MyPZButton></div>
        </form>
        <div className="page-tracking-import-list__content">
          {renderList()}
        </div>
        <div className="page-tracking-import-list__pagination-block">
          <div className="page-tracking-import-list__pagination-block__total">
            {`${totalItems} Import trackings`}
          </div>
          <div className="page-tracking-import-list__pagination-block__selector">
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

export default ImportTrackingsListPage;
