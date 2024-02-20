// ===================================================
//               KABUTAN Visualizer
// ===================================================

// ==================== Libraries ====================

window.addEventListener('DOMContentLoaded', () => {
  // Chart.js
  const chartjs = document.createElement('script');
  chartjs.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
  document.body.appendChild(chartjs);
  // ECharts
  const echarts = document.createElement('script');
  echarts.src = 'https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js';
  document.body.appendChild(echarts);
});

// ==================== Constants ====================

// finance page

// table container class
const FINANCE_YEAR_RESULT_CLASS = 'fin_year_result_d';
const FINANCE_YEAR_GROWTH_CLASS = 'fin_year_growth_d';
const FINANCE_YEAR_PROFIT_CLASS = 'fin_year_profit_d';
const FINANCE_HALF_RESULT_CLASS = 'fin_half_result_d';
const FINANCE_CASH_FLOW_CLASS = 'fin_cash_flow_d';
const FINANCE_QUARTER_RESULT_CLASS = 'fin_quarter_result_d';
const FINANCE_QUARTER_GROWTH_CLASS = 'fin_quarter_growth_d';
const FINANCE_FINANCE_CLASS = 'fin_finance_d';

// tab class
const FINANCE_YEAR_RESULT_TAB_CLASS = 'fin_year_result';
const FINANCE_YEAR_GROWTH_TAB_CLASS = 'fin_year_growth';
const FINANCE_YEAR_PROFIT_TAB_CLASS = 'fin_year_profit';
const FINANCE_QUARTER_RESULT_TAB_CLASS = 'fin_quarter_result';
const FINANCE_QUARTER_GROWTH_TAB_CLASS = 'fin_quarter_growth';

// canvas id
const FINANCE_YEAR_CANVAS_ID = 'fin_year_canvas';
const FINANCE_HALF_CANVAS_ID = 'fin_half_canvas';
const FINANCE_CASH_FLOW_CANVAS_ID = 'fin_cash_flow_canvas';
const FINANCE_QUARTER_CANVAS_ID = 'fin_quarter_canvas';
const FINANCE_FINANCE_CANVAS_ID = 'fin_finance_canvas';

// button id
const FINANCE_YEAR_DISPLAY_BUTTON_ID = 'fin_year_display_button';
const FINANCE_YEAR_RESULT_BUTTON_ID = 'fin_year_result_button';
const FINANCE_YEAR_GROWTH_BUTTON_ID = 'fin_year_growth_button';
const FINANCE_YEAR_PROFIT_BUTTON_ID = 'fin_year_profit_button';
const FINANCE_HALF_DISPLAY_BUTTON_ID = 'fin_half_display_button';
const FINANCE_CASH_FLOW_DISPLAY_BUTTON_ID = 'fin_cash_flow_display_button';
const FINANCE_QUARTER_DISPLAY_BUTTON_ID = 'fin_quarter_display_button';
const FINANCE_QUARTER_RESULT_BUTTON_ID = 'fin_quarter_result_button';
const FINANCE_QUARTER_GROWTH_BUTTON_ID = 'fin_quarter_growth_button';
const FINANCE_FINANCE_DISPLAY_BUTTON_ID = 'fin_finance_display_button';

// graph items
const FINANCE_YEAR_RESULT_ITEMS = [
  '売上高',
  '営業益',
  '経常益',
  '最終益',
  '修正1株益',
  '修正1株配',
];
const FINANCE_YEAR_GROWTH_ITEMS = ['売上高'];
const FINANCE_YEAR_PROFIT_ITEMS = [
  '売上高',
  '営業益',
  '売上営業利益率',
  '経常利益',
  '売上経常利益率',
  'ＲＯＥ',
  'ＲＯＡ',
  '総資産回転率',
  '修正1株益',
];
const FINANCE_HALF_RESULT_ITEMS = [
  '売上高',
  '営業益',
  '経常益',
  '最終益',
  '修正1株益',
  '修正1株配',
];
const FINANCE_CASH_FLOW_ITEMS = [
  '営業益',
  'フリーCF',
  '営業CF',
  '投資CF',
  '財務CF',
  '現金等残高',
  '現金比率',
];
const FINANCE_QUARTER_RESULT_ITEMS = [
  '売上高',
  '営業益',
  '経常益',
  '最終益',
  '修正1株益',
  '売上営業損益率',
];
const FINANCE_QUARTER_GROWTH_ITEMS = ['売上高'];
const FINANCE_FINANCE_ITEMS = [
  '1株純資産',
  '自己資本比率',
  '総資産',
  '自己資本',
  '剰余金',
  '有利子負債倍率',
];

