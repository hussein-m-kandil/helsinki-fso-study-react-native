import { render, screen, within } from '@testing-library/react-native';
import { describe, expect, it } from '@jest/globals';

import RepositoryListContainer from './RepositoryListContainer';
import { formatCount } from './Count';

describe('RepositoryList', () => {
  describe('Count', () => {
    it('keeps count less than 1000 as is', () => {
      expect(formatCount(999)).toBe('999');
    });

    it('formats count greater than or equal to 1000', () => {
      expect(formatCount(1000)).toBe('1K');
      expect(formatCount(1500)).toBe('1.5K');
      expect(formatCount(2000)).toBe('2K');
      expect(formatCount(999999)).toBe('1M');
      expect(formatCount(1000000)).toBe('1M');
      expect(formatCount(1500000)).toBe('1.5M');
      expect(formatCount(999999999)).toBe('1B');
      expect(formatCount(1000000000)).toBe('1B');
      expect(formatCount(1500000000)).toBe('1.5B');
    });
  });

  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />);

      expect(screen.getAllByLabelText('Repository')).toHaveLength(
        repositories.edges.length,
      );

      for (const { node } of repositories.edges) {
        const item = screen.getByTestId(`repository_${node.id}`);
        expect(within(item).getByText(node.fullName)).toBeVisible();
        expect(within(item).getByText(node.description)).toBeVisible();
        expect(within(item).getByText(node.language)).toBeVisible();
        expect(
          within(item).getByText(formatCount(node.stargazersCount)),
        ).toBeVisible();
        expect(
          within(item).getByText(formatCount(node.forksCount)),
        ).toBeVisible();
        expect(
          within(item).getByText(formatCount(node.reviewCount)),
        ).toBeVisible();
        expect(
          within(item).getByText(formatCount(node.ratingAverage)),
        ).toBeVisible();
      }
    });
  });
});
