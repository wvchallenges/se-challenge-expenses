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

    nv.addGraph(function () {
	var chart = nv.models.discreteBarChart()
	    .x(function (d) { return d.month })
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
    });
})
