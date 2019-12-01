import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';

const Pagination = ({ currentPage, maxPages, onPageChange }) => {
  function generateButtons() {
    const length = 10;
    const range = Array.from({ length }, (_, i) => 1 + i);
    return range.map(el => (
      <Grid item key={`grid${el}`}>
        <Button key={`button${el}`}>{el}</Button>
      </Grid>
    ));
  }
  return (
    <Grid container>
      <Grid item>
        <Button>
          <FontAwesomeIcon
            icon={faCaretLeft}
            onClick={() => onPageChange(currentPage - 1)}
          />
        </Button>
      </Grid>
      {generateButtons()}
      <Grid item>
        <Button>
          <FontAwesomeIcon
            icon={faCaretRight}
            onClick={() => onPageChange(currentPage + 1)}
          />
        </Button>
      </Grid>
    </Grid>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  maxPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

Pagination.defaultProps = {
  currentPage: 1
};

export default Pagination;
