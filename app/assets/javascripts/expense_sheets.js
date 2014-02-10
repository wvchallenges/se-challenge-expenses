$(function () {
  $("tr[data-link]").click(function () {
    window.location = $(this).data("link")
  })

  function monthly() {
    return [
      {
        key: "Monthly Totals",
        values: monthly_totals
      }
    ]
  }

  function numberToMonth(number) {
    var monthFor = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      "10": "October",
      "11": "November",
      "12": "December"
    }
    return monthFor[number] || "Febtober"
  }

  nv.addGraph(function () {
    var chart = nv.models.discreteBarChart()
      .x(function (d) { return numberToMonth(d.month) })
      .y(function (d) { return d.total / 100 })
      .staggerLabels(true)
      .tooltips(false)
      .showValues(true)

    d3.select('#chart svg')
      .datum(monthly)
      .transition().duration(500)
      .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;

  })
})
