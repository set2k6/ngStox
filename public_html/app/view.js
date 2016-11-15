angular.module("NgStox")

  .controller("View", function($scope, $http, $timeout, $rootScope, RootFactory) {

    $scope.currentCloset;
    $scope.closets = [];
    const errorHandle = (e) => console.log(e);

    $scope.displayClosetChoice = function(closet) {
      console.log("closet is", closet);
      $scope.currentCloset = closet
    }

    // Populate closet data.
    $scope.loadPage = () => {
      RootFactory.getRoot()
        .then((root) => {
          $http.get(root.closets)
              .then((closetslist) => {
                $scope.closets = closetslist.data.results;

                $scope.closets.forEach(function(closet) {
                  closet.total_retail_value = 0;
                  closet.total_resale_value = 0;

                  closet.sneakers.forEach(function(sneaker) {
                    console.log(sneaker.retail_price, sneaker.resale_value);
                    closet.total_retail_value += parseFloat(sneaker.retail_price, 10);
                    closet.total_resale_value += parseFloat(sneaker.resale_value, 10);
                  });

                  closet.total_profit = closet.total_resale_value - closet.total_retail_value;
                });

                $timeout();
              }, errorHandle);
          return root;
        }, errorHandle)
        .then((root) => {
          $http.get(root.sneakers)
              .then((sneakerslist) => {
                $scope.sneakers = sneakerslist.data.results;

                $timeout();
              }, errorHandle);
          return root;
        }, errorHandle)
    };

    $scope.deleteItem = function (sneaker) {
      //deletes selected sneaker.
      console.log("damn delete");

      RootFactory.getRoot().then(function(root) {
        var sneakersurl = root.sneakers + sneaker.id + "/";

        return $http.delete(sneakersurl)
        .then(()=> {
          $scope.$emit("reloadPage");
        }, errorHandle);
      });
    };

   // Call populate closets data on page load.
    $scope.loadPage();

    //listener to reload the page when someone edits/deletes a sneaker from the closet.
    $rootScope.$on("reloadPage", () => {
      $scope.loadPage();
    });

  });

