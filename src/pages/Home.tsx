import React from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
const categoryOptions = [
  "Any Category",
  "General Knowledge",
  "Entertainment: Books",
  "Entertainment: Film",
  "Entertainment: Music",
  "Entertainment: Musicals & Theatres",
  "Entertainment: Television",
  "Entertainment: Video Games",
  "Entertainment: Board Games",
  "Science & Nature",
  "Science: Computers",
  "Science: Mathematics",
  "Mythology",
  "Sports",
  "Geography",
  "History",
  "Politics",
  "Art",
  "Celebrities",
  "Animals",
  "Vehicles",
  "Entertainment: Comics",
  "Science: Gadgets",
  "Entertainment: Japanese Anime & Manga",
  "Entertainment: Cartoon & Animations",
];
const Home = () => {
  const navigate = useNavigate();
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    //retrieve data
    const number = +(formData.get("number") ?? "10");
    const category = formData.get("category") ?? "any";
    const difficulty = formData.get("difficulty") ?? "any";
    const type = formData.get("type") ?? "any";

    //construct url and redirect
    const url = `game?amount=${number}&category=${category}&difficulty=${difficulty}&type=${type}`;

    navigate(url);
  }
  return (
    <form
      onSubmit={handleFormSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.81rem",
        background: "#a6adcf",
        minWidth: "37.5rem",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          color: "#293264",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "700", lineHeight: "2rem" }}>
          Quizzical
        </h1>
        <h3 style={{ fontSize: "1rem", fontWeight: "400" }}>
          Some description if needed
        </h3>
      </div>
      <div>
        <div className="form-controls">
          <label htmlFor="number">Number of Questions:</label>
          <input
            type="number"
            id="number"
            name="number"
            min="1"
            max="50"
            defaultValue="10"
          ></input>
        </div>
        <div className="form-controls">
          <label htmlFor="category">Select category:</label>
          <select id="category" name="category">
            {categoryOptions.map((opt, index) => {
              return (
                <option key={opt} value={index === 0 ? "any" : index + 8}>
                  {opt}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-controls">
          <label htmlFor="difficulty">Select Difficulty:</label>
          <select id="difficulty" name="difficulty">
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="form-controls">
          <label htmlFor="type">Select Type:</label>
          <select id="type" name="type">
            <option value="any">Any Type</option>
            <option value="multiple">Multiple</option>
            <option value="boolean">Boolean</option>
          </select>
        </div>

        <Button style={{ marginTop: "20px" }}>Start quiz</Button>
      </div>
    </form>
  );
};

export default Home;