// graph orders
const FINANCE_YEAR_RESULT_ORDERS = [3, 4, 5, 6, 2, 1];
const FINANCE_YEAR_GROWTH_ORDERS = [1];
const FINANCE_YEAR_PROFIT_ORDERS = [6, 7, 5, 4, 3, 2, 1];
const FINANCE_HALF_RESULT_ORDERS = [3, 4, 5, 6, 2, 1];
const FINANCE_CASH_FLOW_ORDERS = [2, 3, 4, 5, 6, 1];
const FINANCE_QUARTER_RESULT_ORDERS = [3, 4, 5, 6, 2, 1];
const FINANCE_QUARTER_GROWTH_ORDERS = [1];
const FINANCE_FINANCE_ORDERS = [3, 2, 4, 5, 6, 1];

// news page

// table container class
const NEWS_ACC_CLASS = 'fin_acc_result_d';
const NEWS_HALF_CLASS = 'fin_half_result_d';
const NEWS_YEAR_CLASS = 'fin_year_result_d';
const NEWS_QUARTER_CLASS = 'fin_quarter_result_d';

// canvas id
const NEWS_ACC_CANVAS_ID = 'fin_acc_canvas';
const NEWS_HALF_CANVAS_ID = 'fin_half_canvas';
const NEWS_YEAR_CANVAS_ID = 'fin_year_canvas';
const NEWS_QUARTER_CANVAS_ID = 'fin_quarter_canvas';

// button id
const NEWS_ACC_DISPLAY_BUTTON_ID = 'fin_acc_display_button';
const NEWS_HALF_DISPLAY_BUTTON_ID = 'fin_half_display_button';
const NEWS_YEAR_DISPLAY_BUTTON_ID = 'fin_year_display_button';
const NEWS_QUARTER_DISPLAY_BUTTON_ID = 'fin_quarter_display_button';

// graph items
const NEWS_ACC_ITEMS = [
  '売上高',
  '営業益',
  '経常益',
  '最終益',
  '修正1株益',
  '修正1株配',
  '対上期進捗率',
  '対通期進捗率',
];
const NEWS_HALF_ITEMS = ['売上高', '営業益', '経常益', '最終益', '修正1株益', '修正1株配'];
const NEWS_YEAR_ITEMS = ['売上高', '営業益', '経常益', '最終益', '修正1株益', '修正1株配'];
const NEWS_QUARTER_ITEMS = ['売上高', '営業益', '経常益', '最終益', '修正1株益', '売上営業損益率'];

// graph orders
const NEWS_ACC_ORDERS = [3, 4, 5, 6, 2, 1];
const NEWS_HALF_ORDERS = [3, 4, 5, 6, 2, 1];
const NEWS_YEAR_ORDERS = [3, 4, 5, 6, 2, 1];
const NEWS_QUARTER_ORDERS = [3, 4, 5, 6, 2, 1];

// kabuka page

// table container class
const KABUKA_HISTORY_CLASS = 'stock_kabuka_dwm';
const KABUKA_SHIN_HISTORY_CLASS = 'stock_kabuka_shin';

// canvas id
const KABUKA_HISTORY_CANVAS_ID = 'stock_kabuka_canvas';
const KABUKA_SHIN_HISTORY_CANVAS_ID = 'stock_kabuka_shin_canvas';

// button id
const KABUKA_HISTORY_DISPLAY_BUTTON_ID = 'stock_kabuka_display_button';

// graph items
const KABUKA_HISTORY_ITEMS = ['始値', '高値', '安値', '終値', '売買高(株)'];
const KABUKA_SHIN_HISTORY_ITEMS = ['終値', '売買高(株)', '売り残(株)', '買い残(株)', '信用倍率'];

// graph orders
const KABUKA_HISTORY_ORDERS = [1, 2, 3, 4, 5];
const KABUKA_SHIN_HISTORY_ORDERS = [5, 2, 3, 4, 1];

// ================ Event Listeners =================

