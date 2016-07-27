var fs = require('fs');
var gm = require('gm');

gm('./1.jpg')
    .options({
        appPath:'C:/Program Files (x86)/GraphicsMagick-1.3.21-Q8/'
    })
    .resize(50, 50,'!')
    .autoOrient()
    .write('./2.jpg', function (err) {
        if (err) console.log(err);
    });