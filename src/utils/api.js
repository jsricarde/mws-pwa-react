import md5 from 'md5';

require('babel-polyfill');

const apiPublicKey = 'a9869ab549dd289d2fd30b851ae2d653';
const apiPrivateKey = '40f10c6c7b2aeda7c264ea67a8f0ba44952d9c53';

const ts = Date.now();

const hash = `${md5(`${ts}${apiPrivateKey}${apiPublicKey}`)}`;

const heroAPIUrlBase = 'https://gateway.marvel.com/v1/public';

/**
 * Utilities functions
 */
/**
 * Get the json data from fetch API
 * @param  {string} url - The url of the resource to consumes
 * @return {Object} result -The json object response
 */
export const getJSON = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    // console.log(JSON.stringify(result)); // eslint-disable-line
    return result;
  } catch (err) {
    console.log('fetch failed', err); // eslint-disable-line
    return err;
  }
};

/**
 * Add the credential params to url base
 * @param  {string} inUrl - The url to append credentials
 * @return {string} url -The url string with the credentials append
 */
export const addUrlParams = (inUrl) => {
  const url = new URL(inUrl);
  const params = {
    apikey: `${apiPublicKey}`,
    hash: `${hash}`,
    ts: `${ts}`,
  };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return url;
};


/**
 * Get the comics object via getJSON method
 * @return {Object} result -The json object response
 */
export const getComics = async () => {
  const url = addUrlParams(`${heroAPIUrlBase}/comics`);
  const request = await getJSON(url).then(result => result);
  return request;
};

/**
 * Get the characters object via getJSON method
 * @return {Object} result -The json object response
 */
export const getCharacters = async () => {
  const url = addUrlParams(`${heroAPIUrlBase}/characters`);
  const request = await getJSON(url).then(result => result);
  return request;
};

/**
 * Get the comics object via getJSON method by character Id
 * Async Function
 * @param {Number} id -The character id
 * @return {Object} result -The json object response
 */
export const getComicsById = async (id) => {
  const url = addUrlParams(`${heroAPIUrlBase}/characters/${id}/comics?orderBy=-focDate`);
  const request = await getJSON(url).then(result => result);
  return request;
};

/**
 * Get the character object via getJSON method by character Id
 * Async Function
 * @param {Number} id -The character id
 * @return {Object} result -The json object response
 */
export const getCharacterById = async (id) => {
  const url = addUrlParams(`${heroAPIUrlBase}/characters/${id}`);
  const request = await getJSON(url).then(result => result);
  return request;
};

/**
 * Get the characters object via getJSON method
 * @param {String} str -The character start name
 * @return {Object} result -The json object response
 */
export const getCharactersLikeName = async (str) => {
  const url = addUrlParams(`${heroAPIUrlBase}/characters?nameStartsWith=${str}`);
  const request = await getJSON(url).then(result => result);
  return request;
};
