import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { MyPZContainer, MyPZTextField, MyPZButton, MyPZTable, MyPZPagination } from '@mypz/react-kit';

import './PostsListPage.scss';

import {listPosts} from '../../../api/blogs/postsApi';

let delayer = null;

const PostsListPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [listValues, setListValues] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const handleChangeValue = (e) => {
    setSearchValue(e.target.value);
  };

  const fetchList = async (title, pageRequest) => {
    const res = await listPosts({ title, page: pageRequest });
    setListValues(res.posts);
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
        () => (<div>Slug</div>),
        () => (<div>Category</div>),
        () => (<div>Published At</div>),
        () => (<div>Created</div>),
        () => (<div>Updated</div>),
        () => (<div>Actions</div>),
      ]}
      lineRenders={[
        (l) => (<div>{l.id}</div>),
        (l) => (<div>{l.title}</div>),
        (l) => (<div>{l.slug}</div>),
        (l) => (<div>{l.category}</div>),
        (l) => (<div>{moment(l.publishedAt).fromNow()}</div>),
        (l) => (<div>{moment(l.createdAt).fromNow()}</div>),
        (l) => (<div>{moment(l.updatedAt).fromNow()}</div>),
        (l) => (<div className="page-posts-list__see-details">
          <Link to={`/blogs/posts/update/${l.slug}`}>
            <MyPZButton>Update</MyPZButton>
          </Link>
        </div>),
      ]}
    />);
  };

  return (
    <div className="page-posts-list">
      <MyPZContainer>
        <h1>Posts list</h1>
        <div className="page-posts-list__create-new">
          <Link to='/blogs/posts/create'>
            <MyPZButton>Create Post</MyPZButton>
          </Link>
        </div>
        <div className="page-posts-list__search-field">
          <MyPZTextField
            placeholder="Search by title"
            onChange={handleChangeValue}
            value={searchValue}
          />
        </div>
        <div>
          {renderList()}
        </div>
        <div className="page-posts-list__pagination-block">
          <div className="page-posts-list__pagination-block__total">
            {`${totalItems} Posts`}
          </div>
          <div className="page-posts-list__pagination-block__selector">
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

export default PostsListPage;
