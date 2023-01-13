import blogApi from 'api/blogApi';
import { useAppDispatch, useAppSelector, useAppTranslation, useI18n } from 'app/hooks';
import { DATE_FORMAT, IMG_ALT } from 'consts';
import date from 'date-and-time';
import { useUserDetail } from 'hooks';
import { BlogContent } from 'models';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uniqueId } from 'utils';
import { newsActions, selectPageNum } from '../NewsSlice';

interface NewsMainPageProps {}

const getImageUrl = (url: string) => {
  if (url?.trim().startsWith('http')) return url?.trim();
  else return process.env.REACT_APP_NEWS_URL + url?.trim();
};

const NewsMainPage: React.FunctionComponent<NewsMainPageProps> = (props) => {
  const [blogList, setBlogList] = useState<BlogContent[] | null>();
  const [lang, setLang] = useState('');
  const { getUserDetail, isUserLoggedIn } = useUserDetail();
  const i18n = useI18n();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const t = useAppTranslation();
  const pageNumState = useAppSelector(selectPageNum);
  const dispatch = useAppDispatch();
  const [showMore, setShowMore] = useState(true);
  const blogsRef = useRef<BlogContent[]>([]);

  const getLang = useCallback(async () => {
    const detail = await getUserDetail();
    if (detail) setLang(detail.language);
  }, [getUserDetail]);

  const getBlogData = useCallback(async (page, lang) => {
    const { body } = await blogApi.getAllBlog(lang, {
      page: page,
    });
    if (body && !JSON.stringify(blogsRef.current).includes(JSON.stringify(body))) {
      blogsRef.current = [
        ...blogsRef.current,
        ...body.sort(
          (a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime()
        ),
      ];
      setBlogList(blogsRef.current);
    }
  }, []);

  const checkShowMore = useCallback(
    async (page) => {
      const { body } = await blogApi.getAllBlog(lang ? lang : i18n.language, {
        page: page,
      });
      if (body && body.length > 0) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    },
    [i18n.language, lang]
  );

  const handleClick = () => {
    dispatch(newsActions.setPageNum(pageNumState + 1));
  };

  useEffect(() => {
    checkShowMore(pageNumState + 1);
  }, [blogList, checkShowMore, pageNumState]);

  useEffect(() => {
    getLang();
  }, [getLang]);

  useEffect(() => {
    blogsRef.current = [];
    dispatch(newsActions.setPageNum(0));
  }, [lang, i18n.language, dispatch]);

  useEffect(() => {
    if (isUserLoggedIn) {
      getBlogData(pageNumState, lang);
    } else getBlogData(pageNumState, i18n.language);
  }, [lang, pageNumState, getBlogData, isUserLoggedIn, i18n.language]);

  useEffect(() => {
    if (blogList) {
      headerRef.current?.setAttribute(
        'style',
        `background: url(${getImageUrl(blogList[0]?.imageUrl)}) no-repeat center/cover`
      );
    }
  }, [blogList]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="news-main">
      {blogList && (
        <div
          className="news-main__header"
          ref={headerRef}
          onClick={() => navigate(`${blogList[0]?.idBlogContent}`)}
        >
          <div className="news-main__header-content">
            <span className="news-main__header-title">{blogList[0]?.title}</span>

            <span className="news-main__header-subtitle">{blogList[0]?.summary}</span>
          </div>
        </div>
      )}

      <div className="news-container">
        <span className="news-list__header">{t('news.news')}</span>

        <div className="news-list__body">
          {blogList &&
            blogList.slice(1).map((e) => (
              <div
                key={uniqueId()}
                className="news-list__item"
                onClick={() => navigate(`${e?.idBlogContent}`)}
              >
                <div className="news-item__img-box">
                  <img src={e?.imageUrl} alt={IMG_ALT} />
                </div>

                <div className="new-item__body">
                  <span className="news-item__date">
                    {date.format(new Date(String(e?.publishTime)), DATE_FORMAT)}
                  </span>

                  <span className="news-item__title">{e?.title}</span>

                  <span className="news-item__subtitle">{e?.summary}</span>
                </div>
              </div>
            ))}
        </div>

        {showMore && (
          <div className="news-list__show-more">
            <button onClick={handleClick}>{t('news.showMore')}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsMainPage;