window.addEventListener('load', () => {
  const url = window.location.href;
  const { b, ashi } = getSearchParams();

  if (url.includes('finance')) {
    const tab = JSON.parse(
      getCookie('shared_finance_tab') || '{ "tab_year": "result", "tab_quarter": "result" }'
    );
    addFinanceDOM(tab);
    renderFinanceGraph(tab);

    // add click event to tab for rerendering graph
    $(`.${FINANCE_YEAR_RESULT_TAB_CLASS}`).click(() => {
      if ($(`#${FINANCE_YEAR_CANVAS_ID}`).is(':visible')) {
        changeGraph(FINANCE_YEAR_RESULT_CLASS);
      }
    });
    $(`.${FINANCE_YEAR_GROWTH_TAB_CLASS}`).click(() => {
      if ($(`#${FINANCE_YEAR_CANVAS_ID}`).is(':visible')) {
        changeGraph(FINANCE_YEAR_GROWTH_CLASS);
      }
    });
    $(`.${FINANCE_YEAR_PROFIT_TAB_CLASS}`).click(() => {
      if ($(`#${FINANCE_YEAR_CANVAS_ID}`).is(':visible')) {
        changeGraph(FINANCE_YEAR_PROFIT_CLASS);
      }
    });
    $(`.${FINANCE_QUARTER_RESULT_TAB_CLASS}`).click(() => {
      if ($(`#${FINANCE_QUARTER_CANVAS_ID}`).is(':visible')) {
        changeGraph(FINANCE_QUARTER_RESULT_CLASS);
      }
    });
    $(`.${FINANCE_QUARTER_GROWTH_TAB_CLASS}`).click(() => {
      if ($(`#${FINANCE_QUARTER_CANVAS_ID}`).is(':visible')) {
        changeGraph(FINANCE_QUARTER_GROWTH_CLASS);
      }
    });
    $(`#${FINANCE_YEAR_RESULT_BUTTON_ID}`).click(() => {
      if ($(`#${FINANCE_YEAR_CANVAS_ID}`).is(':visible')) {
        $(`.${FINANCE_YEAR_RESULT_TAB_CLASS}`).click();
      }
    });
    $(`#${FINANCE_YEAR_GROWTH_BUTTON_ID}`).click(() => {
      if ($(`#${FINANCE_YEAR_CANVAS_ID}`).is(':visible')) {
        $(`.${FINANCE_YEAR_GROWTH_TAB_CLASS}`).click();
      }
    });
    $(`#${FINANCE_YEAR_PROFIT_BUTTON_ID}`).click(() => {
      if ($(`#${FINANCE_YEAR_CANVAS_ID}`).is(':visible')) {
        $(`.${FINANCE_YEAR_PROFIT_TAB_CLASS}`).click();
      }
    });
    $(`#${FINANCE_QUARTER_RESULT_BUTTON_ID}`).click(() => {
      if ($(`#${FINANCE_QUARTER_CANVAS_ID}`).is(':visible')) {
        $(`.${FINANCE_QUARTER_RESULT_TAB_CLASS}`).click();
      }
    });
    $(`#${FINANCE_QUARTER_GROWTH_BUTTON_ID}`).click(() => {
      if ($(`#${FINANCE_QUARTER_CANVAS_ID}`).is(':visible')) {
        $(`.${FINANCE_QUARTER_GROWTH_TAB_CLASS}`).click();
      }
    });
  } else if (url.includes('news') && b?.startsWith('k')) {
    addNewsDOM();
    renderNewsGraph();
  } else if (url.includes('kabuka')) {
    addKabukaDOM(ashi);
    renderKabukaGraph(ashi);
  }
});

// =================== Functions ====================

// Utilities

/**
 * Retrieves the value of a cookie by its name.
 * @param {string} name - The name of the cookie.
 * @returns {string | undefined} - The value of the cookie.
 */
function getCookie(name) {
  return decodeURIComponent(document.cookie)
    .split(';')
    .find((c) => c.includes(name))
    ?.replace(`${name}=`, '');
}

/**
 * Retrieves the search parameters from the current URL.
 * @returns {{[k: string]: string}} An object containing the search parameters as key-value pairs.
 */
function getSearchParams() {
  const url = new URL(window.location.href);
  return Object.fromEntries(url.searchParams.entries());
}

/**
 * Returns the canvas ID based on the provided className.
 * @param {string} className - The className to determine the canvas ID.
 * @returns {string} - The canvas ID corresponding to the className.
 */
function getCanvasId(className) {
  if (className.includes('fin_year')) return FINANCE_YEAR_CANVAS_ID;
  if (className.includes('fin_half')) return FINANCE_HALF_CANVAS_ID;
  if (className.includes('fin_cash')) return FINANCE_CASH_FLOW_CANVAS_ID;
  if (className.includes('fin_quarter')) return FINANCE_QUARTER_CANVAS_ID;
  if (className.includes('fin_finance')) return FINANCE_FINANCE_CANVAS_ID;
  if (className.includes('fin_acc')) return NEWS_ACC_CANVAS_ID;
  if (className === KABUKA_HISTORY_CLASS) return KABUKA_HISTORY_CANVAS_ID;
  if (className === KABUKA_SHIN_HISTORY_CLASS) return KABUKA_SHIN_HISTORY_CANVAS_ID;
}

/**
 * Returns the tab class based on the provided className.
 *
 * @param {string} className - The class name to process.
 * @returns {string} The tab class corresponding to the provided className.
 */
function getTabClass(className) {
  return className.replace('_d', '');
}

/**
 * Returns the button ID based on the provided className.
 * @param {string} className - The className to modify.
 * @returns {string} The button ID corresponding to the provided className.
 */
function getButtonId(className) {
  return className.replace('_d', '_button');
}

/**
 * Toggles the display of a canvas element.
 *
 * @param {string} canvasId - The ID of the canvas element to toggle.
 */
function toggleDisplay(canvasId) {
  $(`#${canvasId}`).toggle();
  $(`#${canvasId.replace('canvas', 'display_button')}`).text(
    $(`#${canvasId}`).is(':visible') ? '非表示にする' : '表示する'
  );
}

/**
 * Returns a color based on the given index and type.
 * @param {number} i - The index of the color.
 * @param {string} type - The type of color ('border' or 'background').
 * @returns {string} - The color code.
 */
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

