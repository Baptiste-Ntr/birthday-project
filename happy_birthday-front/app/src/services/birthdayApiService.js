const apiBaseUrl = 'http://localhost:3002'

export const getTodaysBirthday = async () => {
  let queryUrl = `${apiBaseUrl}/getBirthday`;

  try {
    return await (await fetch(queryUrl)).json();
  } catch (error) {
    return false;
  }
};

export const getRandomQuote = async () => {
  let queryUrl = `${apiBaseUrl}/getQuote`;

  try {
    return await (await fetch(queryUrl)).json();
  } catch (error) {
    return false;
  }
};
