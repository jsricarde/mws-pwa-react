import md5 from 'md5';

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
    console.log(JSON.stringify(result)); // eslint-disable-line
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
export const getComics = () => {
  const url = this.addUrlParams(`${heroAPIUrlBase}/comics`);

  // try {
  //   const response = await fetch(url);
  //   const result = await response.json();
  //   console.log(JSON.stringify(result));
  //   return result;
  // } catch (err) {
  //   console.log('fetch failed', err);
  //   return err;
  // }

  this.getJSON(url).then((result) => {
    console.log('comics result', result); // eslint-disable-line
    // if (result) app.loadSuperHeroes(result)
  });
};
