import { useFetch } from "../hooks/useFetch";
import {
  fetchedDataInterface,
  transformedDataInterface,
} from "../utils/interface";
import { shuffle } from "../utils/functions";
import Question from "../components/Question";
import { produce } from "immer";
import { useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import Button from "../components/Button";
import { Link, useSearchParams } from "react-router-dom";

function initialiseQuestions(
  data: fetchedDataInterface[]
): transformedDataInterface[] {
  const ans = data.map((item) => {
    const optionsArr = item.incorrect_answers.map((ans) => {
      return {
        option: ans,
        isSelected: false,
      };
    });
    optionsArr.push({ option: item.correct_answer, isSelected: false });
    return {
      correctAnswer: item.correct_answer,
      options: shuffle(optionsArr),
      question: item.question,
    };
  });
  return ans;
}

const GamePage = () => {
  // game states
  const [searchParams, setSearchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  const category = searchParams.get("category");
  const type = searchParams.get("type");
  const difficulty = searchParams.get("difficulty");

  //construct params and url
  const categoryParam = category !== "any" ? `&category=${category}` : "";
  const difficultyParam =
    difficulty !== "any" ? `&difficulty=${difficulty}` : "";
  const typeParam = type !== "any" ? `&type=${type}` : "";
  const queryParams = `?amount=${amount}${categoryParam}${difficultyParam}${typeParam}`;

  const { fetchedData, isLoading, isError, setFetchedData } = useFetch(
    `https://opentdb.com/api.php${queryParams}`,
    initialiseQuestions
  );
  const [isGameOver, setIsGameOver] = useState(false);

  // derived states
  const totalCorrectAnswers = fetchedData.filter((ques) => {
    return (
      ques.correctAnswer ===
      ques.options.find((option) => option.isSelected)?.option
    );
  }).length;

  function finishGame() {
    setIsGameOver(true);
  }
  function handleOptionClick(quesNo: number, optionNo: number): void {
    setFetchedData(
      produce((draft) => {
        const prevVal = draft[quesNo].options[optionNo].isSelected;
        draft[quesNo].options = draft[quesNo].options.map((option) => {
          return {
            ...option,
            isSelected: false,
          };
        });
        draft[quesNo].options[optionNo].isSelected = !prevVal;
      })
    );
  }

  return (
    <>
      {isError ? (
        <div>Something went wrong. Please referesh the page!!!!</div>
      ) : isLoading ? (
        <InfinitySpin color="#4d5b9e"></InfinitySpin>
      ) : fetchedData.length > 0 ? (
        <div
          style={{
            minWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            alignItems: "center",
            padding: "2rem 0",
          }}
        >
          <ul style={{}}>
            {fetchedData.map((ques, idx) => {
              return (
                <li
                  key={idx}
                  style={{
                    padding: "15px ",
                    borderBottom: "1px solid #DBDEF0",
                  }}
                >
                  <Question
                    quesNo={idx}
                    ques={ques}
                    handleClick={(optionNo) => handleOptionClick(idx, optionNo)}
                    gameOver={isGameOver}
                  />
                </li>
              );
            })}
          </ul>
          {!isGameOver && <Button onClick={finishGame}>Check Answers</Button>}
          {isGameOver && (
            <span
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  fontWeight: "700",
                  fontSize: "0.75rem",
                  color: "#293264",
                }}
              >
                You scored {totalCorrectAnswers}/{fetchedData.length} correct
                answers
              </p>
              <Link to=".." className="primaryBtn">
                Play again
              </Link>
            </span>
          )}
        </div>
      ) : (
        <div>
          <p style={{ marginBottom: "10px", fontSize: "1rem" }}>
            Sorry! no questions available...
          </p>
          <Link to=".." className="primaryBtn">
            Go back
          </Link>
        </div>
      )}
    </>
  );
};

export default GamePage;
