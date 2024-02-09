// ===================================================
//               KABUTAN Visualizer
// ===================================================

// ==================== Libraries ====================

window.addEventListener('DOMContentLoaded', () => {
  // Chart.js
  const el = document.createElement('script');
  el.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
  document.body.appendChild(el);
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

// ================ Event Listeners =================

window.addEventListener('load', () => {
  const url = window.location.href;
  const { b } = getSearchParams();

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
  } else if (url.includes('news') && b) {
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
  if (className.includes('year')) return FINANCE_YEAR_CANVAS_ID;
  if (className.includes('half')) return FINANCE_HALF_CANVAS_ID;
  if (className.includes('cash')) return FINANCE_CASH_FLOW_CANVAS_ID;
  if (className.includes('quarter')) return FINANCE_QUARTER_CANVAS_ID;
  if (className.includes('finance')) return FINANCE_FINANCE_CANVAS_ID;
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
  if (tab['tab_year'] === 'result') renderGraph(FINANCE_YEAR_RESULT_CLASS);
  if (tab['tab_year'] === 'growth') renderGraph(FINANCE_YEAR_GROWTH_CLASS);
  if (tab['tab_year'] === 'profit') renderGraph(FINANCE_YEAR_PROFIT_CLASS);
  renderGraph(FINANCE_HALF_RESULT_CLASS);
  renderGraph(FINANCE_CASH_FLOW_CLASS);
  if (tab['tab_quarter'] === 'result') renderGraph(FINANCE_QUARTER_RESULT_CLASS);
  if (tab['tab_quarter'] === 'growth') renderGraph(FINANCE_QUARTER_GROWTH_CLASS);
  renderGraph(FINANCE_FINANCE_CLASS);
}

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

function createGraphData(data, className) {
  const years = data.slice(1).map((d) => d[0]);

  const graphData = {
    labels: years,
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
    className === FINANCE_FINANCE_CLASS
  )
    rightDisplay = true;

  if (
    className === FINANCE_YEAR_PROFIT_CLASS ||
    className === FINANCE_QUARTER_RESULT_CLASS ||
    className === FINANCE_FINANCE_CLASS
  )
    right2Display = true;

  if (className === FINANCE_FINANCE_CLASS) left2Display = true;

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

function renderGraph(className) {
  let data;
  if (className === FINANCE_CASH_FLOW_CLASS)
    data = parseTable($(`#cashflow_name`).next().next().next(), className);
  else if (className === FINANCE_FINANCE_CLASS)
    data = parseTable($(`ul.info`).prev().prev().prev(), className);
  else data = parseTable($(`.${className} > table`), className);

  const graphData = createGraphData(data, className);
  const graphConfig = createGraphConfig(graphData, className);
  console.log(graphConfig);
  const canvasId = getCanvasId(className);
  const canvas = document.getElementById(canvasId);
  window[canvasId] = new Chart(canvas, graphConfig);
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

  renderGraph(className);
}

// for news page

function renderNewsGraph() {}
