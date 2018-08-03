import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: '100%',
    margin: '5%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

class Comic extends Component {
  handleButtonClick = (event) => {
    event.preventDefault();
  }

  render() {
    const { classes, image, name, description } = this.props;
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={image}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {name}
            </Typography>
            <Typography component="p">
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              See comics
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

Comic.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default withStyles(styles)(Comic);
