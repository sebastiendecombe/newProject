var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('<html ng-app>
<head>
  <title>Hello World in AngularJS</title>
</head>
<body>

<input ng-model="name"> Hello {{ name }}

<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.min.js"></script>
</body>
</html>');
});
server.listen(8080);