import TrendingTagShimmer from '@components/Shared/Shimmer/TrendingTagShimmer';
import { Card } from '@components/UI/Card';
import { ErrorMessage } from '@components/UI/ErrorMessage';
import { TrendingUpIcon } from '@heroicons/react/solid';
import { Analytics } from '@lib/analytics';
import nFormatter from '@lib/nFormatter';
import { Trans } from '@lingui/macro';
import type { TagResult } from 'lens';
import { TagSortCriteria, useTrendingQuery } from 'lens';
import Link from 'next/link';
import type { FC } from 'react';
import { MISCELLANEOUS } from 'src/tracking';

const Title = () => {
  return (
    <div className="flex gap-2 items-center px-5 mb-2 sm:px-0">
      <TrendingUpIcon className="w-4 h-4 text-green-500" />
      <div>
        <Trans>Trending</Trans>
      </div>
    </div>
  );
};

const Trending: FC = () => {
  const { data, loading, error } = useTrendingQuery({
    variables: { request: { limit: 7, sort: TagSortCriteria.MostPopular } }
  });

  if (loading) {
    return (
      <>
        <Title />
        <Card className="mb-4 space-y-4 p-5">
          <TrendingTagShimmer />
          <TrendingTagShimmer />
          <TrendingTagShimmer />
          <TrendingTagShimmer />
          <TrendingTagShimmer />
          <TrendingTagShimmer />
        </Card>
      </>
    );
  }

  return (
    <>
      <Title />
      <Card as="aside" className="mb-4 space-y-4 p-5">
        <ErrorMessage title="Failed to load trending" error={error} />
        {data?.allPublicationsTags?.items?.map((tag: TagResult) =>
          tag?.tag !== '{}' ? (
            <div key={tag?.tag}>
              <Link
                href={`/search?q=${tag?.tag}&type=pubs`}
                onClick={() => Analytics.track(MISCELLANEOUS.OPEN_TRENDING_TAG)}
              >
                <div className="font-bold">{tag?.tag}</div>
                <Trans>
                  <div className="text-[12px] lt-text-gray-500">{nFormatter(tag?.total)} Publications</div>
                </Trans>
              </Link>
            </div>
          ) : null
        )}
      </Card>
    </>
  );
};

export default Trending;
