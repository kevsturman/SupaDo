import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';

// apollo client setup
const API_KEY = process.env.REACT_APP_ADMIN_SECRET;
const client = new ApolloClient({
  uri: 'https://supado.herokuapp.com/v1/graphql',
  headers: {
    "x-hasura-admin-secret" : API_KEY
  }

})

function App() {


  return (
    <ApolloProvider client={client}>      
      <div 
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <div className="mx-auto card cardbanner" style={{backgroundColor:"white"}}>
        <img className="card-img-top banner" src="card-header.png" style={{height:"50px"}} alt="Card cap"/>
          <div className="card-body">
          <TaskList notCompleted/>
          <TaskList notCompleted={false} />
          <hr/>
          <AddTask />
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
