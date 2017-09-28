$(function () {
  // bootstrap date time picker
  $('#inputDate').datetimepicker({
    format: 'lll',
    extraFormats: [ 'DD.MM.YYYY:HH:MM'],
    locale: 'nl'
  });
});
