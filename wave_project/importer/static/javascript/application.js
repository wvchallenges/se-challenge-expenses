/**
 *
 * Application Javascript.  There are controllers for File Upload and Summary, they are responsible for
 * making Ajax calls and listening to events, such as button onclicks etc.
 *
 */


var ApplicationDelegate = can.Control.extend({

    init: function (element, options) {
        this.showFileUpload(null);
    },


    showFileUpload: function (controller) {
        if (!isDefined(controller)) {
            controller.destroy();
        }

        var url = Urls.csv_import_view();
        var self = this;

        can.ajax({
            url: url,
            success: function (response) {
                jQuery(self.element).find('#main-content').html(response);
                new FileUploadController('#file-upload', {'delegate': self});
            }
        })


    },

    showUploadSummary: function (controller, upload_id) {
        if (!isDefined(controller)) {
            controller.destroy();
        }

        new UploadSummaryController('#main-content', {'delegate': this}).summaryRequest(upload_id);

    }

});

var FileUploadController = can.Control.extend({
    '#upload-button click': function (li, event) {
        var el = jQuery(this.element);

        if (el.find('#upload-file')[0].value == '') {
            el.find('#missing-file-upload').removeClass("hidden").addClass("show");
        }
        else {
            var form = el.find('form')[0];
            this.uploadFile(form)
        }

        event.preventDefault();
    },

    uploadFile: function (form) {
        var url = Urls.csv_import_view();

        var files = [form['file']];
        var formData = new FormData();
        var self = this;

        jQuery.each(files[0].files, function (key, value) {
            formData.append('file', value);
        });

        formData.append('csrfmiddlewaretoken', form['csrfmiddlewaretoken'].value)

        jQuery.ajax({
            url: url,
            type: 'POST',
            data: formData,
            error: function (error) {
                jQuery(self.element).find("#main-content").html(error);
            },
            success: function (response) {
                self.options.delegate.showUploadSummary(self, response.upload_id);
            },
            enctype: "multipart/form-data",
            cache: false,
            contentType: false,
            processData: false
        })


    }
});

var UploadSummaryController = can.Control.extend({

    summaryRequest: function (uploadId) {
        var url = Urls.upload_summary_view(uploadId);
        var self = this;

        jQuery.ajax({
            url: url,
            type: 'GET',
            success: function (response) {
                jQuery(self.element).html(response);
            }
        })
    },

    '#upload-more click': function (li, event) {
        this.options.delegate.showFileUpload(this);
    }
});
