$(function () {
    var counter = 1;

    $("#submit").on('click', function (e) {
        e.preventDefault();
        if (counter == 0)
        { counter += 1; }
        else if (counter == 1)
        { counter -= 1; }
        $.ajax({
            type: "GET",
            url: "Developer Evaluation Events.xml",
            dataType: "xml",
            success: function (xml) {
                getDataFromXML(xml, counter);
                geocodeAddress();
            },
            error: function () {
                alert("An error occurred while processing XML file.");
            }
        });
    });
    $("#submit").click();
});

function getDataFromXML(xml, counter) {
    var input = '';
    var element = $(xml).find('address')[counter];
    $.each(element.attributes, function (i, attrib) {
        input += attrib.value + " ";
    });
    $("#address").val(input);
}

function geocodeAddress() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 }
    });
    var geocoder = new google.maps.Geocoder();

    var address = document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: address             
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}