var fs = require('fs');
var buffer = [];

process.stdin
    .setEncoding('utf8')
    .on('data', function(chunk) {
        buffer.push(chunk);
    })
    .on('end', function() {
        process.stdout.write(
            buffer.join('').replace(/rempl\.scriptFromFile\('(.+)'\)/g, function(m, path) {
                return 'rempl.scriptFromFile(\'data:text/javascript;base64,' +
                    new Buffer(fs.readFileSync(path)).toString('base64') +
                '\')';
            })
        );
    });
