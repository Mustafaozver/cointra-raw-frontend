import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { MyPZContainer, MyPZChart, MyPZSelect } from '@mypz/react-kit';

import { getPropertyUserActionsCount } from '../../api/properties/propertyUserActionsApi';
import { getFeedbackCount } from '../../api/feedbacks/feedbacksApi';

import './HomePage.scss';

const frequenceConfig = [
  { name: 'Month', days: 30, stepInMinutes: 60*24, dateFormat: 'DD-MM-YYYY' },
  { name: 'Week', days: 7, stepInMinutes: 60*24, dateFormat: 'DD-MM-YYYY' },
  // { name: 'Day', days: 1, stepInMinutes: 60, dateFormat: 'hh:mm' },
  { name: 'Year', days: 365, stepInMinutes: 60*24, dateFormat: 'MMMM' },
];
const frequenceOptions = frequenceConfig.map((i) => {
  return {text: i.name, value: i.days};
});
const userActionsConfig = [
  {name: 'Views', userAction: 'view_details'},
  {name: 'Email', userAction: 'request_email'},
  {name: 'Phone', userAction: 'request_phone'},
];
const userActions = userActionsConfig.map(i => i.userAction);
const ratesConfig = [
  {name: '1', rate: 1},
  {name: '2', rate: 2},
  {name: '3', rate: 3},
  {name: '4', rate: 4},
  {name: '5', rate: 5},
];
const rates = ratesConfig.map(i => i.rate);

const HomePage = () => {
  const [frequence, setFrequence] = useState(30);
  const [propertyUserActionData, setPropertyUserActionData] = useState(null);
  const [feedbackData, setfeedbackData] = useState(null);

  useEffect(() => {
    const params = {
      startAt: moment().add(-frequence, 'days').toISOString(),
      endAt: null,
      stepInMinutes: null,
    };

    Promise.all([
      getPropertyUserActionsCount(params),
      getFeedbackCount(params),
    ]).then(([dataActions, dataFeedback]) => {
      setPropertyUserActionData(dataActions);
      setfeedbackData(dataFeedback);
    }).catch((e) => {
      console.log('error:', e.message);
    });
  }, [frequence]);

  const onChangeFrequence = (item) => {
    setFrequence(item.target.value);
  };

  const renderUserActionChart = () => {
    if (!propertyUserActionData) {
      return null;
    }

    const currentFrequenceConfig = frequenceConfig.find(i => i.days === frequence);
    const data = [];
    let currentDate = moment().add(-currentFrequenceConfig.days, 'days');
    const endDate = moment();
    while (currentDate < endDate) {
      currentDate = currentDate.add(currentFrequenceConfig.stepInMinutes, 'minutes');
      const dateIndex = currentDate.format('YYYY-MM-DD');
      const displayFormat = currentDate.format(currentFrequenceConfig.dateFormat);
      const dayData = [displayFormat];
      userActions.forEach((userAction) => {
        let statsFound = propertyUserActionData.allStats.find(s => s.date === dateIndex && s.actionType === userAction);
        if (statsFound) {
          dayData.push(parseInt(statsFound.count));
          return;
        }
        dayData.push(0);
      });
      data.push(dayData);
    }
    data.unshift(['Time', ...userActions]);

    return (<MyPZChart
      height="20rem"
      type="AreaChart"
      title="User actions over time"
      hAxisTitle="Time"
      data={data}
    />);
  };

  const renderUserActionAggregatedChart = () => {
    if (!propertyUserActionData) {
      return null;
    }

    const data = [['Action Type', 'count']];
    userActions.forEach((userAction) => {
      const dataFound = propertyUserActionData.aggregated.find(i => i.actionType === userAction);
      if (dataFound) {
        data.push([userAction, parseFloat(dataFound.count)]);
        return;
      }
      data.push([userAction, 0]);
    });

    return (<MyPZChart
      height="20rem"
      type="PieChart"
      title="User actions stats"
      data={data}
    />);
  };

  const renderChartFeedback = () => {
    if (!feedbackData) {
      return null;
    }

    const currentFrequenceConfig = frequenceConfig.find(i => i.days === frequence);
    const data = [];
    let currentDate = moment().add(-currentFrequenceConfig.days, 'days');
    const endDate = moment();
    while (currentDate < endDate) {
      currentDate = currentDate.add(currentFrequenceConfig.stepInMinutes, 'minutes');
      const dateIndex = currentDate.format('YYYY-MM-DD');
      const displayFormat = currentDate.format(currentFrequenceConfig.dateFormat);
      const dayData = [displayFormat];
      rates.forEach((rate) => {
        let statsFound = feedbackData.allStats.find(s => s.date === dateIndex && s.rate === rate);
        if (statsFound) {
          dayData.push(parseInt(statsFound.count));
          return;
        }
        dayData.push(0);
      });
      data.push(dayData);
    }
    data.unshift(['Time', ...rates.map(r => r.toString())]);

    return (<MyPZChart
      height="20rem"
      type="AreaChart"
      title="Feedbacks over time"
      hAxisTitle="Time"
      data={data}
    />);
  };

  const renderFeedbackAggregatedChart = () => {
    if (!feedbackData) {
      return null;
    }

    const data = [['Feedback', 'count']];
    rates.forEach((rate) => {
      const dataFound = feedbackData.aggregated.find(i => i.rate === rate);
      if (dataFound) {
        data.push([rate.toString(), parseFloat(dataFound.count)]);
        return;
      }
      data.push([rate.toString(), 0]);
    });

    return (<MyPZChart
      height="20rem"
      type="PieChart"
      title="Feedback stats"
      data={data}
    />);
  };

  const renderFeedbackAverage = () => {
    if (!feedbackData) {
      return null;
    }

    const {sum, count} = feedbackData.aggregated.reduce((acc, d) => {
      acc.sum += d.rate * parseInt(d.count);
      acc.count += parseInt(d.count);
      return acc;
    }, {sum: 0, count: 0});
    const average = count > 0 ? sum / count : 0;

    if (average <= 0) {
      return null;
    }

    return (<div>
      Average: {average.toFixed(2)} / 5
    </div>);
  };

  return (
    <div className="page-home">
      <MyPZContainer>
        <h1>Welcome Super Admin</h1>
        <MyPZSelect
          options={frequenceOptions}
          value={frequence}
          onChange={onChangeFrequence}
          />
        <h2>User actions</h2>
        {renderUserActionChart()}
        {renderUserActionAggregatedChart()}
        <h2>Feedback</h2>
        {renderChartFeedback()}
        <div className="page-home__chart-group">
          {renderFeedbackAggregatedChart()}
          {renderFeedbackAverage()}
        </div>
      </MyPZContainer>
    </div>
  );
}

export default HomePage;
