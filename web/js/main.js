$(function() {
    var CardModel = Backbone.Model.extend({
        chartOptions: {
            distributeSeries: true
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
            response["chartData"] = {
                labels: [],
                series: []
            };
            _.each(response["data"], function(row) {
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
        events: {
            "click .card-toggle": "switchViews"
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.render()
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.chart = new Chartist.Bar(this.$el.find(".chart")[0], this.model.get("chartData"), this.model.chartOptions);
        },
        switchViews: function() {
            this.$el.find(".data-table, .chart").toggleClass("hidden");
            this.chart.update();
        }
    });

    var UploadFormView = Backbone.View.extend({
        template: _.template($('#uploadFormTPL').html()),
        events: {
            "submit form": "uploadFile",
        },
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template());
        },
        uploadFile: function(e) {
            e.preventDefault();

            var fd = new FormData();
            fd.append('file', $(e.currentTarget).find('input[name="file"]')[0].files[0]);

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
                },
                error: function(xhr) {
                    console.log(xhr);
                },
            });
        }
    });

    var AppView = Backbone.View.extend({
        el: $("#content"),
        initialize: function() {
            this.listenTo(Cards, 'add', this.addCard);
            this.render();

            if (loadData) {
                Cards.fetch();
            }
        },
        render: function() {
            this.$el.find("#uploadContainer").html(new UploadFormView().el);
        },
        addCard: function(model) {
            var view = new CardView({
                model: model
            });
            this.$el.find("#cards").append(view.el);
        }
    })

    var Cards = new CardCollection;
    var App = new AppView;
});
