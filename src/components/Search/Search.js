import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    fontSize: 16,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
});

function NoOptionsMessage(props) {
  const { selectProps, innerProps, children } = props;
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.noOptionsMessage}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  const { selectProps, innerRef, children, innerProps } = props;
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: selectProps.classes.input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
    />
  );
}

function Option(props) {
  const { innerProps, isFocused, innerRef, isSelected, children } = props;

  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
}

function Placeholder(props) {
  const { innerProps, selectProps, children } = props;
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.placeholder}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

function SingleValue(props) {
  const { innerProps, selectProps, children } = props;
  return (
    <Typography className={selectProps.classes.singleValue} {...innerProps}>
      {children}
    </Typography>
  );
}

function ValueContainer(props) {
  const { selectProps, children } = props;
  return (
    <div className={selectProps.classes.valueContainer}>
      {children}
    </div>
  );
}

function MultiValue(props) {
  const { removeProps, selectProps, children, isFocused } = props;
  return (
    <Chip
      tabIndex={-1}
      label={children}
      className={classNames(selectProps.classes.chip, {
        [selectProps.classes.chipFocused]: isFocused,
      })}
      onDelete={(event) => {
        removeProps.onClick();
        removeProps.onMouseDown(event);
      }}
    />
  );
}

const components = {
  Option,
  Control,
  NoOptionsMessage,
  Placeholder,
  SingleValue,
  MultiValue,
  ValueContainer,
};

class Search extends React.Component {
  state = {
    single: null,
    multi: null,
  };


  parsedResults = results => results.map(result => ({
    value: result.id,
    label: result.name,
    ...result,
  }))

  handleChange = name => (value) => {
    console.log('change name', name);
    console.log('change value', value);
    this.setState({
      [name]: value,
    });
    // Call the reload function
    const { relaodResult } = this.props;
    relaodResult(value);
  };

  render() {
    const { classes, results } = this.props;
    const { single } = this.state;
    const parsedResults = this.parsedResults(results);
    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            options={parsedResults}
            components={components}
            value={single}
            onChange={this.handleChange('single')}
            placeholder="Search a character (start with a)"
          />
        </NoSsr>
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Search);
