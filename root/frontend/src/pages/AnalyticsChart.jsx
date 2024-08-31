import React from 'react';
import { AreaChart, Card, List, ListItem } from '@tremor/react';
import classNames from 'classnames';

const data = [
  { date: 'Jan 24', Commits: 232, PullRequests: 50 },
  { date: 'Feb 24', Commits: 241, PullRequests: 0 },
  { date: 'Mar 24', Commits: 291, PullRequests: 0 },
  { date: 'Apr 24', Commits: 101, PullRequests: 0 },
  { date: 'May 24', Commits: 318, PullRequests: 0 },
  { date: 'Jun 24', Commits: 205, PullRequests: 0 },
  { date: 'Jul 24', Commits: 372, PullRequests: 0 },
  { date: 'Aug 24', Commits: 341, PullRequests: 0 },
  { date: 'Sep 24', Commits: 387, PullRequests: 120 },
  { date: 'Oct 24', Commits: 220, PullRequests: 0 },
  { date: 'Nov 24', Commits: 372, PullRequests: 0 },
  { date: 'Dec 24', Commits: 321, PullRequests: 0 },
];

const summary = [
  { name: 'Commits', value: 3273 },
  { name: 'Pull Requests', value: 120 },
];

const valueFormatter = (number) => `${Intl.NumberFormat('us').format(number).toString()}`;

const statusColor = {
  Commits: 'bg-blue-500',
  PullRequests: 'bg-violet-500',
};

const AnalyticsChart = () => {
  return (
    <Card className="sm:mx-auto sm:max-w-lg">
      <h3 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Repository Metrics
      </h3>
      <AreaChart
        data={data}
        index="date"
        categories={['Commits', 'Pull Requests']}
        colors={['blue', 'violet']}
        valueFormatter={valueFormatter}
        showLegend={false}
        showYAxis={false}
        showGradient={false}
        startEndOnly={true}
        className="mt-6 h-32"
      />
      <List className="mt-2">
        {summary.map((item) => (
          <ListItem key={item.name}>
            <div className="flex items-center space-x-2">
              <span className={classNames(statusColor[item.name], 'h-0.5 w-3')} aria-hidden={true} />
              <span>{item.name}</span>
            </div>
            <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {valueFormatter(item.value)}
            </span>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default AnalyticsChart;
