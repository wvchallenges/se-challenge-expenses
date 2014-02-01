$(function () {
    $("tr[data-link]").click(function () {
	window.location = $(this).data("link")
    })
})
