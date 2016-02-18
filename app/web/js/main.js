$(function() {
    // JQuery extension from animate.css https://github.com/daneden/animate.css
    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });

    var CardModel = Backbone.Model.extend({
        chartOptions: {
            chartPadding: {
                top: 0,
                bottom: 0,
                right: 0,
                left: 0
            },
            distributeSeries: true,
            height: "290px",
            width: "100%",
            onlyInteger: true,
        },
        constructor: function() {
            // Little hacky but this ensures that parse gets called everytime there's a new model
            // http://stackoverflow.com/a/13611033
            [].push.call(arguments, {
                parse: true
            });
            Backbone.Model.apply(this, arguments);
        },
        parse: function(response, options) {
            // Build up the data structure for chart
            response["chartData"] = {
                labels: [],
                series: []
            };
            _.each(response["data"], function(row) {
                row["total"] = (row["total"] / 100).toFixed(2)
                response["chartData"]["labels"].push(row[response["xAxis"]]);
                response["chartData"]["series"].push(row["total"]);
            })
            return response;
        }
    });

    var CardCollection = Backbone.Collection.extend({
        model: CardModel,
        url: "/expense_report",
        sync: function(method, model, options) {
            var _this = this;

            $.ajax({
                url: _this.url,
                type: 'GET',
                success: function(res) {
                    _.each(res, function(e) {
                        _this.add(new CardModel(e));
                    });
                },
                error: function(xhr) {
                    console.log(xhr);
                },
            });
        },
        // Add or update an existing model
        add: function(card, options) {
            var _card = this.findWhere({
                "title": card.get("title")
            });

            if (_card) {
                _card.set("data", card.get("data"));
                return _card;
            } else {
                return Backbone.Collection.prototype.add.call(this, card, options);
            }
        }
    });

    var CardView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-sm-6',
        template: _.template($("#cardTPL").html()),
        tableVisible: true,
        events: {
            "click .card-toggle": "switchViews"
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.render()
        },
        render: function() {
            this.$el.html(this.template({
                model: this.model.toJSON(),
                tableVisible: this.tableVisible,
            }));

            this.chart = new Chartist.Bar(this.$el.find(".chart")[0], this.model.get("chartData"), this.model.chartOptions);
        },
        switchViews: function() {
            // Track which side of the card to keep visible and toggle the card button/content
            this.tableVisible = !this.tableVisible;
            this.$el.find(".card-toggle span").toggleClass("glyphicon-list glyphicon-stats").animateCss("fadeIn");
            this.$el.find(".data-table, .chart").toggleClass("hidden").animateCss("fadeIn");
            this.chart.update();
        }
    });

    var UploadFormView = Backbone.View.extend({
        template: _.template($('#uploadFormTPL').html()),
        events: {
            "click .file-picker": "pickFile",
            "change .upload-input": "enableSubmit",
            "submit form": "uploadFile",
        },
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template());
        },
        pickFile: function() {
            this.$el.find(".upload-input").click();
        },
        enableSubmit: function(e) {
            this.$el.find(".upload-form-btn").prop("disabled", false).addClass("btn-primary");
        },
        uploadFile: function(e) {
            e.preventDefault();

            var _this = this,
                fd = new FormData();
            fd.append('file', $(e.currentTarget).find(".upload-input").get(0).files[0]);

            $.ajax({
                url: "/parse",
                type: 'POST',
                data: fd,
                processData: false,
                contentType: false,
                success: function(res) {
                    _.each(res, function(e) {
                        Cards.add(new CardModel(e));
                    });

                    // Cleanup the form
                    $(e.currentTarget).get(0).reset();
                    _this.$el.find(".upload-form-btn").prop("disabled", true).removeClass("btn-primary");
                },
                error: function(xhr) {
                    alert(xhr.responseJSON.message);
                },
            });
        }
    });

    var AppView = Backbone.View.extend({
        el: $("#content"),
        events: {
            "click .upload-file-btn": "togglePopover",
            "click .container-fluid": "closePopover",
        },
        initialize: function() {
            this.uploadForm = new UploadFormView();
            this.listenTo(Cards, 'add', this.addCard);
            this.listenTo(Cards, 'change', this.closePopover);
            this.render();

            // If there's data in the DB fetch it
            if (loadData) {
                Cards.fetch();
            }
        },
        render: function() {
            this.$el.find(".upload-file-btn").popover({
                content: this.uploadForm.el,
                html: true,
                placement: "left",
                title: "Upload an expense report",
                trigger: "manual"
            });
        },
        addCard: function(model) {
            var cardContainer = this.$el.find("#cards"),
                view = new CardView({
                    model: model
                });

            // If there was no data before hide the no data splash
            if (!loadData) {
                this.$el.find(".empty").addClass("hidden").animateCss("fadeOut");
                cardContainer.removeClass("hidden").animateCss("fadeInDown");
            }

            cardContainer.append(view.el);
            this.closePopover();
        },
        togglePopover: function() {
            this.$el.find(".upload-file-btn").popover("toggle");
        },
        closePopover: function() {
            this.$el.find(".upload-file-btn").popover("hide");
        }
    })

    var Cards = new CardCollection;
    var App = new AppView;
});
