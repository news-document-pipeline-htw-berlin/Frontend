import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { DialogContent, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const Article = ({ article, handleClose }) => {
  if (!article) {
    return null;
  }
  return (
    <Dialog fullScreen open={!!article} onClose={handleClose}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Grid container justify="center">
            <Grid item xs={6}>
              <Typography variant="h6">{article.title}</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container justify="center">
        <Grid item xs={6}>
          <DialogContent>
            <Typography>{article.body}</Typography>
          </DialogContent>
        </Grid>
      </Grid>
    </Dialog>
  );
};

Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string
  }),
  handleClose: PropTypes.func.isRequired
};

Article.defaultProps = {
  article: null
};

export default Article;
