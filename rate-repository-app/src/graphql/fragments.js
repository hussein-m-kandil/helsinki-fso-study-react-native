import { gql } from '@apollo/client';

export const PAGE_INFO_FRAGMENT = gql`
  fragment PageInfoFragment on PageInfo {
    hasPreviousPage
    hasNextPage
    startCursor
    endCursor
  }
`;

export const REVIEW_FRAGMENT = gql`
  fragment ReviewFragment on Review {
    id
    userId
    repositoryId
    createdAt
    rating
    text
    user {
      id
      username
    }
  }
`;

export const REPOSITORY_FRAGMENT = gql`
  ${PAGE_INFO_FRAGMENT}

  ${REVIEW_FRAGMENT}

  fragment RepositoryFragment on Repository {
    id
    url
    ownerAvatarUrl
    description
    fullName
    language
    ratingAverage
    forksCount
    reviewCount
    stargazersCount
    reviews(first: $first, after: $after) {
      edges {
        node {
          ...ReviewFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;
