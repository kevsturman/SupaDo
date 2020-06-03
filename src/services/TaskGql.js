import gql from 'graphql-tag';

export const ADD_TODO = gql`
mutation AddTodo($title: String!,$dueDate: date!) {
    insert_todos_one(object: {title: $title,dueDate: $dueDate}) {
      id
      title
    }
  }
  
`;

export const UPDATE_TODO = gql`
mutation updatetodos($id: Int!,$dueDate: date!) {
    update_todos(where: {id: {_eq: $id}}, _set: {dueDate : $dueDate}) {
      affected_rows
    }
  }
`;

export const MARK_COMPLETE = gql`
mutation markcomplete($id: Int!,$completedDate: date!) {
    update_todos(where: {id: {_eq: $id}}, _set: {completedDate : $completedDate}) {
      affected_rows
    }
  }
`;

export const CLEAR_TODO = gql`
mutation cleartodos($id: Int!) {
    update_todos(where: {id: {_eq: $id}}, _set: {completedDate: null}) {
      affected_rows
    }
  }
`;

export const DELETE_TODO = gql`
mutation deletetodo($id: Int!) {
    delete_todos(where: {id: {_eq: $id}}) {
      affected_rows
    }
  }
`;

export const UPDATE_TITLE = gql`
mutation updatetodo($id: Int!,$title: String!) {
    update_todos(where: {id: {_eq: $id}}, _set: {title: $title}) {
      affected_rows
    }
  }
`;

export const getTasksQuery = gql`
query getTasks($isNull : Boolean! ) {
  todos(order_by: {id: asc},where: {completedDate: {_is_null: $isNull}}) {
    completedDate
    dueDate
    id
    title
  }
}
`

