import { transformedDataInterface } from "../utils/interface";
import { decode } from "html-entities";

interface QuestionProps {
  ques: transformedDataInterface;
  gameOver: boolean;
  quesNo: number;
  handleClick: (data: number) => void;
}
const Question = ({ ques, handleClick, gameOver, quesNo }: QuestionProps) => {
  return (
    <>
      <p style={{ fontWeight: "700", color: "#293264" }}>
        {decode(ques.question)}
      </p>
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
        {ques.options.map((op, idx) => {
          let endGameClass = null;
          if (gameOver) {
            if (op.option === ques.correctAnswer)
              endGameClass = "chip__correct";
            else if (op.isSelected && op.option !== ques.correctAnswer)
              endGameClass = "chip__incorrect";
          }

          return (
            <div key={op.option}>
              <input
                type="radio"
                id={`${quesNo} ${op.option}`}
                name={ques.question}
                style={{ display: "none" }}
                checked={op.isSelected}
                onChange={() => handleClick(idx)}
                disabled={gameOver}
              />
              <label
                htmlFor={`${quesNo} ${op.option}`}
                className={`chip ${
                  op.isSelected ? "chip__selected" : null
                } ${endGameClass}`}
              >
                {decode(op.option)}{" "}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Question;