/**
 * Parses a table and extracts data based on the provided className.
 *
 * @param {jQuery} table - The jQuery object representing the table element.
 * @param {string} className - The class name used to determine the parsing logic.
 * @returns {Array<Array<number | null>>} - The parsed table data.
 */
function parseTable(table, className) {
  let heads = table
    .find('thead > tr > th')
    .map((_, th) => $(th).text().trim())
    .get();
  if (className === FINANCE_YEAR_RESULT_CLASS) {
    heads.shift();
    heads.pop();
  } else if (className === FINANCE_YEAR_GROWTH_CLASS) {
    heads = heads.slice(1, 2);
  } else if (className === FINANCE_YEAR_PROFIT_CLASS) {
    heads.shift();
  } else if (className === FINANCE_HALF_RESULT_CLASS) {
    heads.shift();
    heads.pop();
  } else if (className === FINANCE_CASH_FLOW_CLASS) {
    heads.shift();
  } else if (className === FINANCE_QUARTER_RESULT_CLASS) {
    heads.shift();
    heads.pop();
  } else if (className === FINANCE_QUARTER_GROWTH_CLASS) {
    heads = heads.slice(1, 2);
  } else if (className === FINANCE_FINANCE_CLASS) {
    heads.shift();
    heads.pop();
  } else if (className === NEWS_ACC_CLASS) {
    heads.shift();
    heads.pop();
  } else if (className === KABUKA_HISTORY_CLASS) {
    heads.shift();
    heads.splice(4, 2);
  } else if (className === KABUKA_SHIN_HISTORY_CLASS) {
    heads.shift();
    heads.splice(1, 2);
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
  if (className === FINANCE_YEAR_RESULT_CLASS) data = data.map((d) => d.slice(0, -1));
  // Remove redundant column if table is year growth or quarter growth
  else if (className === FINANCE_YEAR_GROWTH_CLASS || className === FINANCE_QUARTER_GROWTH_CLASS) {
    data[0].pop();
    data = data.map((d) =>
      d.map((v) => {
        if (typeof v === 'string' && v.includes('倍'))
          return parseFloat(v.replace('倍', '')) * 100 - 100;
        return isNaN(v) ? null : v;
      })
    );
  } else if (className === KABUKA_HISTORY_CLASS) {
    data = data.map((d) => {
      d.splice(4, 2);
      return d;
    });
  } else if (className === KABUKA_SHIN_HISTORY_CLASS) {
    data = data.map((d) => {
      d.splice(1, 2);
      return d;
    });
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

/**
 * Creates graph data based on the provided data and className.
 *
 * @param {Array<Array<any>>} data - The data used to create the graph.
 * @param {string} className - The class name used to determine the graph configuration.
 * @returns {Object} - The graph data object.
 */
function createGraphData(data, className) {
  const years = data.slice(1).map((d) => d[0]);

  const graphData = {
    labels:
      className === KABUKA_HISTORY_CLASS || className === KABUKA_SHIN_HISTORY_CLASS
        ? years.reverse()
        : years,
    datasets: Array(data[0].length)
      .fill(0)
      .map((_, i) => {
        let type = 'bar';
        let yAxisID = 'left';
        let order = 1;

        if (className === FINANCE_YEAR_RESULT_CLASS) {
          if (i >= 4) {
            type = 'line';
            yAxisID = 'right';
          }
          order = FINANCE_YEAR_RESULT_ORDERS[i];
        } else if (className === FINANCE_YEAR_PROFIT_CLASS) {
          if (i === 2 || i === 5) {
            type = 'line';
            yAxisID = 'right';
          } else if (i === 3 || i === 4 || i === 6) {
            type = 'line';
            yAxisID = 'right2';
          }
          order = FINANCE_YEAR_PROFIT_ORDERS[i];
        } else if (className === FINANCE_HALF_RESULT_CLASS) {
          if (i >= 4) {
            type = 'line';
            yAxisID = 'right';
          }
          order = FINANCE_HALF_RESULT_ORDERS[i];
        } else if (className === FINANCE_CASH_FLOW_CLASS) {
          if (i === 6) {
            type = 'line';
            yAxisID = 'right';
          }
          order = FINANCE_CASH_FLOW_ORDERS[i];
        } else if (className === FINANCE_QUARTER_RESULT_CLASS) {
          if (i === 4) {
            type = 'line';
            yAxisID = 'right';
          } else if (i === 5) {
            type = 'line';
            yAxisID = 'right2';
          }
          order = FINANCE_QUARTER_RESULT_ORDERS[i];
        } else if (className === FINANCE_FINANCE_CLASS) {
          if (i === 1) {
            type = 'line';
            yAxisID = 'right';
          } else if (i >= 2 && i <= 4) {
            yAxisID = 'left2';
          } else if (i === 5) {
            type = 'line';
            yAxisID = 'right2';
          }
          order = FINANCE_FINANCE_ORDERS[i];
        } else if (className === NEWS_ACC_CLASS) {
          if (i === 4) {
            type = 'line';
            yAxisID = 'right';
          } else if (i === 5) {
            type = 'line';
            yAxisID = 'right2';
          }
          order = NEWS_ACC_ORDERS[i];
        } else if (className === KABUKA_HISTORY_CLASS) {
          if (i <= 3) {
            type = 'line';
          }
          if (i === 4) {
            yAxisID = 'right';
          }
          order = KABUKA_HISTORY_ORDERS[i];
        } else if (className === KABUKA_SHIN_HISTORY_CLASS) {
          if (i === 0) {
            type = 'line';
          } else if (i >= 1 && i <= 3) {
            yAxisID = 'right';
          } else if (i === 4) {
            type = 'line';
            yAxisID = 'right2';
          }
          order = KABUKA_SHIN_HISTORY_ORDERS[i];
        }

        return {
          type: type,
          label: data[0][i],
          data:
            className === KABUKA_HISTORY_CLASS || className === KABUKA_SHIN_HISTORY_CLASS
              ? data
                  .slice(1)
                  .map((d) => d[i + 1])
                  .reverse()
              : data.slice(1).map((d) => d[i + 1]),
          backgroundColor: color(i, 'background'),
          borderColor: color(i, 'border'),
          yAxisID: yAxisID,
          order: order,
        };
      }),
  };

  return graphData;
}

/**
 * Creates a graph configuration object.
 *
 * @param {object} data - The data for the graph.
 * @param {string} className - The class name for the graph.
 * @returns {{[key: string]: Object}} The graph configuration object.
 */
function createGraphConfig(data, className) {
  let rightDisplay = false,
    left2Display = false,
    right2Display = false;

  if (
    className === FINANCE_YEAR_RESULT_CLASS ||
    className === FINANCE_YEAR_PROFIT_CLASS ||
    className === FINANCE_HALF_RESULT_CLASS ||
    className === FINANCE_CASH_FLOW_CLASS ||
    className === FINANCE_QUARTER_RESULT_CLASS ||
    className === FINANCE_FINANCE_CLASS ||
    className === KABUKA_HISTORY_CLASS
  )
    rightDisplay = true;

  if (
    className === FINANCE_YEAR_PROFIT_CLASS ||
    className === FINANCE_QUARTER_RESULT_CLASS ||
    className === FINANCE_FINANCE_CLASS
  )
    right2Display = true;

  if (className === FINANCE_FINANCE_CLASS) left2Display = true;

  if (className === KABUKA_HISTORY_CLASS) {
    return {
      color: [color(2, 'bar')],
      legend: {
        data: ['株価', '出来高'],
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: data.labels.reverse(),
        splitLine: {
          show: true,
        },
      },
      grid: {
        left: 60,
        right: 80,
        bottom: 50,
      },
      yAxis: [
        {
          type: 'value',
          name: '円',
          position: 'left',
          splitLine: {
            show: false,
          },
          scale: true,
        },
        {
          type: 'value',
          name: '株',
          position: 'right',
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          type: 'candlestick',
          data: Array(data.datasets[0].data.length)
            .fill(0)
            .map((_, i) => [
              data.datasets[0].data[i],
              data.datasets[3].data[i],
              data.datasets[2].data[i],
              data.datasets[1].data[i],
            ]),
          name: '株価',
          dimensions: [
            null,
            { name: 'open', displayName: '始値' },
            { name: 'close', displayName: '終値' },
            { name: 'low', displayName: '安値' },
            { name: 'high', displayName: '高値' },
          ],
          encode: {
            tooltip: ['open', 'close', 'low', 'high'],
          },
        },
        {
          type: 'bar',
          data: data.datasets[4].data,
          yAxisIndex: 1,
          name: '出来高',
        },
      ],
    };
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
              return [FINANCE_YEAR_PROFIT_CLASS, FINANCE_FINANCE_CLASS].includes(className)
                ? value + '%'
                : value;
            },
          },
        },
        left2: {
          type: 'linear',
          position: 'left',
          grid: { display: false },
          display: left2Display,
        },
        right2: {
          type: 'linear',
          position: 'right',
          max: className === FINANCE_QUARTER_RESULT_CLASS ? 100 : undefined,
          grid: { display: false },
          display: right2Display,
          ticks: {
            callback: function (value) {
              return className === FINANCE_QUARTER_RESULT_CLASS ? value + '%' : value;
            },
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            sort: (a, b) => {
              if (className === FINANCE_YEAR_RESULT_CLASS) {
                return (
                  FINANCE_YEAR_RESULT_ITEMS.indexOf(a.text) -
                  FINANCE_YEAR_RESULT_ITEMS.indexOf(b.text)
                );
              } else if (className === FINANCE_YEAR_PROFIT_CLASS) {
                return (
                  FINANCE_YEAR_PROFIT_ITEMS.indexOf(a.text) -
                  FINANCE_YEAR_PROFIT_ITEMS.indexOf(b.text)
                );
              } else if (className === FINANCE_HALF_RESULT_CLASS) {
                return (
                  FINANCE_HALF_RESULT_ITEMS.indexOf(a.text) -
                  FINANCE_HALF_RESULT_ITEMS.indexOf(b.text)
                );
              } else if (className === FINANCE_CASH_FLOW_CLASS) {
                return (
                  FINANCE_CASH_FLOW_ITEMS.indexOf(a.text) - FINANCE_CASH_FLOW_ITEMS.indexOf(b.text)
                );
              } else if (className === FINANCE_QUARTER_RESULT_CLASS) {
                return (
                  FINANCE_QUARTER_RESULT_ITEMS.indexOf(a.text) -
                  FINANCE_QUARTER_RESULT_ITEMS.indexOf(b.text)
                );
              } else if (className === FINANCE_FINANCE_CLASS) {
                return (
                  FINANCE_FINANCE_ITEMS.indexOf(a.text) - FINANCE_FINANCE_ITEMS.indexOf(b.text)
                );
              } else if (className === NEWS_ACC_CLASS) {
                return NEWS_ACC_ITEMS.indexOf(a.text) - NEWS_ACC_ITEMS.indexOf(b.text);
              } else if (className === KABUKA_HISTORY_CLASS) {
                return KABUKA_HISTORY_ITEMS.indexOf(a.text) - KABUKA_HISTORY_ITEMS.indexOf(b.text);
              } else if (className === KABUKA_SHIN_HISTORY_CLASS) {
                return (
                  KABUKA_SHIN_HISTORY_ITEMS.indexOf(a.text) -
                  KABUKA_SHIN_HISTORY_ITEMS.indexOf(b.text)
                );
              }
              return 0;
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const text = tooltipItem.dataset.label;
              if (text === '総資産回転率') return text + ': ' + tooltipItem.formattedValue + '回';
              if (text === '有利子負債倍率') return text + ': ' + tooltipItem.formattedValue + '倍';
              if (text.includes('率') || text.includes('ＲＯ'))
                return text + ': ' + tooltipItem.formattedValue + '%';
              if (text.includes('修正') || text === '１株純資産')
                return text + ': ' + tooltipItem.formattedValue + '円';
              return text + ': ' + tooltipItem.formattedValue + '百万円';
            },
          },
        },
      },
    },
  };

  return config;
}

