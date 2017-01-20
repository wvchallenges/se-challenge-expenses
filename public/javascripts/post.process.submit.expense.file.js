/**
 * Created by bharath on 2017-01-12.
 */
'use strict';

function expenseSubmitted() {
    var expenseFileForm = document.forms['expenseForm'];
    expenseFileForm.elements['submit'].prop('disabled', true);
}
