import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { Button, Grid } from '@material-ui/core';
import range from 'lodash/range';

const Pagination = ({
    currentPage,
    totalRecords,
    pageNeighbours,
    pageLimit,
    handlePageChange
}) => {
    const totalPages = Math.ceil(totalRecords / pageLimit);

    if (totalPages < 2) return null;

    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    const LEFT_PAGE = 'LEFT';
    const RIGHT_PAGE = 'RIGHT';

    function generatePageNumbers() {
        if (totalPages <= totalBlocks) {
            return range(1, totalPages + 1);
        }
        const startPage = Math.max(2, currentPage - pageNeighbours);
        const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

        let pages = range(startPage, endPage + 1);

        const hasLeftSpill = startPage > 2;
        const hasRightSpill = totalPages - endPage > 1;
        const spillOffset = totalNumbers - (pages.length + 1);

        switch (true) {
            // handle: (1) < {5 6} [7] {8 9} (10)
            case hasLeftSpill && !hasRightSpill: {
                const extraPages = range(startPage - spillOffset, startPage);
                pages = [LEFT_PAGE, ...extraPages, ...pages];
                break;
            }

            // handle: (1) {2 3} [4] {5 6} > (10)
            case !hasLeftSpill && hasRightSpill: {
                const extraPages = range(
                    endPage + 1,
                    endPage + spillOffset + 1
                );
                pages = [...pages, ...extraPages, RIGHT_PAGE];
                break;
            }

            // handle: (1) < {4 5} [6] {7 8} > (10)
            case hasLeftSpill && hasRightSpill:
            default: {
                pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                break;
            }
        }

        return [1, ...pages, totalPages];
    }

    const pageNumbers = generatePageNumbers();

    function generatePages() {
        return pageNumbers.map(pageNo => {
            switch (pageNo) {
                case LEFT_PAGE: {
                    return (
                        <Grid item key={LEFT_PAGE}>
                            <Button>
                                <FontAwesomeIcon
                                    style={{ padding: 3 }}
                                    size="md"
                                    icon={faAngleLeft}
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                />
                            </Button>
                        </Grid>
                    );
                }
                case RIGHT_PAGE: {
                    return (
                        <Grid item key={RIGHT_PAGE}>
                            <Button size="large">
                                <FontAwesomeIcon
                                    style={{ padding: 3 }}
                                    icon={faAngleRight}
                                    size="md"
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                />
                            </Button>
                        </Grid>
                    );
                }
                default:
                    return (
                        <Grid item key={pageNo}>
                            <Button
                                color={
                                    currentPage === pageNo
                                        ? 'primary'
                                        : 'inherit'
                                }
                                onClick={() => handlePageChange(pageNo)}
                            >
                                {pageNo}
                            </Button>
                        </Grid>
                    );
            }
        });
    }

    return (
        <Grid container justify="space-evenly">
            {generatePages()}
        </Grid>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number,
    totalRecords: PropTypes.number.isRequired,
    pageLimit: PropTypes.number,
    pageNeighbours: PropTypes.number,
    handlePageChange: PropTypes.func.isRequired
};

Pagination.defaultProps = {
    currentPage: 1,
    pageLimit: 24,
    pageNeighbours: 2
};

export default Pagination;
