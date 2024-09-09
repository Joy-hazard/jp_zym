export const exerciseOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    },
  };
  
  export const youtubeOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
      'X-RapidAPI-Key': 'a1d400083dmsh53ce703e1bfcd74p1d0b2cjsn8768730cb16c',
    },
  };
  
  export const fetchData = async (url, options, retries = 3, delay = 1000) => {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return await response.json();
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    } catch (error) {
      if (retries > 0 && error.message.includes('429')) {
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchData(url, options, retries - 1, delay * 2); // Exponential backoff
      }
      throw error;
    }
  };
  