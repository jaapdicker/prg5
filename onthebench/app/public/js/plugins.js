$(function () {
  // bootstrap date time picker
  $('#inputDate').datetimepicker({
    format: 'DD/MM/YYYY h:mm',
    locale: 'EN',
    minDate: moment(),
  });
});
