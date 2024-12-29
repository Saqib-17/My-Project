import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

export default function QuestionSet() {
  const { subject } = useParams(); // Get subject from URL params
  const navigate = useNavigate(); // React Router navigation
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/api/questions/${subject}`);
        setQuestions(response.data);
      } catch (err) {
        setError("Failed to fetch questions. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [subject]);

  const handleSubmit = () => {
    const answers = questions.map((question, index) => {
      const selectedOption = document.querySelector(
        `input[name="q${index}"]:checked`
      );
  
      return {
        question: question.title,
        isCorrect: selectedOption
          ? question.options.find(opt => opt.text === selectedOption.nextSibling.textContent)?.isCorrect
          : false,
      };
    });
  
    navigate("/dashboard", { state: { answers } });
  };
  

  return (
    <div className="bg-yellow-50 min-h-screen flex flex-col playwrite">
      <header className="bg-yellow-100 border-b border-yellow-200 py-4 px-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-orange-600">{subject.charAt(0).toUpperCase() + subject.slice(1)} Quiz</h1>
      </header>

      <main className="flex-grow p-6 md:p-12 mx-4 lg:mx-60">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {questions.map((question, index) => (
            <div
              key={index}
              className="bg-[#d4e5dc] shadow-lg rounded-lg p-4 md:p-6 hover:bg-[#c8e0d3] hover:glow-effect transition duration-300 mx-4 md:mx-6 my-4 md:my-6"
            >
              <h2 className="text-xl font-semibold text-primary-color mb-2">
                Question {index + 1}
              </h2>
              <p className="text-gray-700 mb-4">{question.title}</p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {question.options.map((option, optIndex) => (
                  <label
                    key={optIndex}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      name={`q${index}`}
                      className="accent-green-500"
                    />
                    <span>{option.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Submit Button */}
        <div className="col-span-1 sm:col-span-2 flex justify-center my-4">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-[#d36831] via-[#e47a4a] to-[#f08f5c] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-[#c75c25] shadow-lg shadow-[#e47a4a]/50 dark:shadow-lg dark:shadow-[#d36831]/80 font-medium rounded-lg text-sm px-6 py-3 text-center mb-2"
            onClick={handleSubmit} // Call handleSubmit on click
          >
            Submit
          </button>
        </div>
      </main>

    
    </div>
  );
}
