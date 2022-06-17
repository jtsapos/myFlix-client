import React from "react";
import { Col, Container } from 'react-bootstrap';
import { connect } from "react-redux";

import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from "../visibility-filter-input/visibility-filter-input";

const mapStateToProps = state => { //The first argument, mapStateToProps, is a function that converts or transforms the store into props that the MoviesList component will use. 
    //Remember that the store contains your application’s state, which is why this function is called mapStateToProps
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />;

    return <>
        <div>
            <Col md={4} style={{ margin: '1em' }}>
                <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            </Col>
        </div>
        {filteredMovies.map(m => (
            <Col md={4} key={m._id}>
                <MovieCard movie={m} />
            </Col>
        ))}
    </>;
}

export default connect(mapStateToProps)(MoviesList); 