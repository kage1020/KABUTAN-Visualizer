const yearResultClass = 'fin_year_result_d';
const yearGrowthClass = 'fin_year_growth_d';
const yearProfitClass = 'fin_year_profit_d';
const halfResultClass = 'fin_half_result_d';
const quarterResultClass = 'fin_quarter_result_d';
const quarterGrowthClass = 'fin_quarter_growth_d';
const yearResultTabClass = 'fin_year_result';
const yearGrowthTabClass = 'fin_year_growth';
const yearProfitTabClass = 'fin_year_profit';
const quarterResultTabClass = 'fin_quarter_result';
const quarterGrowthTabClass = 'fin_quarter_growth';
const yearGraphId = 'year';
const halfGraphId = 'half';
const quarterGraphId = 'quarter';
const yearResultLegend = ['売上高', '営業益', '経常益', '最終益', '修正1株益', '修正1株配'];
const yearProfitLegend = [
  '売上高',
  '経常利益',
  '売上経常利益率',
  '営業益',
  '売上営業利益率',
  'ＲＯＥ',
  'ＲＯＡ',
  '総資産回転率',
  '修正1株益',
];
const halfResultLegend = ['売上高', '営業益', '経常益', '最終益', '修正1株益', '修正1株配'];
const quarterResultLegend = ['売上高', '営業益', '経常益', '最終益', '修正1株益', '売上営業損益率'];

window.addEventListener('DOMContentLoaded', () => {
  const el = document.createElement('script');
  el.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
  document.head.appendChild(el);
});

window.addEventListener('load', () => {
  let tab = JSON.parse(
    decodeURIComponent(document.cookie)
      .split(';')
      .find((c) => c.includes('shared_finance_tab'))
      ?.replace('shared_finance_tab=', '')
  );
  if (!tab) {
    tab = { tab_year: 'result', tab_quarter: 'result' };
  }

  $('.fin_year_profit_d').after(
    `<div class="button-box"><button id="year-display" onclick="toggleDisplay('year')">非表示にする</button><button id="${yearResultClass}" class=${
      tab['tab_year'] === 'result' ? 'active' : ''
    } onclick="render('${yearResultClass}')">【通期】業績推移</button><button  id="${yearGrowthClass}" class=${
      tab['tab_year'] === 'growth' ? 'active' : ''
    } onclick="render('${yearGrowthClass}')">【通期】成長性</button><button id="${yearProfitClass}" class=${
      tab['tab_year'] === 'profit' ? 'active' : ''
    } onclick="render('${yearProfitClass}')">【通期】収益性</button></div><canvas id="year" width="640" height="320"></canvas>`
  );
  $('.fin_half_result_d').after(
    `<div class="button-box"><button id="half-display" onclick="toggleDisplay('half')">非表示にする</button></div><canvas id="half" width="640" height="320"></canvas>`
  );
  $('.fin_quarter_growth_d').after(
    `<div class="button-box"><button id="quarter-display" onclick="toggleDisplay('quarter')">非表示にする</button><button id="${quarterResultClass}" class=${
      tab['tab_quarter'] === 'result' ? 'active' : ''
    } onclick="render('${quarterResultClass}')">【四半期】業績推移</button><button id="${quarterGrowthClass}" class=${
      tab['tab_quarter'] === 'growth' ? 'active' : ''
    } onclick="render('${quarterGrowthClass}')">【四半期】成長性</button></div><canvas id="quarter" width="640" height="320"></canvas>`
  );

  if (tab['tab_year'] === 'result') render(yearResultClass);
  else if (tab['tab_year'] === 'growth') render(yearGrowthClass);
  else if (tab['tab_year'] === 'profit') render(yearProfitClass);
  render(halfResultClass);
  if (tab['tab_quarter'] === 'result') render(quarterResultClass);
  else if (tab['tab_quarter'] === 'growth') render(quarterGrowthClass);

  $(`.${yearResultTabClass}`).on('click', () => {
    if ($('#year').is(':visible')) {
      render(yearResultClass);
    }
  });
  $(`.${yearGrowthTabClass}`).on('click', () => {
    if ($('#year').is(':visible')) {
      render(yearGrowthClass);
    }
  });
  $(`.${yearProfitTabClass}`).on('click', () => {
    if ($('#year').is(':visible')) {
      render(yearProfitClass);
    }
  });
  $(`.${quarterResultTabClass}`).on('click', () => {
    if ($('#quarter').is(':visible')) {
      render(quarterResultClass);
    }
  });
  $(`.${quarterGrowthTabClass}`).on('click', () => {
    if ($('#quarter').is(':visible')) {
      render(quarterGrowthClass);
    }
  });
  $(`#${yearResultClass}`).on('click', () => {
    $(`.${yearResultTabClass}`).click();
  });
  $(`#${yearGrowthClass}`).on('click', () => {
    $(`.${yearGrowthTabClass}`).click();
  });
  $(`#${yearProfitClass}`).on('click', () => {
    $(`.${yearProfitTabClass}`).click();
  });
  $(`#${quarterResultClass}`).on('click', () => {
    $(`.${quarterResultTabClass}`).click();
  });
  $(`#${quarterGrowthClass}`).on('click', () => {
    $(`.${quarterGrowthTabClass}`).click();
  });
});

