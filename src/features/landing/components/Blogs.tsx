import { useAppTranslation } from 'app/hooks';
import { IMG_ALT } from 'consts';
import { BlogContent } from 'models';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface BlogsProps {
  blogs: BlogContent[];
}

const getImageUrl = (url: string) => {
  if (url.trim().startsWith('http')) return url.trim();
  else return 'https://development-maxbit-service.s3.ap-southeast-1.amazonaws.com/' + url.trim();
};

const Blogs: React.FunctionComponent<BlogsProps> = ({ blogs }) => {
  const t = useAppTranslation();
  const navigate = useNavigate();
  return (
    <div className="blogs">
      <div className="blogs-header">
        <span className="blogs-header__title">{t('landing.blogHeader')}</span>
        <span className="blogs-header__subtitle">{t('landing.blogDetail')}</span>
      </div>

      <div className="blogs__list-items">
        {blogs.map((blog, index) => {
          if (index === 0)
            return (
              <div
                className="blogs__item-top"
                key={index}
                onClick={() => navigate(`news/${blog.idBlogContent}`)}
              >
                <img
                  src={getImageUrl(blog.imageUrl)}
                  alt={IMG_ALT}
                  style={{ maxHeight: '356px' }}
                />
                <span className="blogs__item-title">{blog.title}</span>
              </div>
            );
          else
            return (
              <div
                className="blogs__item"
                key={index}
                onClick={() => navigate(`news/${blog.idBlogContent}`)}
              >
                <img src={blog.imageUrl} alt={IMG_ALT} style={{ maxHeight: '195px' }} />
                <div className="blogs__item-content">
                  <span className="blogs__item-title">{blog.title}</span>
                  <span className="blogs__item-subtitle">{blog.summary}</span>
                </div>
              </div>
            );
        })}
      </div>
      <Link to={'news'}>
        <span className="more-btn">{t('landing.seeAllBlogs')}</span>
      </Link>
    </div>
  );
};

export default Blogs;