/**
 * Renders a graph on the canvas element with the provided data and class name.
 * @param {Array} data - The data used to create the graph.
 * @param {string} className - The class name of the graph.
 */
function renderGraph(data, className) {
  const graphData = createGraphData(data, className);
  const graphConfig = createGraphConfig(graphData, className);
  const canvasId = getCanvasId(className);
  const canvas = document.getElementById(canvasId);
  if (className === KABUKA_HISTORY_CLASS) {
    const ECharts = echarts.init(canvas);
    ECharts.setOption(graphConfig);
  } else {
    console.log(canvas, graphConfig);
    window[canvasId] = new Chart(canvas, graphConfig);
  }
}

// for finance page

function addFinanceDOM(tab) {
  $(`.${FINANCE_YEAR_PROFIT_CLASS}`).after(`
    <div class="button-box">
      <button
        id="${FINANCE_YEAR_DISPLAY_BUTTON_ID}"
        onclick="toggleDisplay('${FINANCE_YEAR_CANVAS_ID}')"
      >
        非表示にする
      </button>
      <button
        id="${FINANCE_YEAR_RESULT_BUTTON_ID}"
        class="${tab['tab_year'] === 'result' ? 'active' : ''}"
        onclick="changeGraph('${FINANCE_YEAR_RESULT_CLASS}')"
      >
        【通期】業績推移
      </button>
      <button
        id="${FINANCE_YEAR_GROWTH_BUTTON_ID}"
        class="${tab['tab_year'] === 'growth' ? 'active' : ''}"
        onclick="changeGraph('${FINANCE_YEAR_GROWTH_CLASS}')"
      >
        【通期】成長性
      </button>
      <button
        id="${FINANCE_YEAR_PROFIT_BUTTON_ID}"
        class="${tab['tab_year'] === 'profit' ? 'active' : ''}"
        onclick="changeGraph('${FINANCE_YEAR_PROFIT_CLASS}')"
      >
        【通期】収益性
      </button>
    </div>
    <canvas
      id="${FINANCE_YEAR_CANVAS_ID}"
      width="640"
      height="320"
    ></canvas>
  `);
  $(`.${FINANCE_HALF_RESULT_CLASS}`).after(`
    <div class="button-box">
      <button
        id="${FINANCE_HALF_DISPLAY_BUTTON_ID}"
        onclick="toggleDisplay('${FINANCE_HALF_CANVAS_ID}')"
      >
        非表示にする
      </button>
    </div>
    <canvas
      id="${FINANCE_HALF_CANVAS_ID}"
      width="640"
      height="320"
    ></canvas>
  `);
  $(`.cashflow_title`).next().next().after(`
    <div class="button-box">
      <button
        id="${FINANCE_CASH_FLOW_DISPLAY_BUTTON_ID}"
        onclick="toggleDisplay('${FINANCE_CASH_FLOW_CANVAS_ID}')"
      >
        非表示にする
      </button>
    </div>
    <canvas
      id="${FINANCE_CASH_FLOW_CANVAS_ID}"
      width="640"
      height="320"
    ></canvas>
  `);
  $(`.${FINANCE_QUARTER_GROWTH_CLASS}`).after(`
    <div class="button-box">
      <button
        id="${FINANCE_QUARTER_DISPLAY_BUTTON_ID}"
        onclick="toggleDisplay('${FINANCE_QUARTER_CANVAS_ID}')"
      >
        非表示にする
      </button>
      <button
        id="${FINANCE_QUARTER_RESULT_BUTTON_ID}"
        class="${tab['tab_quarter'] === 'result' ? 'active' : ''}"
        onclick="changeGraph('${FINANCE_QUARTER_RESULT_CLASS}')"
      >
        【四半期】業績推移
      </button>
      <button
        id="${FINANCE_QUARTER_GROWTH_BUTTON_ID}"
        class="${tab['tab_quarter'] === 'growth' ? 'active' : ''}"
        onclick="changeGraph('${FINANCE_QUARTER_GROWTH_CLASS}')"
      >
        【四半期】成長性
      </button>
    </div>
    <canvas
      id="${FINANCE_QUARTER_CANVAS_ID}"
      width="640"
      height="320"
    ></canvas>
  `);
  $('ul.info').before(`
    <div class="button-box">
      <button
        id="${FINANCE_FINANCE_DISPLAY_BUTTON_ID}"
        onclick="toggleDisplay('${FINANCE_FINANCE_CANVAS_ID}')"
      >
        非表示にする
      </button>
    </div>
    <canvas
      id="${FINANCE_FINANCE_CANVAS_ID}"
      width="640"
      height="320"
    ></canvas>
  `);
}

