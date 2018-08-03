import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Comic from '../../components/Comic/Comic';
import data from '../../data/main';
import Search from '../../components/Search/Search';
import { withStyles } from '../../../node_modules/@material-ui/core';

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
    const { results } = ('data' in data) ? data.data : [];
    this.setState({ results });
  }

  listComics = (comics, classes) => comics.map((comic) => {
    const parsedComic = comic;
    parsedComic.image = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
    return (
      <Grid key={comic.id} item xs={3} className={classes.paper}>
        <Comic {...parsedComic} />
      </Grid>
    );
  });

  render() {
    const { results } = this.state;
    const { classes } = this.props;
    console.log('first result', results);
    return (
      <Grid container className={classes.root}>
        <Grid item md={12}>
          <Search results={results} />
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
