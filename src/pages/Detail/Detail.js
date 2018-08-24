import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';
import { getComicsById, getCharacterById } from '../../utils/api';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    padding: '3%',
  },
  gridList: {
    width: '100%',
    height: 'auto',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  progress: {
    marginLeft: '50%',
    marginRight: '50%',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  centerTitle: {
    marginBottom: 0,
  },
});


class Detail extends Component {
  state = {
    profile: {},
    comics: [],
    loaded: false,
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    getCharacterById(id).then(((result) => {
      if ('data' in result && 'results' in result.data) {
        console.log('result', result);
        const profile = result.data.results[0];
        this.setState({ profile });
      }
    }));

    // Search the comics
    getComicsById(id).then(((result) => {
      if ('data' in result && 'results' in result.data) {
        // console.log('result', result);
        const comics = result.data.results;
        this.setState({ comics, loaded: true });
      }
    }));
  }

  render() {
    const { classes } = this.props;
    const { comics, loaded, profile } = this.state;
    console.log('profile', profile);
    console.log('comics', comics);
    return (
      <div className={classes.root}>
        <Grid
          container
          justify="center"
          alignItems="center"
        >
          <Grid item xs={6} md={1}>
            <Button component={Link} variant="outlined" color="primary" to="/">
              <ArrowBackIos className={classes.rightIcon} />
            </Button>
          </Grid>
          <Grid item xs={6} md={11}>
            <Typography className={classes.centerTitle} variant="display2" gutterBottom>
              {profile.name}
            </Typography>
          </Grid>

          {loaded ? (
            <Grid item xs={12} md={12}>
              <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                  <ListSubheader component="div">
                    {profile.description}
                  </ListSubheader>
                </GridListTile>
                {comics.map(comic => (
                  <GridListTile key={comic.id}>
                    <img
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt={comic.title}
                    />
                    <GridListTileBar
                      title={comic.title}
                      subtitle={(
                        <span>
                          by:
                          {' '}
                          {/* {comic.creators.items[0].name} */}
                        </span>
                      )}
                      actionIcon={(
                        <IconButton className={classes.icon}>
                          <InfoIcon />
                        </IconButton>
                      )}
                    />
                  </GridListTile>
                ))}
              </GridList>
            </Grid>
          ) : (
            <Grid item xs={12} md={12}>
              <CircularProgress className={classes.progress} />
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

Detail.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default withStyles(styles)(Detail);
