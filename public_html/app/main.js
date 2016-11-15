angular.module("NgStox", ["ngRoute", "ui.bootstrap"])

  .config(($routeProvider) => {
    $routeProvider
      .when("/", {
        controller: "Main",
        templateUrl: "app/main.html"
      })
  })

  .factory("RootFactory", ($http) => {

    const httpget = $http.get("http://localhost:8000/deadstox");
    const Closets = $http.get("http://localhost:8000/deadstox/closets")
    const Sneakers = $http.get("http://localhost:8000/deadstox/sneakers")

    return {
      getRoot: () => {

        return httpget.then(res => res.data);
      },
      getClosets: () => {
        return Closets.then(res => res.data);
      },
      getSneakers: () => {
        return Sneakers.then(res => res.data);
      },
    };
  })
  .factory("NewItemFactory", ($http) => {


    return {
      postNewCloset: (closetsInfo) => {
        console.log("closetsInfo = ", closetsInfo)
        return $http.post("http://localhost:8000/deadstox/closets/", closetsInfo)
        .then(
          res => console.log("res = ", res.data)
        )
      },
      postNewSneaker: (sneakersInfo) => {
        console.log("sneakersInfo = ", sneakersInfo)
        return $http.post("http://localhost:8000/deadstox/sneakers/", sneakersInfo)
        .then(
          res => console.log("res = ", res.data)
        )
      },
    }

  })

  .controller("Main", [
    "$scope",
    "$http",
    "$timeout",
    function($scope) {

      $scope.view = true;

    }]);


  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyCgSMq2jJzuLEbtjTYpYPcxTaSkpORxbEU",
    authDomain: "deadstox-d878a.firebaseapp.com",
    databaseURL: "https://deadstox-d878a.firebaseio.com",
    storageBucket: "deadstox-d878a.appspot.com",
    messagingSenderId: "1051596767459"
  });







