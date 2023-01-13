import blogApi from 'api/blogApi';
import { useAppTranslation, useI18n } from 'app/hooks';
import { DATE_FORMAT, DATE_TIME_FORMAT_2, IMG_ALT } from 'consts';
import date from 'date-and-time';
import { useUserDetail } from 'hooks';
import { BlogDetailContent } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NewsDetailPageProps {}

const NewsDetailPage: React.FunctionComponent<NewsDetailPageProps> = (props) => {
  const [blogData, setBlogData] = useState<BlogDetailContent | null>(null);
  const location = useLocation();
  const { getUserDetail } = useUserDetail();
  const [lang, setLang] = useState('');
  const i18n = useI18n();
  const navigate = useNavigate();
  const t = useAppTranslation();

  const getLang = useCallback(async () => {
    const detail = await getUserDetail();
    if (detail) setLang(detail.language);
  }, [getUserDetail]);

  const getBlog = useCallback(async () => {
    const { body } = await blogApi.getBlog(
      Number(location.pathname.split('/').reverse()[0]),
      lang ? lang : i18n.language
    );
    if (body) setBlogData(body);
  }, [location.pathname, i18n.language, lang]);

  useEffect(() => {
    getLang();
  }, [getLang]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    getBlog();
  }, [lang, getBlog]);

  return (
    <div className="news-container">
      <div className="news-detail">
        {blogData && (
          <div className="news-content">
            <div className="news-header">
              <span className="news-title">{blogData.title}</span>
              <span className="news-date">
                {`${t('news.updated')}: `}
                {date.format(new Date(String(blogData.publishTime)), DATE_TIME_FORMAT_2)}
              </span>
              <span className="news-subtitle">{blogData.summary}</span>
              <div className="news-header__logo">
                <img src={blogData?.imageUrl} alt={IMG_ALT} />
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
          </div>
        )}
        <div className="news-article-side">
          <span className="news-side__header">{t('news.sideTitle')}</span>

          <div className="news-side__items">
            {blogData &&
              blogData.relatedBlogs.map((e) => (
                <div
                  key={e.idBlogContent}
                  className="news-side__item"
                  onClick={() => navigate(`${e.idBlogContent}`)}
                >
                  <div className="news-item__img-box">
                    <img src={e.imageUrl} alt={IMG_ALT} />
                  </div>

                  <div className="new-item__body">
                    <span className="news-item__date">
                      {date.format(new Date(String(e.publishTime)), DATE_FORMAT)}
                    </span>

                    <span className="news-item__title">{e.title}</span>

                    <span className="news-item__subtitle">{e.summary}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
