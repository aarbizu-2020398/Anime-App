

export const fetchAnimeCategory = async (searchTerm, page = 1, pageSize = 12) => {
  const offset = (page - 1) * pageSize;
  const url = searchTerm
    ? `https://kitsu.io/api/edge/anime?filter[text]=${searchTerm}&page[limit]=${pageSize}&page[offset]=${offset}`
    : `https://kitsu.io/api/edge/anime?page[limit]=${pageSize}&page[offset]=${offset}`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    animes: data.data,
    total: data.meta ? data.meta.count : 0
  };
};

export const fetchAnimeDetail = async (animeId) => {
  const url = `https://kitsu.io/api/edge/anime/${animeId}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.data;
};