function renderFinanceGraph(tab) {
  // render graph
  if (tab['tab_year'] === 'result')
    renderGraph(
      parseTable($(`.${FINANCE_YEAR_RESULT_CLASS} > table`), FINANCE_YEAR_RESULT_CLASS),
      FINANCE_YEAR_RESULT_CLASS
    );
  if (tab['tab_year'] === 'growth')
    renderGraph(
      parseTable($(`.${FINANCE_YEAR_GROWTH_CLASS} > table`), FINANCE_YEAR_GROWTH_CLASS),
      FINANCE_YEAR_GROWTH_CLASS
    );
  if (tab['tab_year'] === 'profit')
    renderGraph(
      parseTable($(`.${FINANCE_YEAR_PROFIT_CLASS} > table`), FINANCE_YEAR_PROFIT_CLASS),
      FINANCE_YEAR_PROFIT_CLASS
    );
  renderGraph(
    parseTable($(`.${FINANCE_HALF_RESULT_CLASS} > table`), FINANCE_HALF_RESULT_CLASS),
    FINANCE_HALF_RESULT_CLASS
  );
  renderGraph(
    parseTable($(`#cashflow_name`).next().next().next(), FINANCE_CASH_FLOW_CLASS),
    FINANCE_CASH_FLOW_CLASS
  );
  if (tab['tab_quarter'] === 'result')
    renderGraph(
      parseTable($(`.${FINANCE_QUARTER_RESULT_CLASS} > table`), FINANCE_QUARTER_RESULT_CLASS),
      FINANCE_QUARTER_RESULT_CLASS
    );
  if (tab['tab_quarter'] === 'growth')
    renderGraph(
      parseTable($(`.${FINANCE_QUARTER_GROWTH_CLASS} > table`), FINANCE_QUARTER_GROWTH_CLASS),
      FINANCE_QUARTER_GROWTH_CLASS
    );
  renderGraph(
    parseTable($(`ul.info`).prev().prev().prev(), FINANCE_FINANCE_CLASS),
    FINANCE_FINANCE_CLASS
  );
}

