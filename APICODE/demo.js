
onload = function () {

  var upload = document.getElementsByTagName('input')[0],
    viewspace = document.getElementById('viewspace'),
    fileapistatus = document.getElementById('fileapistatus');


  if (window.FileReader) {
    fileapistatus.innerHTML = '<b style="color:green">File API & FileReader available</b>';
  } else {
    fileapistatus.innerHTML = '<b style="color:red">File API & FileReader API not supported</b>';
  }

  var maxwidth = viewspace.getAttribute('width') || 400;

  upload.onchange = function (e) {
    e.preventDefault();
    viewspace.innerHTML = '';
    for (var i = 0; upload.files[i]; i++) {
      (function(file, reader){
        reader.readAsDataURL(file);
        reader.onload = function (event) {
          var img = new Image();
          img.src = event.target.result;
          img.onload = function () {
            var description = document.createElement('div');
            description.innerHTML = 'file <b>"' + file.name + '"</b> size ' + img.width + '&times;' + img.height + '';
            viewspace.appendChild(description);
            // note: no onload required since we've got the dataurl...I think! :)
            if (img.width > maxwidth) {
              // viewspace width
              img.width = maxwidth;
            }
            viewspace.appendChild(img);
          };
        };
      })(upload.files[i], new FileReader());
    }
    return false;
  };
};
