import kycApi from 'api/kycApi';
import { useHandleResponseError, useSubmitForm, useUserDetail } from 'hooks';
import { KycInformation, QuestionaireResponse } from 'models';
import React, { useCallback, useEffect, useState } from 'react';
import QuestioneireForm from './QuestioneireForm';
import ReviewScore from './ReviewScore';

interface QuestioneireProps {
  lastestKyc: KycInformation;
}

const initialValues: { key: string; value: number } = {
  key: '',
  value: 0,
};

const Questioneire: React.FunctionComponent<QuestioneireProps> = ({ lastestKyc }) => {
  const { currentUser } = useUserDetail();

  const handleResponseError = useHandleResponseError();

  const [listQuestionnaire, setListQuestionnaire] = useState<any[]>([]);
  const [score, setScore] = useState<QuestionaireResponse>({ score: 0, totalScore: 0 });
  const [listAnswer, setListAnswer] = useState<any[]>([]);
  useEffect(() => {
    getListQuestionnarie();
  }, []);

  const getListQuestionnarie = useCallback(async () => {
    const { body } = await kycApi.getQuestionnaire(currentUser?.language || 'en');
    const optionsQuestionnarie: { id: number; content: string; answer: any[] }[] = [];
    if (body) {
      body.map((item) => {
        const obj = {
          id: item.id,
          content: item.content,
          multipleChoice: item.multipleChoice,
          answer: item.answers.map((item) => {
            return {
              value: item.id,
              label: item.content,
            };
          }),
        };
        optionsQuestionnarie.push(obj);
      });
    }
    setListQuestionnaire(optionsQuestionnarie);
  }, []);

  const handleSubmit = useSubmitForm(async (value: { key: string; value: number }) => {
    const obj = JSON.parse(JSON.stringify(value));

    if (Object.keys(obj).length && listQuestionnaire) {
      const listKeyObj = Object.keys(obj);
      const answersQuestion = listKeyObj.map((item, index) => {
        return {
          content: item,
          id: index + 1,
          multipleChoice: (
            listQuestionnaire.filter((item, index) => item.id === index + 1)[0] || []
          )?.multipleChoice,
          answers: [
            {
              content: (listQuestionnaire
                .map((i) => i.answer.filter((x: any) => x.value === obj[item]))
                .filter((x) => x.length)[0] || [])[0].label,
              id: obj[item],
            },
          ],
        };
      });

      setListAnswer(answersQuestion);

      const { body, error } = await kycApi.submitSurveyQuestionnaire({
        answersQuestion: answersQuestion,
        submit: false,
      });

      if (body) setScore(body);
      else if (error) handleResponseError(error);
    }
  });
  return (
    <>
      {score.score && score.totalScore ? (
        <ReviewScore
          score={score.score}
          totalScore={score.totalScore}
          lastestKyc={lastestKyc}
          listAnswer={listAnswer}
        />
      ) : (
        <QuestioneireForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          listQuestionnaire={listQuestionnaire}
        />
      )}
    </>
  );
};

export default Questioneire;
