import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
const styles = theme => {
  return {
    listItem: {
      cursor: 'pointer',
      justifyContent: ' space-between',
      '&.Mui-selected.haveData,&.Mui-selected.haveData:hover': {
        backgroundColor: 'rgba(41, 150, 243, .3)'
      },
      '&:hover, &.Mui-selected,&.Mui-selected:hover': {
        backgroundColor: theme.palette.default.light
      },
      '&::selection': { backgroundColor: 'transparent' }
    }
  };
};

const EsaList = props => {
  const {
    classes,
    className,
    defaultSelectedValues,
    listOptions,
    listItemName,
    onChangeSelect,
    ...rest
  } = props;
  const [selectedOptions, setSelect] = useState([]);
  const rootClassName = classNames(classes.formControl, className);

  const setSelectedListItems = useCallback(
    val => {
      const currentIndex = selectedOptions.indexOf(val);
      const newSelectedOptions = [...selectedOptions];
      if (currentIndex === -1) {
        newSelectedOptions.push(val);
      } else {
        newSelectedOptions.splice(currentIndex, 1);
      }
      setSelect(newSelectedOptions);
      onChangeSelect(newSelectedOptions);
    },
    [selectedOptions, onChangeSelect]
  );

  const isSelected = e => {
    return selectedOptions.includes(e) || defaultSelectedValues.includes(e);
  };
  return (
    <List {...rest} className={rootClassName}>
      {listOptions.map(option => (
        <ListItem
          key={option.id}
          className={classes.listItem}
          selected={isSelected(option.id)}
          onClick={() => setSelectedListItems(option.id)}
        >
          <ListItemText primary={option[listItemName]} />
        </ListItem>
      ))}
    </List>
  );
};

EsaList.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  id: PropTypes.string,
  defaultSelectedValues: PropTypes.array,
  listOptions: PropTypes.array,
  onChangeSelect: PropTypes.func,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

EsaList.defaultProps = {
  //label: '',
  id: '',
  defaultSelectedValues: [],
  listOptions: []
};

export default withStyles(styles)(EsaList);
