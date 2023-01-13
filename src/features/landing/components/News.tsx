import { useAppTranslation } from 'app/hooks';
import { IMG_ALT } from 'consts';
import { BlogContent } from 'models';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

interface NewsProps {
  news: BlogContent[];
}

const News: React.FunctionComponent<NewsProps> = ({ news }) => {
  const t = useAppTranslation();
  const navigate = useNavigate();

  return (
    <>
      {news.length > 0 && (
        <div className="landing-news">
          <div className="landing-news__list">
            {news.slice(0, 4).map((e, i) => (
              <div
                className="landing-news__item"
                key={String(i)}
                onClick={() => navigate(`news/${e.idBlogContent}`)}
              >
                <img src={e.imageUrl} alt={IMG_ALT} />
                <span>{e.title}</span>
              </div>
            ))}
          </div>

          <NavLink to={'news'}>
            <span className="more-btn">{t('landing.seeAllNews')}</span>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default News;
