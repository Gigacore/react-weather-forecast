export function groupByDays(data) {

  console.log('foobar');

	const { list } = data;
	
  const sortByDate = list.reduce(function (obj, item) {
    const forecastDate = item.dt_txt.substr(0,10);
  
    obj[forecastDate] = obj[forecastDate] || [];
    obj[forecastDate].push(item);
    return obj;
	}, {});

  const groups = Object.keys(sortByDate).map(function (key) {
    return {day: key, forecasts: sortByDate[key]};
  });
  
  return groups;
};