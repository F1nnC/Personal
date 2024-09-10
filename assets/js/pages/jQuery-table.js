const settings = {
	async: true,
	crossDomain: true,
	url: 'https://dog-breeds2.p.rapidapi.com/dog_breeds',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '701410bf7emshbaf1fa99b2e4e5bp1c0ee6jsn8f8f51602e3f',
		'X-RapidAPI-Host': 'dog-breeds2.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response)
  for (const row of response) {
    $('#body').append('<tr><td>' + 
        row.id + '</td><td>' + 
        row.breed + '</td><td>' + 
        row.meta.other_names + '</td><td>' +
        row.origin + '</td><td>' + 
        '<img src="' + row.img +'">' + '</td><td>' + 
        '<a href="' + row.url + '">' + row.url + '</a>' + '</td></tr>');
  }
  $("#table").DataTable();
});

