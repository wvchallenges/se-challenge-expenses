$(function() {
    var CardModel = Backbone.Model.extend({});

    var CardCollection = Backbone.Collection.extend({
        model: CardModel,
    });

    var CardView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-sm-6 col-md-4',
        template: _.template($("#cardTPL").html()),
        initialize: function() {
            this.render()
        },
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
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
                        Cards.add(e)
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
        },
        render: function() {
            this.$el.find("#uploadContainer").html(new UploadFormView().el);
        },
        addCard: function(model) {
            var view = new CardView({model: model});
            console.log(this);
            this.$el.find("#cards").append(view.el);
        }
    })

    var Cards = new CardCollection;
    var App = new AppView;
});
