import { gql } from '@apollo/client';

import { REPOSITORY_FRAGMENT } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories {
    repositories {
      edges {
        cursor
        node {
          ...RepositoryFragment
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;
