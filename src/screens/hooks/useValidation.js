import { useState } from "react";

export const useValidation = (initialErrorMessages) => {
  const [errorMessages, setErrorMessages] = useState(initialErrorMessages);

  const handleValidation = (errors) => {
    setErrorMessages(() => {
      const newErrorMessages = {};
      const errorMessagesKeys = Object.keys(initialErrorMessages).flat();

      errorMessagesKeys.forEach((messageKey) => {
        const errorMessage = errors.find((error) => error.includes(messageKey));

        if (errorMessage) {
          newErrorMessages[messageKey] = errorMessage;
        }
      });

      return newErrorMessages;
    });
  };

  const resetErrorMessages = (event) => {
    if (event) {
      setErrorMessages((prevMessages) => ({
        ...prevMessages,
        [event.target.id]: "",
      }));
    } else {
      setErrorMessages(initialErrorMessages);
    }
  };
  return {
    errorMessages,
    handleValidation,
    resetErrorMessages,
  };
};
