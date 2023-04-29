import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginUser } from '../../util/api';

export const LoginView = ({ onLoggedIn } ) => {
   const [username, setUsername] = useState(' ');
   const [password, setPassword] = useState(' ');

   const handleSubmit = (event) => {
      event.preventDefault();
    
      loginUser(username, password)
        .then((data) => {
          onLoggedIn(data.user, data.token);
        })
        .catch((error) => {
          alert(error.message);
        });
    };

   return (
      <Form onSubmit={handleSubmit}>
         <Form.Group controlId='formUsername'>
            <Form.Label>Username:</Form.Label>
            <Form.Control
               type='text'
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               required
               minLength={3} 
            />
         </Form.Group>
         <br />
         <Form.Group controlId='formPassword'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
               type='password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               required
            />
         </Form.Group>
         <br />
         <Button variant='primary' type='submit'>
            Submit
         </Button>
         
      </Form>
   );
};