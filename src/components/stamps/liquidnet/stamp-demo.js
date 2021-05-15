import {pressReleaseSeries, priorityRating, series, stockHomeSeries, volume, EPSMomentumData, stockEventsData, watchlistEventsData} from './sample-data';
const container = {background: '#1c2127', padding: 0, margin: 0, listStyle: 'none', border: 'none', display: 'flex', flexWrap: 'wrap'};
const item = {flexDirection: 'row', paddingRight: '4px', paddingTop: '4px'};

<ul style={container}>
  <li style={item}>
    <Stamp stampType="jobs" value={10} jobs={series} notificationsCount={10} footer="Last 90D" />
  </li>
  <li style={item}>
    <Stamp stampType="priority-home" watchlistName="My Watchlsit" rating={priorityRating} totalStocks={100} />
  </li>
  <li style={item}>
    <Stamp stampType="performance" value={5.96} data={series} />
  </li>
  <li style={item}>
    <Stamp
      tooltip="EV/EBITDA<br />Mean: 1.07<br />Std Dev: 0.10<br />ZScore: 1.45"
      stampType="stock-home"
      header="GOOGL US"
      price={100}
      notificationsCount={5}
      series={stockHomeSeries}
      sessionStart={1590664737000}
      sessionEnd={1590665937000}
    />
  </li>
  <li style={item}>
    <Stamp
      significantColour="red"
      borderColour="None"
      stampType="signals"
      value={1.47}
      daysAgo={2}
      tooltip="EV/EBITDA<br />Mean: 1.07<br />Std Dev: 0.10<br />ZScore: 1.45"
    />
  </li>
  <li style={item}>
    <Stamp
      stampType="volume"
      significantColour="None"
      borderColour="None"
      value="325k"
      data={volume}
      tooltip="EV/EBITDA<br />Mean: 1.07<br />Std Dev: 0.10<br />ZScore: 1.45"
    />
  </li>
  <li style={item}>
    <Stamp
      tooltip="EV/EBITDA<br />Mean: 1.07<br />Std Dev: 0.10<br />ZScore: 1.45"
      stampType="insiders"
      buyValue="$23.4mm"
      buyStarRatings={2}
      buyDaysAgo={2}
      buyDaysAgoColour="green"
      sellValue="$0.5mm"
      sellStarRatings={0}
      sellDaysAgo={99}
      sellDaysAgoColour=""
      significantColour="None"
      borderColour="red"
      footer="1M"
    />
  </li>
  <li style={item}>
    <Stamp
      tooltip="EV/EBITDA<br />Mean: 1.07<br />Std Dev: 0.10<br />ZScore: 1.45"
      stampType="valuation"
      currentLevel={10.3}
      monthForward="12M Fwd"
      fundamental="EV/EBITDA"
      whiskerBarRangeMin={-4}
      whiskerBarRangeMax={4}
      whiskerPosition={-2}
      whiskerColour="green"
      significantColour="red"
      borderColour="red"
      footer="2yr (vs Ind)"
    />
  </li>
  <li style={item}>
    <Stamp stampType="implied-vol" value={11.3} fiveDayValue={0.6} fiveDayPercentage="5.2%" whiskerPosition={2} whiskerColour="red" />
  </li>
  <li style={item}>
    <Stamp
      tooltip="Level: 0.22%<br />Std Dev: 0.07<br />ZScore: -0.31"
      stampType="short-interest"
      currentLevel={1.98}
      daysIndicator="5D"
      daysIndicatorDirection="up"
      absoluteChange={1.7}
      changePercentage="732%"
      changeColour="red"
      daysToCover={4.13}
      whiskerBarRangeMin={-4}
      whiskerBarRangeMax={4}
      whiskerPosition={2}
      whiskerColour="red"
      significantColour="green"
      borderColour="green"
      isDividend={true}
      footer="2yr"
    />
  </li>
  <li style={item}>
    <Stamp
      significantColour="None"
      borderColour="green"
      stampType="cds"
      fiveDayValue={0.0}
      whiskerPosition={2}
      whiskerColour="red"
      fiveDayPercentage="0.0%"
      value={77.9}
      tooltip="Level: 0.22%<br />Std Dev: 0.07<br />ZScore: -0.31"
    />
  </li>
  <li style={item}>
    <Stamp
      significantColour="green"
      borderColour="None"
      stampType="divergence"
      price={3.27}
      eps={0.04}
      si={-0.19}
      cds="NA"
      vol={0}
      tooltip="Level: 0.22%<br />Std Dev: 0.07<br />ZScore: -0.31"
    />
  </li>
  <li style={item}>
    <Stamp stampType="esg" averageGrade="B+" environmentGrade="A+" socialGrade="C-" governanceGrade="F" updated="2020.08.20" />
  </li>
  <li style={item}>
    <Stamp
      stampType="press-release"
      prCount={1000}
      prData={pressReleaseSeries}
      sentimentScore={8.1}
      sentimentScoreData={pressReleaseSeries}
      notificationsCount={666}
      notificationsData={pressReleaseSeries}
      header="Press Releases"
      footer="Last 5 days"
      significantColour="green"
      borderColour="green"
    />
  </li>
  <li style={item}>
    <Stamp
      stampType="EPS-momentum"
      significantColour="None"
      borderColour="None"
      value="66%"
      data={EPSMomentumData}
    />
  </li>
  <li style={item}>
    <Stamp
      stampType="dividend"
      currentLevel={0.66}
      monthForward="12M Fwd"
      whiskerBarRangeMin={-4}
      whiskerBarRangeMax={4}
      whiskerPosition={-2}
      whiskerColour="green"
      significantColour="red"
      borderColour="red"
      footer="2yr (vs Ind)"
    />
  </li>
  <li style={item}>
    <Stamp
      stampType="stock-events"
      events={stockEventsData}
    />
  </li>
  <li style={item}>
    <Stamp
      stampType="watchlist-events"
      events={watchlistEventsData}
    />
  </li>
</ul>;