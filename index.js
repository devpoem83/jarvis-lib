var StaticServer = require('static-server');
var server = new StaticServer({
  rootPath: 'public', // required, the root of the server file tree
  port: 80, // required, the port to listen
  name: 'jarvis-localserver', // optional, will set "X-Powered-by" HTTP header
  host: 'l-jarvis-lib.eduwill.net', // optional, defaults to any interface
  cors: '*', // optional, defaults to undefined
  followSymlink: true, // optional, defaults to a 404 error
  templates: {
    index: 'index.html', // optional, defaults to 'index.html'
    notFound: 'public/404.html' // optional, defaults to undefined
  }
});

var chalk = require('chalk');

server.start(function () {
  console.log('=====================================================');
  console.log('        Hello! Jarvis Library System');
  console.log('-----------------------------------------------------');
  portText = server.port == 80 ? '' : ':' + server.port
  console.log('(Ctrl + click) http://' + server.host + portText);
  console.log('=====================================================\n');
});

server.on('request', function (req, res) {
  //console.log('[' + req.method + '] ' + req.path)
  // req.path is the URL resource (file name) from server.rootPath
  // req.elapsedTime returns a string of the request's elapsed time
  console.log(chalk.gray('Request '), chalk.blue('[' + req.method + ']'), req.path);
});

server.on('symbolicLink', function (link, file) {
  // link is the source of the reference
  // file is the link reference
  //console.log('File', link, 'is a link to', file);
  console.log(chalk.cyan('---'), '"' + path.relative(server.rootPath, link) + '"', chalk.magenta('>'), '"' + path.relative(server.rootPath, file) + '"');
});

server.on('response', function (req, res, err, file, stat) {
  // res.status is the response status sent to the client
  // res.headers are the headers sent
  // err is any error message thrown
  // file the file being served (may be null)
  // stat the stat of the file being served (is null if file is null)

  // NOTE: the response has already been sent at this point

  //console.log('[' + req.status + '] [' + req.elapsedTime + '] ')
  if (res.status = 200) {
    console.log(chalk.gray('Response'), chalk.blue('[' + res.status + ']'), req.path, '(' + req.elapsedTime + ')');
  } else {
    console.log(chalk.gray('Response'), chalk.red('[' + res.status + ']'), req.path, '(' + req.elapsedTime + ')');
  }

});