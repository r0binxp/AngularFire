/* Buscamos el modulo myApp */
var app = angular.module('myApp');

app.controller('myCtrl', function($scope) {
    var db = firebase.database();
    var data = {};
    var key;
    var $inputNombre = document.getElementById('nombreId');

    $scope.ordenLista = "nombre";
    $scope.llaveupdate = "";
    $scope.actualizarbtn = false;
    $scope.reverse = true;
    $scope.usuario = {
      nombre: "",
      apellido : "",
      telefono : "",
    }
    function borradatos(){
      $scope.usuario = {
        nombre: "",
        apellido : "",
        telefono : "",
      }
    }

    $scope.enviar = function(){
       db.ref('usuario').push($scope.usuario);
       borradatos();
       $inputNombre.focus();

    }

     db.ref('usuario').on('value',function(snapshot){
     data = snapshot.val();
     $scope.datos = data;
     console.log(data);
     $scope.$digest();
    })

    $scope.borrar = function(key){
      console.log(key);
      var llave = key;
    db.ref('usuario').child(llave).remove();
    }
    $scope.editar = function(key,dato){
      $scope.key = key;
      console.log(dato);
      $scope.usuario = {
        nombre: dato.nombre,
        apellido: dato.apellido,
        telefono: dato.telefono,
      }
      $scope.actualizarbtn=true;
      console.log(key);
      $scope.llaveupdate = key;
    }
    $scope.actualizar = function(key){
      console.log("ESTA ES LA LLAVE +" + key);
      db.ref('usuario').child(key).update($scope.usuario);
      $scope.actualizarbtn=false;
      borradatos();
     }

   $scope.ordenListaCambio = function(orden){
     console.log(orden);
       $scope.reverse = ($scope.ordenLista === orden) ? !$scope.reverse : false;
       $scope.ordenLista = orden;
   }

});
