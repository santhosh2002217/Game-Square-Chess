import React, { useState } from "react";

const FAQ = () => {
  const [active, setActive] = useState(null);

  const questions = [
    {
      question: "Who can participate?",
      answer:
        "Players who meet the eligibility requirements of the specific tournament can participate.",
    },
    {
      question: "How can I register?",
      answer:
        "Select a tournament, open its details and click the registration button.",
    },
    {
      question: "How do I know my tournament result?",
      answer:
        "Tournament results will be published on the Results page after the tournament.",
    },
    {
      question: "Can I cancel my registration?",
      answer: "Cancellation policies depend on the specific tournament.",
    },
  ];

  return (
    <section className="min-h-screen bg-[#f5f3ee] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-5">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-sm font-bold text-gray-500">
            Questions
          </p>

          <h1 className="text-5xl font-black mt-3">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="space-y-4">
          {questions.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden">
              <button
                onClick={() => setActive(active === index ? null : index)}
                className="w-full text-left p-6 flex justify-between items-center font-bold"
              >
                {item.question}

                <span className="text-2xl">{active === index ? "−" : "+"}</span>
              </button>

              {active === index && (
                <div className="px-6 pb-6 text-gray-600">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