function toggleDisplay(target) {
  $(`#${target}`).toggle();
  $(`#${target}-display`).text($(`#${target}`).is(':visible') ? '非表示にする' : '表示する');
}

function render(className) {
  const data = parseTable($(`.${className} > table`), className);

  let canvasId;
  if (className === yearResultClass) canvasId = yearGraphId;
  else if (className === yearGrowthClass) canvasId = yearGraphId;
  else if (className === yearProfitClass) canvasId = yearGraphId;
  else if (className === halfResultClass) canvasId = halfGraphId;
  else if (className === quarterResultClass) canvasId = quarterGraphId;
  else if (className === quarterGrowthClass) canvasId = quarterGraphId;

  if (window[canvasId].destroy) window[canvasId].destroy();

  if (className.includes('year')) {
    [$(`#${yearResultClass}`), $(`#${yearGrowthClass}`), $(`#${yearProfitClass}`)].forEach((el) => {
      if (el.attr('id') === className) el.addClass('active');
      else el.removeClass('active');
    });
  } else if (className.includes('quarter')) {
    [$(`#${quarterResultClass}`), $(`#${quarterGrowthClass}`)].forEach((el) => {
      if (el.attr('id') === className) el.addClass('active');
      else el.removeClass('active');
    });
  }

  renderGraph(data, className, canvasId);
}

function parseTable(table, className) {
  let heads = table
    .find('thead > tr > th')
    .map((_, th) => $(th).text().trim())
    .get();

  if (className === yearResultClass) {
    heads.shift();
    heads.pop();
  } else if (className === yearGrowthClass) {
    heads = heads.slice(1, 2);
  } else if (className === yearProfitClass) {
    heads.shift();
  } else if (className === halfResultClass) {
    heads.shift();
    heads.pop();
  } else if (className === quarterResultClass) {
    heads.shift();
    heads.pop();
  } else if (className === quarterGrowthClass) {
    heads = heads.slice(1, 2);
  }

  const rows = table.find('tbody > tr');
  let data = rows
    .map((_, row) =>
      $(row)
        .find('td')
        .map((_, cell) => {
          const s = $(cell).text().replace(/,/g, '');
          return isNaN(s) ? s : parseFloat(s);
        })
    )
    .get()
    .map((d) => d.get());

  // Remove the first row if it's a expansion line
  if (data?.[0]?.length <= 1) data.shift();
  // Remove the last row if it's a expansion line
  if (data.at(-1)?.length <= 1) data.pop();
  // Remove the second of last row if it's a comparison line
  if (data.at(-1)?.at(-1) === '(%)') data.pop();
  // Remove the last column if it's a date and table is yearResult
  if (className === yearResultClass) data = data.map((d) => d.slice(0, -1));
  // Remove redundant column if table is yearGrowth or quarterGrowth
  else if (className === yearGrowthClass || className === quarterGrowthClass) {
    data[0].pop();
    data = data.map((d) =>
      d.map((v) => {
        if (typeof v === 'string' && v.includes('倍'))
          return parseFloat(v.replace('倍', '')) * 100 - 100;
        return isNaN(v) ? null : v;
      })
    );
  }

  data = data.map((d) => d.map((v) => (isNaN(v) ? null : v)));

  const labels = table
    .find('tbody > tr > th')
    .map((_, th) =>
      $(th)
        .text()
        .replace(/I|U|連|単/, '')
        .trim()
    )
    .get();
  // Remove the last label if it's a comparison line
  if (labels.at(-1) === '前期比' || labels.at(-1) === '前年同期比') labels.pop();

  return [heads, ...data.map((d, i) => [labels[i], ...d])];
}

function renderGraph(data, className, target) {
  const graphData = createGraphData(data, className);
  const graphConfig = createGraphConfig(graphData, className);
  const canvas = document.getElementById(target);
  window[target] = new Chart(canvas, graphConfig);
}