function changeGraph(className) {
  // change active button
  if (className?.includes('year')) {
    $(`#${FINANCE_YEAR_RESULT_BUTTON_ID}`).removeClass('active');
    $(`#${FINANCE_YEAR_GROWTH_BUTTON_ID}`).removeClass('active');
    $(`#${FINANCE_YEAR_PROFIT_BUTTON_ID}`).removeClass('active');
    $(`#${getButtonId(className)}`).addClass('active');
  } else if (className?.includes('quarter')) {
    $(`#${FINANCE_QUARTER_RESULT_BUTTON_ID}`).removeClass('active');
    $(`#${FINANCE_QUARTER_GROWTH_BUTTON_ID}`).removeClass('active');
    $(`#${getButtonId(className)}`).addClass('active');
  }

  if (window[getCanvasId(className)].destroy) window[getCanvasId(className)].destroy();

  if (className === FINANCE_YEAR_RESULT_CLASS)
    renderGraph(
      parseTable($(`.${FINANCE_YEAR_RESULT_CLASS} > table`), FINANCE_YEAR_RESULT_CLASS),
      FINANCE_YEAR_RESULT_CLASS
    );
  else if (className === FINANCE_YEAR_GROWTH_CLASS)
    renderGraph(
      parseTable($(`.${FINANCE_YEAR_GROWTH_CLASS} > table`), FINANCE_YEAR_GROWTH_CLASS),
      FINANCE_YEAR_GROWTH_CLASS
    );
  else if (className === FINANCE_YEAR_PROFIT_CLASS)
    renderGraph(
      parseTable($(`.${FINANCE_YEAR_PROFIT_CLASS} > table`), FINANCE_YEAR_PROFIT_CLASS),
      FINANCE_YEAR_PROFIT_CLASS
    );
  else if (className === FINANCE_QUARTER_RESULT_CLASS)
    renderGraph(
      parseTable($(`.${FINANCE_QUARTER_RESULT_CLASS} > table`), FINANCE_QUARTER_RESULT_CLASS),
      FINANCE_QUARTER_RESULT_CLASS
    );
  else if (className === FINANCE_QUARTER_GROWTH_CLASS)
    renderGraph(
      parseTable($(`.${FINANCE_QUARTER_GROWTH_CLASS} > table`), FINANCE_QUARTER_GROWTH_CLASS),
      FINANCE_QUARTER_GROWTH_CLASS
    );
}

