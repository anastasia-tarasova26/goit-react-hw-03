import "./App.css";
import React from "react";
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Description from "./components/Description/Description";
import Notification from "./components/Notifacation/Notification";
import { useState } from "react";
import { useEffect } from "react";
const App = () => {
  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem("reviews")) || {
      good: 0,
      neutral: 0,
      bad: 0,
    }
  );

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const updateFeedback = (feedbackType) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [feedbackType]: prevReviews[feedbackType] + 1,
    }));
  };

  const totalFeedback = reviews.good + reviews.neutral + reviews.bad;
  const hasFeedback = totalFeedback > 0;
  const positive = Math.round((reviews.good / totalFeedback) * 100);
  const resetFeedback = () => {
    setReviews({ good: 0, neutral: 0, bad: 0 });
  };

  return (
    <>
      <Description />
      <Options
        firstButton="Good"
        secondButton="Neutral"
        thirdButton="Bad"
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      {hasFeedback ? (
        <Feedback reviews={reviews} total={totalFeedback} positive={positive} />
      ) : (
        <Notification />
      )}
    </>
  );
};

export default App;
