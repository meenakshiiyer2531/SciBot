import React, { useState } from 'react';

const questionAnswerPairs = [
  {
    question: 'What are the different courses offered by SciAstra?',
    answer:
      'SciAstra offers a wide range of courses in various science fields, including...',
  },
  {
    question: 'What is SciAstra?',
    answer:
      'SciAstra is a platform that empowers aspiring scientists by providing high-quality online courses, mentorship, and resources in various STEM fields. Imagine it as your one-stop shop for igniting your scientific curiosity and achieving your academic goals!',
  },
  {
    question: 'What are the benefits of taking a SciAstra course?',
    answer:
      'Our Course benefits are : 1. Expert-led instructions 2. Flexible learning 3. Personalized Guidance 4. Skill development.',
  },
  {
    question: 'Can you help me choose the right course for me?',
    answer:
      'Absolutely! Tell me about your academic interests, goals, and preferred learning style, and I will recommend the perfect course that fits your needs.',
  },
  {
    question: 'What are the most popular SciAstra courses?',
    answer:
      'Start preparing early, understand the exam format, practice regularly and seek guidance from mentors and teachers',
  },
  {
    question: 'What are some career options for science graduates?',
    answer:
      'The possibilities are endless! You can pursue research, teaching, medicine, engineering, environmental science, and many more exciting fields. Explore our career resources section for detailed information and inspiration',
  },
  {
    question: 'Where can I find free study materials and research papers?',
    answer:
      'We have curated a list of trusted websites and databases where you can access numerous scientific resources for free. We also recommend checking out our library section for recommended textbooks and academic journals.',
  },
  {
    question: 'Hello',
    answer:
      'Hi, Welcome to SciAstra. I am your personalised bot SciBot.How can I help you?',
  },
  {
    question: 'Hi',
    answer:
      'Hi, Welcome to SciAstra. I am your personalised bot SciBot. How can I help you?',
  },
  {
    question: 'Do you know my name?',
    answer: 'I will be in pleasure if you tell so',
  },
  {
    question: 'Hey',
    answer: 'Hello, How can I help you?',
  },
  // ... ( question-answer pairs)
];

function Chatbot() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMessage = async () => {
    setIsLoading(true);
    const userQuestion = userInput.trim();
    setUserInput('');

    const matchingAnswer = questionAnswerPairs.find(
      (pair) => pair.question.toLowerCase() === userQuestion.toLowerCase()
    );

    if (matchingAnswer) {
      setChatHistory([...chatHistory, userQuestion, matchingAnswer.answer]);
    } else {
      // Try fetching answer from external source (optional)
      try {
        const fetchedAnswer = await fetchAnswerFromAPI(userQuestion); // Replace with your API call
        setChatHistory([...chatHistory, userQuestion, fetchedAnswer]);
      } catch (error) {
        console.error('Failed to fetch answer:', error);
        setChatHistory([
          ...chatHistory,
          userQuestion,
          "I'm still learning, but I'll try to find an answer for you later!",
        ]);
      }
    }

    setIsLoading(false);
  };

  // ...other functions for additional features

  return (
    <div className="chatbot-container">
      <h2>SciBot </h2>
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={
              message.startsWith('SciBot:') ? 'bot-message' : 'user-message'
            }
          >
            {message}
          </div>
        ))}
        {isLoading && <div className="loading">Thinking...</div>}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask me anything about SciAstra!"
      />
      <button onClick={handleMessage}>Send</button>
    </div>
  );
}

export default Chatbot;
