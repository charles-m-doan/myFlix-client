import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';

export const MovieCard = ({ movie , onMovieClick }) => {
   return (
      <Card 
         className="h-100"
         onClick={() => onMovieClick(movie)}
      >
            <Card.Img variant='top' src={movie.ImagePath} />
            <Card.Body>
               <Card.Title>{movie.Title}</Card.Title>
               <Card.Text>{movie.Director.Name}</Card.Text>
               <Button onClick={() => onMovieClick(movie)} variant='link'>
               Open
               </Button>
            </Card.Body>

     </Card>
   );
 };

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Director: PropTypes.object
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};