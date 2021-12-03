import axios from 'axios';
import hltb from 'howlongtobeat';

const hltbService = new hltb.HowLongToBeatService();

const baseUrlRAWG = 'https://api.rawg.io/api/';
const baseUrlIGDB = 'https://api.igdb.com/v4/';

const getGamesInfo = async name => {
  const data = await axios.get(`${baseUrlRAWG}games?search=${name}&key=${process.env.RAWG_KEY}`);
  const result = data.data.results.map(game => {
    return({
      name: game.name,
      background_image: game.background_image,
      id: game.id,
    })});
  return result;
};

export const getGames = async (req, res) => {
  const { searchQuery } = req.params;
  const data = await hltbService.search(`${searchQuery}`);
  if (data.length < 1) {
    return res.send('Your search returned no results.')
  };
  const name = data.sort((a, b) => b.similarity - a.similarity)
                      .map(game => game.name)[0];
  const games = await getGamesInfo(name);
  res.status(200).send(games);
};

export const getHomeData = async (req, res) => {  
  const getCurrentMonth = () => {
    const month = new Date().getMonth() + 1;
    if(month < 10){
        return `0${month}`
    }else{
        return month;
    }
  };

  const getCurrentDay = () => {
    const day = new Date().getDate();
    if(day < 10){
        return `0${day}`
    }else{
        return day;
    }
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = getCurrentMonth();
  const currentDay = getCurrentDay();
  const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
  const lastYear = `${currentYear-1}-${currentMonth}-${currentDay}`;
  const lastTenYears = `${currentYear-10}-${currentMonth}-${currentDay}`;

  const data = await axios.get(`${baseUrlRAWG}games?dates=${lastYear},${currentDate}&ordering=-rating&page_size=10&key=${process.env.RAWG_KEY}`);
  const popularGames = data.data;
  const result = await axios.get(`${baseUrlRAWG}games?dates=${lastTenYears},${currentDate}&page_size=10&metacritic=90,100&key=${process.env.RAWG_KEY}`);
  const topRatedGames = result.data;

  res.status(200).send([popularGames, topRatedGames]);
};

export const getGenres = async (req, res) => {
  const genres = await axios.get(`${baseUrlRAWG}genres?key=${process.env.RAWG_KEY}`);
  const categories = genres.data.results.map(genre => {
    return ({
      name: genre.name,
      image: genre.image_background,
      id: genre.id,
    })
  });
  res.send(categories);
};

export const getGameByGenre = async (req, res) => {
  const { id } = req.params;
  const data = await axios.get(`${baseUrlRAWG}games?genres=${id}&page=1&page_size=20&key=${process.env.RAWG_KEY}`);
  const result = data.data.results.map(game => {
    return({
      name: game.name,
      background_image: game.background_image,
      id: game.id,
    })});
  res.send(result);
};

const getGame = async name => {
  const accessToken = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.IGDB_CLIENT_ID}&client_secret=${process.env.IGDB_CLIENT_SECRET}&grant_type=client_credentials`);

  const data = await axios({
    url: "https://api.igdb.com/v4/games",
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Client-ID': process.env.IGDB_CLIENT_ID,
        'Authorization': `Bearer ${accessToken.data.access_token}`,
    },
    data: `search "${name}"; fields artworks,videos;`
  });

  const game = data.data[0];

  if (!game) {
    return;
  }

  if (!game.artworks && !game.videos) {
    return;
  }
  
  if (game.artworks) {
    const imageData = await axios({
      url: `https://api.igdb.com/v4/artworks`,
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Client-ID': process.env.IGDB_CLIENT_ID,
          'Authorization': `Bearer ${accessToken.data.access_token}`,
      },
      data: `fields url; where id=${game.artworks[0].toString()};`
    })
    game.image = imageData.data[0].url.replace('t_thumb', 't_screenshot_med');
  }

  if (!game.videos) {
    game.videos = 'none';
  };

  return game;
};

const getGameHowLong = async name => {
  const pattern = /(\([0-9]{4}\))/g;
  let updatedName = name;

  if (pattern.test(name)) {
    updatedName = name.replace(pattern, '');
  };


  const data = await hltbService.search(`${updatedName}`);
  const results = data.sort((a, b) => b.similarity - a.similarity)
                      .map(game => {
                        return({
                          gameplayMain: game.gameplayMain,
                          gameplayMainExtra: game.gameplayMainExtra,
                          gameplayCompletionist: game.gameplayCompletionist,
                        })
                      })[0];
  return results;
};

export const getGameInfo = async (req, res) => {
  const { id } = req.params;
  const dataRAWG = await axios.get(`${baseUrlRAWG}games/${id}?&key=${process.env.RAWG_KEY}`);

  const resultsRAWG = {
    name: dataRAWG.data.name,
    year: dataRAWG.data.released,
    genres: dataRAWG.data.genres.map(genre => genre.name),
    platforms: dataRAWG.data.platforms.map(platform => platform.platform.name),
    description: dataRAWG.data.description,
    background: dataRAWG.data.background_image,
  }
  
  const dataIGDB = await getGame(resultsRAWG.name);
  const dataHLTB = await getGameHowLong(resultsRAWG.name);

  res.send([resultsRAWG, dataHLTB, dataIGDB]);
}
