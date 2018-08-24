import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Comic from '../../components/Comic/Comic';
import data from '../../data/main';
import Search from '../../components/Search/Search';
import { withStyles } from '../../../node_modules/@material-ui/core';
import { getCharacters, getCharactersLikeName } from '../../utils/api';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 0,
    textAlign: 'left',
  },
});

class Home extends Component {
  state = { results: [] };

  componentDidMount() {
    getCharacters().then(((result) => {
      if ('data' in result && 'results' in result.data) {
        console.log('result', result);
        const { data: { results } } = result;
        this.setState({ results });
      }
    }));
    // const { results } = ('data' in data) ? data.data : [];
    // this.setState({ results });
  }

  reloadResult = (result) => {
    // console.log('reloadResult', result);
    const results = (Array.isArray(result)) ? data.data.results : [result];
    this.setState({ results });
  }

  searchByName = (str) => {
    getCharactersLikeName(str).then(((result) => {
      if ('data' in result && 'results' in result.data) {
        const { data: { results } } = result;
        console.log('name results', results);
        this.setState({ results });
      }
    }));
  }

  listComics = (comics, classes) => comics.map((comic) => {
    const parsedComic = comic;
    parsedComic.image = `${parsedComic.thumbnail.path}.${parsedComic.thumbnail.extension}`;
    return (
      <Grid key={parsedComic.id} item xs={12} md={3} className={classes.paper}>
        <Comic {...parsedComic} />
      </Grid>
    );
  });

  render() {
    const { results } = this.state;
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} md={12}>
          <Search
            results={results}
            reloadResult={this.reloadResult}
            searchByName={this.searchByName}
          />
        </Grid>
        {this.listComics(results, classes)}
      </Grid>
    );
  }
}
Home.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Home);
