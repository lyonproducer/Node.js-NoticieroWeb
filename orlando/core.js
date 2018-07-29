angular.module('MainApp', [])

function mainController($scope, $http) {
	$scope.noticias = {};

	// Obtenemos todos los datos de la base de datos
	$http.get('/api/product').success(function(data) {
		$scope.noticias = data;
		console.log(data);
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

}