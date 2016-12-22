var fs = require('fs');

fs.writeFileSync('index.js',
    fs.readFileSync('index.js', 'utf-8').replace(/rempl\.scriptFromFile\('(.+)'\)/g, function(m, path) {
        return 'rempl.scriptFromFile(\'data:text/javascript;base64,' +
            new Buffer(fs.readFileSync(path)).toString('base64') +
        '\')';
    }),
    'utf-8'
);
