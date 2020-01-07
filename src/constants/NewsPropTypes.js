import PropTypes from 'prop-types';

export const ArticlePropTypes = PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    intro: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    newsSite: PropTypes.string.isRequired
});
