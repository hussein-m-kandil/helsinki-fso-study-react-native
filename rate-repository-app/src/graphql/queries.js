import { gql } from '@apollo/client';

import {
  PAGE_INFO_FRAGMENT,
  REPOSITORY_FRAGMENT,
  REVIEW_FRAGMENT,
} from './fragments';

export const GET_REPOSITORIES = gql`
  ${PAGE_INFO_FRAGMENT}

  ${REPOSITORY_FRAGMENT}

  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      edges {
        cursor
        node {
          ...RepositoryFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;

export const REPOSITORY = gql`
  ${REPOSITORY_FRAGMENT}

  query Repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryFragment
    }
  }
`;

export const ME = gql`
  ${REVIEW_FRAGMENT}

  ${PAGE_INFO_FRAGMENT}

  query Me($withReviews: Boolean = false, $first: Int, $after: String) {
    me {
      id
      username
      reviews(first: $first, after: $after) @include(if: $withReviews) {
        edges {
          cursor
          node {
            ...ReviewFragment
            repository {
              fullName
            }
          }
        }
        pageInfo {
          ...PageInfoFragment
        }
      }
    }
  }
`;
