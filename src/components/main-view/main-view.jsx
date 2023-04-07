import {useState} from 'react';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: '642f01b6e45b1ce1d8de8d81',
      Title: 'Magnolia',
      Released: '1999',
      Description: 'An epic mosaic of interrelated characters in search of love, forgiveness and meaning in the San Fernando Valley.',
      Genre: {
         Name: 'Drama',
         Description: "The drama genre features stories with high stakes and many conflicts. They're plot-driven and demand that every character and scene move the story forward. "
      },
      Director: {
         Name: 'Paul Thomas Anderson',
         Bio: 'Paul Thomas Andersonis an American screenwriter and director whose character-driven films, set mostly in the American West, were recognized for their ambitious and engaging storytelling.',
         Birth: '1970',
         Death: 'present'
      },
      Writers: [ 'Paul Thomas Anderson' ],
      Actors: [ 'Tom Cruise', 'William H. Macy', 'Philip Seymour Hoffman' ],
      ImagePath: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/magnolia_ver2_480x.progressive.jpg?v=1601149120',
    },
    {
      id: '642f01b6e45b1ce1d8de8d86',
      Title: 'The Truman Show',
      Released: '1998',
      Description: 'An insurance salesman discovers his whole life is actually a reality TV show.',
      Genre: {
         Name: [ 'Drama', 'Comedy' ],
         Description: "The drama genre features stories with high stakes and many conflicts. They're plot-driven and demand that every character and scene move the story forward."
      },
      Director: {
         Name: 'Peter Weir',
         Bio: 'Peter Lindsay Weir, (born August 21, 1944, Sydney, Australia), Australian film director and screenwriter known for intelligent emotional dramas that frequently explore the relationship between characters and their social environment.',
         Birth: '1944',
         Death: 'present'
      },
      Writers: [ 'Andrew Niccol' ],
      Actors: [ 'Jim Carrey', 'Ed Harris', 'Laura Linney' ],
      ImagePath: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/9ddfd95c8261fa7baf064ba513e1d487_2fe356be-fb6d-468f-b9ee-bd8e0e6ef074_480x.progressive.jpg?v=1573652450',
    },
    {
      id: '642f014ce45b1ce1d8de8d6a',
      Title: 'The Revenant',
      Released: '2015',
      Description: 'A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.',
      Genre: {
        Name: [ 'Adventure', 'Action', 'Drama' ],
        Description: 'A common theme of adventure films is of characters leaving their home or place of comfort and going to fulfill a goal, embarking on travels, quests, treasure hunts, heroic journeys; and explorations or searches for the unknown. '
      },
      Director: {
        Name: 'Alejandro G. Iñárritu',
        Bio: "Alejandro González Iñárritu is a Mexican film director.  González Iñárritu is the first Mexican director to be nominated for the Academy Award for Best Director and by the Directors Guild of America for Best Director. He is also the first Mexican-born director to have won the Prix de la mise en scene or best director award at Cannes (2006).  His six feature films, 'Amores Perros' (2000), '21 Grams' (2003), 'Babel' (2006), 'Biutiful' (2010), 'Birdman' (2014) and 'The Revenant' (2015), have gained critical acclaim world-wide including two Academy Award nominations.",
        Birth: '1963',
        Death: 'present'
      },
      Writers: [ 'Mark L. Smith', 'Alejandro G. Iñárritu', 'Michael Punke' ],
      Actors: [ 'Leonardo DiCaprio', 'Tom Hardy', 'Domhnall Gleeson' ],
      ImagePath: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/2b783ded82e94bebc6fdead47b6f57f0_5fc9baff-134d-4ef2-b90c-ee8d0643fb9c_480x.progressive.jpg?v=1573588608',
    },
    {
      id: '642f014ce45b1ce1d8de8d62',
      Title: 'Millenium Actress',
      Released: '2001',
      Description: 'A TV interviewer and his cameraman meet a former actress and travel through her memories and career.',
      Genre: {
        Name: [ 'Fantasy', 'Animation', 'Arthouse' ],
        Description: 'Fantasy films have fantastic themes; usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.'
      },
      Director: {
        Name: 'Satoshi Kon',
        Bio: 'Japanese film director, animator, screenwriter and manga artist from Sapporo, Hokkaido and a member of the Japanese Animation Creators Association (JAniCA).',
        Birth: '1963',
        Death: '2010'
      },
      Writers: [ 'Sadayuki Murai', 'Satoshi Kon' ],
      Actors: [ 'Mami Koyama', 'Shôzô Îzuka', 'Shouko Tsuda' ],
      ImagePath: 'https://www.slantmagazine.com/wp-content/uploads/2003/11/millenniumactress.jpg',
    },
    {
      id: '642f01b6e45b1ce1d8de8d82',
      Title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      Released: '1964',
      Description: 'An insane American general orders a bombing attack on the Soviet Union, triggering a path to nuclear holocaust that a war room full of politicians and generals frantically tries to stop.',
      Genre: {
        Name: [ 'War', 'Comedy' ],
        Description: 'A War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama.'
      },
      Director: {
        Name: 'Stanley Kubrick',
        Bio: 'Stanley Kubrick is an American motion-picture director and writer whose films are characterized by his dramatic visual style, meticulous attention to detail, and a detached, often ironic or pessimistic perspective. ',
        Birth: '1928',
        Death: '1999'
      },
      Writers: [ 'Terry Southern', 'Peter George', 'Stanley Kubrick' ],
      Actors: [ 'Peter Sellers', 'George C. Scott', 'Sterling Hayden' ],
      ImagePath: 'https://cdn.shopify.com/s/files/1/0057/3728/3618/products/0c11a7b58222c382891ae87be39454eb_8abc7615-c7a0-4a73-8b95-1da2e1123345_480x.progressive.jpg?v=1573594956',
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
