$( document ).ready( function(){
    console.log(upload_view_json);
    var upload_view_obj = JSON.parse(upload_view_json);
    var viewModel = new upload_viewModel(upload_view_obj);
    ko.applyBindings(viewModel);
    viewModel.get_expenses();
});


function upload_viewModel(upload_view_obj)
{
    var self = this;
    ko.mapping.fromJS(upload_view_obj, {}, self);
    self.uploading = ko.observable(false);
    self.file_name = ko.observable("<-- Press Browse");
    self.getting_expenses = ko.observable(false);
    self.expenses_per_month = ko.observableArray([])
    
    self.uploaded = ko.computed(function() {
        return self.file_name() != "<-- Press Browse";
    }, self);
    
    self.enable_upload = ko.computed(function() {
        return self.uploaded() && self.expenses_per_month().length == 0;
    }, self);

   self.file_select = function(vm, evt){
        console.log(vm, evt);
        console.log(evt.target.value);
        console.log(evt.target.value.split('\\'));
        var file_name = evt.target.value.split('\\');
        self.file_name(file_name[file_name.length-1]);
        console.log(self.file_name());
    }

    self.file_upload = function(){
        //get domain
        self.uploading(true);
        var _data = new FormData();
        var file = $('#testing')[0].files[0];
        _data.append('datafile', file);
        console.log('iv been called');
        if (typeof file !== 'undefined')
            post_file_to_server_with_callback('/upload/', _data, self.file_upload_callback);
        
    }

    self.file_upload_callback = function(data){
        console.log('success file uploaded');
        console.log(data);
        self.uploading(false);
        get_json_async_from_server('/app/process_expense_file/', {}, self.process_file_callback);
    }

    self.process_file_callback = function(){
        self.get_expenses();
    }

    self.get_expenses = function(){
        self.getting_expenses(true);
        get_json_async_from_server('/api/expense.json', {}, self.get_expenses_callback);
    }

    self.get_expenses_callback = function(data){
        if (data.length){
            var expenses_per_month = [
            {"month": "Jan", "expenses_total": 0.00},
            {"month": "Feb", "expenses_total": 0.00},
            {"month": "Mar", "expenses_total": 0.00},
            {"month": "Apr", "expenses_total": 0.00},
            {"month": "May", "expenses_total": 0.00},
            {"month": "Jun", "expenses_total": 0.00},
            {"month": "Jul", "expenses_total": 0.00},
            {"month": "Aug", "expenses_total": 0.00},
            {"month": "Sep", "expenses_total": 0.00},
            {"month": "Oct", "expenses_total": 0.00},
            {"month": "Nov", "expenses_total": 0.00},
            {"month": "Dec", "expenses_total": 0.00}];
            for(i=0, i_len = data.length; i < i_len; ++i){
                reg_match = data[i].date.match(/(\d+)-(\d+)-(\d+)/);
                expenses_per_month[reg_match[2]-1]["expenses_total"] += parseFloat(data[i].total);
            }
            self.expenses_per_month(expenses_per_month);
        }
    }

}