function createGraphData(data, className) {
  const years = data.slice(1).map((d) => d[0]);
  const yearResultOrders = [3, 4, 5, 6, 2, 1];
  const yearProfitOrders = [6, 7, 5, 4, 3, 2, 1];
  const halfResultOrders = [3, 4, 5, 6, 2, 1];
  const quarterResultOrders = [3, 4, 5, 6, 2, 1];

  const graphData = {
    labels: years,
    datasets: Array(data[0].length)
      .fill(0)
      .map((_, i) => {
        let type = 'bar';
        let yAxisID = 'left';
        let order = 1;

        if (className === yearResultClass) {
          if (i >= 4) {
            type = 'line';
            yAxisID = 'right';
          }
          order = yearResultOrders[i];
        } else if (className === yearProfitClass) {
          if (i === 2 || i === 5) {
            type = 'line';
            yAxisID = 'right';
          } else if (i === 3 || i === 4 || i === 6) {
            type = 'line';
            yAxisID = 'right2';
          }
          order = yearProfitOrders[i];
        } else if (className === halfResultClass) {
          if (i >= 4) {
            type = 'line';
            yAxisID = 'right';
          }
          order = halfResultOrders[i];
        } else if (className === quarterResultClass) {
          if (i === 4) {
            type = 'line';
            yAxisID = 'right';
          } else if (i === 5) {
            type = 'line';
            yAxisID = 'right2';
          }
          order = quarterResultOrders[i];
        }

        return {
          type: type,
          label: data[0][i],
          data: data.slice(1).map((d) => d[i + 1]),
          backgroundColor: color(i, 'background'),
          borderColor: color(i, 'border'),
          yAxisID: yAxisID,
          order: order,
        };
      }),
  };

  return graphData;
}

function color(i, type) {
  switch (i) {
    case 0:
      if (type == 'border') return '#FF1F1F';
      return '#FF5C5C';
    case 1:
      if (type == 'border') return '#FF7070';
      return '#FFADAD';
    case 2:
      if (type == 'border') return '#FFBF70';
      return '#FFD6A5';
    case 3:
      if (type == 'border') return '#FBFF85';
      return '#FDFFB6';
    case 4:
      if (type == 'border') return '#99FF85';
      return '#CAFFBF';
    case 5:
      if (type == 'border') return '#5CF1FF';
      return '#9BF6FF';
    case 6:
      if (type == 'border') return '#70A7FF';
      return '#A0C4FF';
    case 7:
      if (type == 'border') return '#9785FF';
      return '#BDB2FF';
    case 8:
      if (type == 'border') return '#FF99FF';
      return '#FFC6FF';
    case 9:
      if (type == 'border') return '#FFFFC2';
      return '#FFFFFC';
    default:
      return '#000000';
  }
}

function createGraphConfig(data, className) {
  let rightDisplay = false,
    right2Display = false;

  if (
    className === yearResultClass ||
    className === yearProfitClass ||
    className === halfResultClass ||
    className === quarterResultClass
  ) {
    rightDisplay = true;
  }
  if (className === yearProfitClass || className === quarterResultClass) {
    right2Display = true;
  }

  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      scales: {
        left: {
          type: 'linear',
          position: 'left',
          grid: { color: 'transparent' },
        },
        right: {
          type: 'linear',
          position: 'right',
          grid: { display: false },
          display: rightDisplay,
          ticks: {
            callback: function (value) {
              return className === yearProfitClass ? value + '%' : value;
            },
          },
        },
        right2: {
          type: 'linear',
          position: 'right',
          max: className === quarterResultClass ? 100 : undefined,
          grid: { display: false },
          display: right2Display,
          ticks: {
            callback: function (value) {
              return className === quarterResultClass ? value + '%' : value;
            },
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            sort: (a, b) => {
              if (className === yearResultClass) {
                return yearResultLegend.indexOf(a.text) - yearResultLegend.indexOf(b.text);
              } else if (className === yearProfitClass) {
                return yearProfitLegend.indexOf(a.text) - yearProfitLegend.indexOf(b.text);
              } else if (className === halfResultClass) {
                return halfResultLegend.indexOf(a.text) - halfResultLegend.indexOf(b.text);
              } else if (className === quarterResultClass) {
                return quarterResultLegend.indexOf(a.text) - quarterResultLegend.indexOf(b.text);
              }
              return 0;
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              if (tooltipItem.dataset.label === '総資産回転率') return tooltipItem.dataset.label + ': ' + tooltipItem.formattedValue + '回';
              if (tooltipItem.dataset.label.includes('率') || tooltipItem.dataset.label.includes('ＲＯ'))
                return tooltipItem.dataset.label + ': ' + tooltipItem.formattedValue + '%';
              if (tooltipItem.dataset.label.includes('修正'))
                return tooltipItem.dataset.label + ': ' + tooltipItem.formattedValue + '円';
                return tooltipItem.dataset.label + ': ' + tooltipItem.formattedValue + '百万円';
            },
          },
        },
      },
    },
  };

  return config;
}
