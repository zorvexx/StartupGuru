import React, { createContext, useContext, useState } from 'react';

const IdeasContext = createContext();

export const IdeasProvider = ({ children }) => {
  const [ideas, setIdeas] = useState(() => {
    const savedIdeas = localStorage.getItem('startupguru_ideas');
    return savedIdeas ? JSON.parse(savedIdeas) : [];
  });

  const addIdea = (ideaData) => {
    const newIdea = {
      id: Date.now(),
      ...ideaData,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    const updated = [newIdea, ...ideas];
    setIdeas(updated);
    localStorage.setItem('startupguru_ideas', JSON.stringify(updated));
    return newIdea;
  };

  const clearUserIdeas = (userEmail) => {
    const updated = ideas.filter(
      (idea) => idea.userEmail.toLowerCase() !== userEmail.toLowerCase()
    );
    setIdeas(updated);
    localStorage.setItem('startupguru_ideas', JSON.stringify(updated));
  };

  return (
    <IdeasContext.Provider value={{ ideas, addIdea, clearUserIdeas }}>
      {children}
    </IdeasContext.Provider>
  );
};

export const useIdeas = () => useContext(IdeasContext);