// for news page

function addNewsDOM() {
  $(`#shihankiruikei_name`).parent().next().next().after(`
    <div class="button-box">
      <button
        id="${NEWS_ACC_DISPLAY_BUTTON_ID}"
        onclick="toggleDisplay('${NEWS_ACC_CANVAS_ID}')"
      >
        非表示にする
      </button>
    </div>
    <canvas
      id="${NEWS_ACC_CANVAS_ID}"
      width="640"
      height="320"
    ></canvas>
  `);
  $(`.${NEWS_YEAR_CLASS}`).after(`
    <div class="button-box">
      <button
        id="${NEWS_YEAR_DISPLAY_BUTTON_ID}"
        onclick="toggleDisplay('${NEWS_YEAR_CANVAS_ID}')"
      >
        非表示にする
      </button>
    </div>
    <canvas
      id="${NEWS_YEAR_CANVAS_ID}"
      width="640"
      height="320"
    ></canvas>
  `);
  $(`.${NEWS_QUARTER_CLASS}`).after(`
    <div class="button-box">
      <button
        id="${NEWS_QUARTER_DISPLAY_BUTTON_ID}"
        onclick="toggleDisplay('${NEWS_QUARTER_CANVAS_ID}')"
      >
        非表示にする
      </button>
    </div>
    <canvas
      id="${NEWS_QUARTER_CANVAS_ID}"
      width="640"
      height="320"
    ></canvas>
  `);
}

function renderNewsGraph() {
  renderGraph(
    parseTable($(`#shihankiruikei_name`).parent().next(), NEWS_ACC_CLASS),
    NEWS_ACC_CLASS
  );
  renderGraph(parseTable($(`.${NEWS_YEAR_CLASS} > table`), NEWS_YEAR_CLASS), NEWS_YEAR_CLASS);
  renderGraph(
    parseTable($(`.${NEWS_QUARTER_CLASS} > table`), NEWS_QUARTER_CLASS),
    NEWS_QUARTER_CLASS
  );
}

// for kabuka page

function addKabukaDOM(ashi) {
  $(`.${KABUKA_HISTORY_CLASS}`).parent().next().after(`
    <div class="button-box">
      <button
        id="${KABUKA_HISTORY_DISPLAY_BUTTON_ID}"
        onclick="toggleDisplay('${
          ashi === 'shin' ? KABUKA_SHIN_HISTORY_CANVAS_ID : KABUKA_HISTORY_CANVAS_ID
        }')"
      >
        非表示にする
      </button>
    </div>
    <div
      id="${KABUKA_HISTORY_CANVAS_ID}"
      style="width:640px;height:320px;display:${ashi === 'shin' ? 'none' : 'block'}"
    ></div>
    <canvas
      id="${KABUKA_SHIN_HISTORY_CANVAS_ID}"
      width="640"
      height="320"
      style="display:${ashi === 'shin' ? 'block' : 'none'}"
    ></canvas>
  `);
}

function renderKabukaGraph(ashi) {
  if (ashi === 'shin')
    renderGraph(
      parseTable($(`.${KABUKA_HISTORY_CLASS}`), KABUKA_SHIN_HISTORY_CLASS),
      KABUKA_SHIN_HISTORY_CLASS
    );
  else
    renderGraph(
      parseTable($(`.${KABUKA_HISTORY_CLASS}`), KABUKA_HISTORY_CLASS),
      KABUKA_HISTORY_CLASS
    );
}
