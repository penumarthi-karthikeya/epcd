import React, { useState, useRef, useEffect, useCallback } from 'react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [askedQuestions, setAskedQuestions] = useState([]);
    const [isBotTyping, setIsBotTyping] = useState(false);

    const chatWindowRef = useRef(null);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    const handleBotResponse = useCallback(() => {
        const userLastQuestion = askedQuestions[askedQuestions.length - 1].toLowerCase();
        const responseMap = {
            'what is the pancreas?': 'The pancreas is a gland located in the abdomen. It produces digestive enzymes and hormones, including insulin, which helps regulate blood sugar levels.',
            'what is cancer?': 'Cancer is a disease where abnormal cells divide uncontrollably and can invade other tissues. It can occur in almost any tissue or organ in the body.',
            'what is pancreas cancer?': 'Pancreas cancer, or pancreatic cancer, is a type of cancer that starts in the pancreas. It often goes undetected until it is advanced, making it a particularly challenging disease to treat.',
            'types of pancreas cancer?': 'The most common type of pancreas cancer is pancreatic ductal adenocarcinoma. Other types include pancreatic neuroendocrine tumors, acinar cell carcinoma, and pancreatoblastoma.',
            'symptoms of pancreas cancer?': 'Symptoms may include jaundice (yellowing of the skin and eyes), abdominal pain, weight loss, loss of appetite, nausea, and changes in stool.',
            'how is pancreas cancer diagnosed?': 'Diagnosis may involve imaging tests (such as CT scans or MRIs), blood tests, biopsy procedures, and endoscopic ultrasound.',
            'what are the treatment options for pancreas cancer?': 'Treatment options may include surgery, chemotherapy, radiation therapy, targeted therapy, and supportive care depending on the stage and type of cancer.',
            'what are the risk factors for pancreas cancer?': 'Risk factors include smoking, obesity, chronic pancreatitis, family history of pancreatic cancer, and certain genetic conditions.',
            'how can i prevent pancreas cancer?': 'Preventive measures include maintaining a healthy weight, not smoking, eating a balanced diet, and managing conditions such as diabetes and chronic pancreatitis.',
            'what are the stages of pancreas cancer?': 'Pancreas cancer stages range from Stage 0 (localized) to Stage IV (advanced). Staging helps determine the best treatment approach.',
            'can pancreas cancer be treated?': 'Yes, pancreas cancer can be treated. Treatment depends on the stage, type, and location of the cancer, as well as the patient’s overall health.',
            'what is the survival rate for pancreas cancer?': 'Survival rates for pancreas cancer vary based on the stage and other factors. Early-stage cancers generally have a better prognosis than advanced stages.',
            'what are clinical trials for pancreas cancer?': 'Clinical trials are research studies that test new treatments or procedures for pancreas cancer. Participating in a trial may provide access to cutting-edge therapies.',
            'what lifestyle changes can help manage pancreas cancer?': 'Lifestyle changes may include adopting a healthy diet, staying active, managing stress, and following medical advice for treatment and symptom management.',
            'what are the complications of pancreas cancer?': 'Complications may include bile duct obstruction, weight loss, diabetes, and pain, which can be managed with appropriate treatments.',
            'is pancreas cancer hereditary?': 'Some cases of pancreas cancer are linked to inherited gene mutations, such as BRCA1 and BRCA2. A family history of the disease may increase the risk.',
            'can pancreas cancer recur?': 'Yes, pancreas cancer can recur after treatment. Recurrence can happen locally or in other parts of the body, and follow-up care is important for monitoring.',
            'what is the prognosis for advanced pancreas cancer?': 'The prognosis for advanced pancreas cancer is generally poor, but treatments like chemotherapy and clinical trials may help prolong survival and improve quality of life.',
            'how is pancreas cancer surgery performed?': 'Surgery for pancreas cancer may involve removing part of the pancreas, nearby lymph nodes, and sometimes portions of the stomach or intestines in a procedure called the Whipple procedure.',
            'what is the role of genetic testing in pancreas cancer?': 'Genetic testing can help identify inherited mutations that increase the risk of pancreas cancer. It may also guide treatment decisions for patients with genetic predispositions.',
            'how does pancreas cancer affect digestion?': 'Pancreas cancer can affect digestion by obstructing the bile duct or affecting enzyme production. This may lead to malnutrition and require enzyme replacement therapy.',
            'what foods should i avoid with pancreas cancer?': 'It’s recommended to avoid fried and fatty foods, processed meats, sugary snacks, and alcohol, as they can be hard to digest and may exacerbate symptoms.',
            'what foods are good for pancreas cancer?': 'Foods rich in protein and healthy fats, like lean meats, fish, eggs, low-fat dairy, whole grains, and fruits and vegetables, can help maintain strength and support recovery.',
            'can diet help prevent pancreas cancer?': 'A healthy diet with plenty of fruits, vegetables, whole grains, and lean proteins may help reduce the risk of pancreas cancer. Limiting red and processed meats can also be beneficial.',
            'should i take supplements with pancreas cancer?': 'Some patients may need vitamin D or digestive enzyme supplements, but it’s important to consult a healthcare provider before starting any supplements, as individual needs vary.',
            'how does diet affect pancreas function?': 'A balanced diet supports proper pancreas function by providing essential nutrients for enzyme production and blood sugar regulation. Unhealthy diets high in fats and sugars can strain the pancreas.'
        };

        // Find the closest match
        const matchedQuestion = Object.keys(responseMap).find(q => userLastQuestion.includes(q));
        const botResponseText = matchedQuestion ? responseMap[matchedQuestion] : 'I am sorry, I do not have information on that topic.';
        addMessage('bot', botResponseText);
    }, [askedQuestions]);

    useEffect(() => {
        if (isBotTyping) {
            const timer = setTimeout(() => {
                handleBotResponse();
                setIsBotTyping(false);
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isBotTyping, handleBotResponse]);

    useEffect(() => {
        if (isOpen) {
            setMessages([{ sender: 'bot', text: 'Hello! How can I assist you today?' }]);
        }
    }, [isOpen]);

    const initialOptions = [
        'what is the pancreas?',
        'what is cancer?',
        'what is pancreas cancer?',
        'types of pancreas cancer?',
        'symptoms of pancreas cancer?',
        'how is pancreas cancer diagnosed?',
        'what are the treatment options for pancreas cancer?',
        'what are the risk factors for pancreas cancer?',
        'how can i prevent pancreas cancer?',
        'what are the stages of pancreas cancer?',
        'can pancreas cancer be treated?',
        'what is the survival rate for pancreas cancer?',
        'what are clinical trials for pancreas cancer?',
        'what lifestyle changes can help manage pancreas cancer?',
        'what are the complications of pancreas cancer?',
        'is pancreas cancer hereditary?',
        'can pancreas cancer recur?',
        'what is the prognosis for advanced pancreas cancer?',
        'how is pancreas cancer surgery performed?',
        'what is the role of genetic testing in pancreas cancer?',
        'how does pancreas cancer affect digestion?',
        'what foods should i avoid with pancreas cancer?',
        'what foods are good for pancreas cancer?',
        'can diet help prevent pancreas cancer?',
        'should i take supplements with pancreas cancer?',
        'how does diet affect pancreas function?'
    ];

    const getFilteredOptions = () => {
        return initialOptions.filter(option => !askedQuestions.includes(option));
    };

    const togglePopup = () => {
        if (isOpen) {
            setMessages([]);
            setAskedQuestions([]);
        }
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (optionText) => {
        setAskedQuestions(prev => [...prev, optionText]);
        addMessage('user', optionText);
        setIsBotTyping(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const inputText = userInput.trim().toLowerCase();
        if (inputText && !askedQuestions.includes(userInput.trim())) {
            handleOptionClick(inputText);
            setUserInput('');
        }
    };

    const addMessage = (sender, text) => {
        setMessages(prevMessages => [...prevMessages, { sender, text }]);
    };

    return (
        <>
            <div className="chat-bot">
                <button className={`chatbot-button ${isOpen ? 'open' : 'closed'}`} onClick={togglePopup}>
                    {isOpen ? (
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.878 122.88" className="chatbot">
                            <g><path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z" /></g>
                        </svg>
                    ) : (
                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 119.35">
                            <title>chatbot</title>
                            <path d="M57.49,29.2V23.53a14.41,14.41,0,0,1-2-.93A12.18,12.18,0,0,1,50.44,7.5a12.39,12.39,0,0,1,2.64-3.95A12.21,12.21,0,0,1,57,.92,12,12,0,0,1,61.66,0,12.14,12.14,0,0,1,72.88,7.5a12.14,12.14,0,0,1,0,9.27,12.08,12.08,0,0,1-2.64,3.94l-.06.06a12.74,12.74,0,0,1-2.36,1.83,11.26,11.26,0,0,1-2,.93V29.2H94.3a15.47,15.47,0,0,1,15.42,15.43v2.29H115a7.93,7.93,0,0,1,7.9,7.91V73.2A7.93,7.93,0,0,1,115,81.11h-5.25v2.07A15.48,15.48,0,0,1,94.3,98.61H55.23L31.81,118.72a2.58,2.58,0,0,1-3.65-.29,2.63,2.63,0,0,1-.63-1.85l1.25-18h-.21A15.45,15.45,0,0,1,13.16,83.18V81.11H7.91A7.93,7.93,0,0,1,0,73.2V54.83a7.93,7.93,0,0,1,7.9-7.91h5.26v-2.3A15.45,15.45,0,0,1,28.57,29.2H57.49ZM82.74,47.32a9.36,9.36,0,1,1-9.36,9.36,9.36,9.36,0,0,1,9.36-9.36Zm-42.58,0a9.36,9.36,0,1,1-9.36,9.36,9.36,9.36,0,0,1,9.36-9.36Zm6.38,31.36a2.28,2.28,0,0,1-.38-.38,2.18,2.18,0,0,1-.52-1.36,2.21,2.21,0,0,1,.46-1.39,2.4,2.4,0,0,1,.39-.39,3.22,3.22,0,0,1,3.88-.08A22.36,22.36,0,0,0,56,78.32a14.86,14.86,0,0,0,5.47,1A16.18,16.18,0,0,0,67,78.22,25.39,25.39,0,0,0,72.75,75a3.24,3.24,0,0,1,3.89.18,3,3,0,0,1,.37.41,2.22,2.22,0,0,1,.42,1.4,2.33,2.33,0,0,1-.58,1.35,2.29,2.29,0,0,1-.43.38,30.59,30.59,0,0,1-7.33,4,22.28,22.28,0,0,1-7.53,1.43A21.22,21.22,0,0,1,54,82.87a27.78,27.78,0,0,1-7.41-4.16l0,0ZM94.29,34.4H28.57A10.26,10.26,0,0,0,18.35,44.63V83.18A10.26,10.26,0,0,0,28.57,93.41h3.17a2.61,2.61,0,0,1,2.41,2.77l-1,14.58L52.45,94.15a2.56,2.56,0,0,1,1.83-.75h40a10.26,10.26,0,0,0,10.22-10.23V44.62A10.24,10.24,0,0,0,94.29,34.4Z" />
                        </svg>
                    )}
                </button>

                {isOpen && (
                    <div className="chatbot-modal">
                        <div className="chatbot-modal-content">
                            <div className="chatbot-header">
                                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 119.35">
                                    <title>chatbot</title>
                                    <path d="M57.49,29.2V23.53a14.41,14.41,0,0,1-2-.93A12.18,12.18,0,0,1,50.44,7.5a12.39,12.39,0,0,1,2.64-3.95A12.21,12.21,0,0,1,57,.92,12,12,0,0,1,61.66,0,12.14,12.14,0,0,1,72.88,7.5a12.14,12.14,0,0,1,0,9.27,12.08,12.08,0,0,1-2.64,3.94l-.06.06a12.74,12.74,0,0,1-2.36,1.83,11.26,11.26,0,0,1-2,.93V29.2H94.3a15.47,15.47,0,0,1,15.42,15.43v2.29H115a7.93,7.93,0,0,1,7.9,7.91V73.2A7.93,7.93,0,0,1,115,81.11h-5.25v2.07A15.48,15.48,0,0,1,94.3,98.61H55.23L31.81,118.72a2.58,2.58,0,0,1-3.65-.29,2.63,2.63,0,0,1-.63-1.85l1.25-18h-.21A15.45,15.45,0,0,1,13.16,83.18V81.11H7.91A7.93,7.93,0,0,1,0,73.2V54.83a7.93,7.93,0,0,1,7.9-7.91h5.26v-2.3A15.45,15.45,0,0,1,28.57,29.2H57.49ZM82.74,47.32a9.36,9.36,0,1,1-9.36,9.36,9.36,9.36,0,0,1,9.36-9.36Zm-42.58,0a9.36,9.36,0,1,1-9.36,9.36,9.36,9.36,0,0,1,9.36-9.36Zm6.38,31.36a2.28,2.28,0,0,1-.38-.38,2.18,2.18,0,0,1-.52-1.36,2.21,2.21,0,0,1,.46-1.39,2.4,2.4,0,0,1,.39-.39,3.22,3.22,0,0,1,3.88-.08A22.36,22.36,0,0,0,56,78.32a14.86,14.86,0,0,0,5.47,1A16.18,16.18,0,0,0,67,78.22,25.39,25.39,0,0,0,72.75,75a3.24,3.24,0,0,1,3.89.18,3,3,0,0,1,.37.41,2.22,2.22,0,0,1,.42,1.4,2.33,2.33,0,0,1-.58,1.35,2.29,2.29,0,0,1-.43.38,30.59,30.59,0,0,1-7.33,4,22.28,22.28,0,0,1-7.53,1.43A21.22,21.22,0,0,1,54,82.87a27.78,27.78,0,0,1-7.41-4.16l0,0ZM94.29,34.4H28.57A10.26,10.26,0,0,0,18.35,44.63V83.18A10.26,10.26,0,0,0,28.57,93.41h3.17a2.61,2.61,0,0,1,2.41,2.77l-1,14.58L52.45,94.15a2.56,2.56,0,0,1,1.83-.75h40a10.26,10.26,0,0,0,10.22-10.23V44.62A10.24,10.24,0,0,0,94.29,34.4Z" />
                                </svg>
                                <h3> : I am here to help you</h3>
                            </div>
                            <div className="chat-window" ref={chatWindowRef}>
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
                                        {msg.text}
                                    </div>
                                ))}
                                {isBotTyping && (
                                    <div className="bot-typing">
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                        <div className="typing-dot"></div>
                                    </div>
                                )}
                            </div>

                            {getFilteredOptions().length > 0 && (
                                <div className="chat-options">
                                    {getFilteredOptions().map((option, index) => (
                                        <button key={index} onClick={() => handleOptionClick(option)}>
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="chat-input-form">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder="Type your message..."
                                />
                                <button type="submit">Send</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Chatbot;
