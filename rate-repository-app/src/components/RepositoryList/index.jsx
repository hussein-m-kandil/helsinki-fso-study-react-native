import { useDebounce } from 'use-debounce';
import { useState } from 'react';

import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../../hooks/useRepositories';
import Loader from '../Loader';

const SORT_OPTIONS = [
  {
    label: 'Latest repositories',
    variables: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  },
  {
    label: 'Highest rated repositories',
    variables: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  },
  {
    label: 'Lowest rated repositories',
    variables: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
  },
];

const RepositoryList = () => {
  const [selectedSortOption, setSelectedSortOption] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState();

  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { repositories, loading, error, fetchMore } = useRepositories({
    variables: {
      ...SORT_OPTIONS[selectedSortOption].variables,
      searchKeyword: debouncedSearchKeyword,
      first: 5,
    },
  });

  const sort = (index) => {
    if (index >= 0 && index < SORT_OPTIONS.length) {
      setSelectedSortOption(index);
    }
  };

  const search = (keyword) => {
    setSearchKeyword(keyword);
  };

  return (
    <Loader
      loading={!repositories && loading}
      error={repositories ? null : error}
    >
      <RepositoryListContainer
        repositories={repositories}
        sortOptions={SORT_OPTIONS}
        selectedSortOption={selectedSortOption}
        searchKeyword={searchKeyword}
        onEndReached={fetchMore}
        onSearch={search}
        onSort={sort}
      />
    </Loader>
  );
};

export default RepositoryList;
