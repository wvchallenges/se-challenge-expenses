# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

# On page load, trigger functions
ready
ready = ->
	$ -> 
		
		# The file tag should be hidden by default
		$("#file").hide()

		$("#file").on "change", ->
			# The label tag's text will be replaced by the name of the file.
			$(@).parent().find(" label[for='file'] ").text $(@).val().split("\\").pop()

		$("#search_form").keyup ->
			console.log($(@).parents("form").serialize())
			$.get( $(@).parents("form").attr("action"), $(@).parents("form").serialize(), null, 'script')

		$(".sort_link").click (e)->
			ready
			e.preventDefault()
			$.get( $(@).attr("href"), null, null, 'script')
			

$(document).ready(ready)
$(document).on('page:load', ready)