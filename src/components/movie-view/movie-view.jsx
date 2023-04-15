import './movie-view.scss';
import Button from 'react-bootstrap/Button';

export const MovieView = ({ movie, onBackClick }) => {
   return (
      <div class='movie-info'>
         <div>
            <img src={movie.ImagePath} alt={"Poster for : " + movie.Title} />
         </div>
         <br />   
         <div>
            <span className='heading'>Title:   </span>
            <span>{movie.Title}</span>
         </div>
         <br />   
         <div>
            <span className='heading'>Genre:   </span>
            <span>{movie.Genre.Name}</span>
         </div>
         <br />   
         <div>
            <span className='heading'>Description: </span>
            <span>{movie.Description}</span>
         </div>
         <br />   
         <div>
            <span className='heading'>Director: </span>
            <span>{movie.Director.Name}</span>
         </div>
         <br />
         <Button
            onClick={onBackClick}
            className='back-button'
            style={{ cursor: 'pointer' }}
            >Back
         </Button>
      </div>
   );
 };
 