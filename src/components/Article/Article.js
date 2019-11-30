import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { Slide, DialogContent, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} />;
});

const Article = ({ open, article, handleClose }) => {
  if (!open) {
    return null;
  }
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
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
  open: PropTypes.bool.isRequired,
  article: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string
  }).isRequired,
  handleClose: PropTypes.func.isRequired
};

export default Article;
