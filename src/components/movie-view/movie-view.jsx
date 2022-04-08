import React from 'react';

export class MovieView extends React.Component {

    keypressCallback(event) {  //This will be the callback function for both addEventListener() and removeEventListener() when adding and removing the listener, respectively.
        console.log(event.key);
    }
    componentDidMount() { //executed after component is added to the DOM
        document.addEventListener('keypress', this.keypressCallback); //move the callback function into a component method and use it in addEventListener
    }
    componentWillUnmount() { //Executed before component is removed from the DOM. This removes the event listener when the component is about to be unmounted and removed
        document.removeEventListener('keypress', this.keypressCallback);
    }

}
render() {
    const { movie, onBackClick } = this.props;
    return (
        <div>
            <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Description}</span>
            </div>
            <div className="movie-genre">
                <span className="label">Genre: </span>
                <span className="value">{movie.Genre}</span>
            </div>
            <div className="movie-director">
                <span className="label">Director: </span>
                <span className="value">{movie.Director}</span>
            </div>
            <button onClick={() => { onBackClick(null); }}>Back</button>
        </div> // onClick() event listener sets selectedMovie variable in main-view to null, allowing to return back to list of MovieCards

    );
}
}