import { gql } from '@apollo/client';

export const REPOSITORY_FRAGMENT = gql`
  fragment RepositoryFragment on Repository {
    id
    ownerAvatarUrl
    description
    fullName
    language
    ratingAverage
    forksCount
    reviewCount
    stargazersCount
  }
`;
