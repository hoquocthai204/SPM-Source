import { Button } from 'antd';
import kycApi from 'api/kycApi';
import { useAppDispatch, useAppTranslation } from 'app/hooks';
import { showInfoModal } from 'components/Modals';
import { setStep } from 'features/kyc/kycSlice';
import { KycInformation } from 'models';
import React, { useCallback } from 'react';

interface ReviewScoreProps {
  score: number;
  totalScore: number;
  lastestKyc: KycInformation;
  listAnswer: any[];
}

const ReviewScore: React.FunctionComponent<ReviewScoreProps> = ({
  score,
  totalScore,
  listAnswer,
}) => {
  const t = useAppTranslation();
  const dispatch = useAppDispatch();

  const handleOK = () => {
    dispatch(setStep(7));
  };

  const handleClick = useCallback(async () => {
    const { ok } = await kycApi.submitSurveyQuestionnaire({
      submit: true,
      answersQuestion: listAnswer,
    });
    if (ok) showInfoModal({ message: t('verify-kyc.non-thai.review-score.modal'), onOk: handleOK });
  }, []);

  return (
    <div className="review-score">
      <div className="review-score__title">
        <p>{t('verify-kyc.non-thai.review-score.title1')}</p>
        <p>{t('verify-kyc.non-thai.review-score.title2')}</p>
      </div>
      <div className="review-score__score">
        {t('verify-kyc.non-thai.review-score.lowRisk')} {`${score} out ${totalScore}`}
      </div>
      <div className="review-score__description">
        {t('verify-kyc.non-thai.review-score.description')}
      </div>
      <Button type="primary" onClick={handleClick}>
        {t('verify-kyc.non-thai.review-score.btn')}
      </Button>
    </div>
  );
};

export default ReviewScore;
