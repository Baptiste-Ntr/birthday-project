
export const getTodaysBirthday = async () => {
  let queryUrl = `${'http://localhost:3002'}/getBirthday`;

  try {
    return await (await fetch(queryUrl)).json();
  } catch (error) {
    return false;
  }
};

export const getRandomQuote = async () => {
  let queryUrl = `${'http://localhost:3002'}/getQuote`;

  try {
    return await (await fetch(queryUrl)).json();
  } catch (error) {
    return false;
  }
};
