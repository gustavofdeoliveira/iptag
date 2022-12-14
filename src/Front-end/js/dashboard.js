google.charts.load('current', { 'packages': ['line'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

  var data = new google.visualization.DataTable();
  data.addColumn('number', 'Day');
  data.addColumn('number', 'Guardians of the Galaxy');
  data.addColumn('number', 'The Avengers');
  data.addColumn('number', 'Transformers: Age of Extinction');

  data.addRows([
    [1, 37.8, 80.8, 41.8],
    [2, 30.9, 69.5, 32.4],
    [3, 25.4, 57, 25.7],
    [4, 11.7, 18.8, 10.5],
    [5, 11.9, 17.6, 10.4],
    [6, 8.8, 13.6, 7.7],
    [7, 7.6, 12.3, 9.6],
    [8, 12.3, 29.2, 10.6],
    [9, 16.9, 42.9, 14.8],
    [10, 12.8, 30.9, 11.6],
    [11, 5.3, 7.9, 4.7],
    [12, 6.6, 8.4, 5.2],
    [13, 4.8, 6.3, 3.6],
    [14, 4.2, 6.2, 3.4]
  ]);

  var options = {

    width: 800,
    height: 200
  };

  var chart = new google.charts.Line(document.getElementById('graphic-white-card'));

  chart.draw(data, google.charts.Line.convertOptions(options));
}
loadDevices();
async function loadDevices() {
  await $.ajax({
    url: "http://localhost:3001/device/getDevices",
    headers: { "Authorization": ` ${auth}` },
    success: function (resul) {
      devices = resul.message
      createGraphics(devices)
    }
  }).fail(function (err) {
    console.log(err.responseJSON.message)
  })
}

function createGraphics(devices) {
  $("#total").html(devices.length);
  debugger
  totalPorcentagemOn = 0;
  totalPorcentagemOff = 0;
  totalOff = 0;
  for (i = 0; i < devices.length; i++) {
    if (devices[i].status == "true") {
      totalPorcentagemOn += 1;
    } else {
      totalOff += 1;
    }
    if (devices[i].dt_instalacao) {
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      today.toLocaleDateString();
      console.log(today);
    }
  }
  totalPorcentagemOn = (100 / devices.length) * totalPorcentagemOn;
  $("#total-porcentagem").html(totalPorcentagemOn.toFixed(2) + "%");

  totalPorcentagemOff = (100 / devices.length) * totalOff;
  $("#bateria-porcentagem").html(totalPorcentagemOff.toFixed(2) + "%");
  $("#bateria").html(totalOff);


} 