angular.module("NgStox")
  .controller("Edit", function($scope, $http, $timeout, RootFactory, NewItemFactory) {
    $scope.title = "Closet and Sneaker Additions";

    RootFactory.getSneakers()
    .then((sneakers) => {
        $scope.sneakersList = sneakers
        console.log("$scope.sneakersList = ", $scope.sneakersList)
    }).then(
        RootFactory.getClosets().then((closets) => {
            $scope.closetList = closets
            console.log("$scope.closetList = ", $scope.closetList)
            })

    ).then($timeout())

    $scope.createSneaker = function(selectedSneaker) {

          const input = document.querySelector('[type="file"]');
          const image_file = input.files[0];
          const randomInteger = Math.random() * 1e17;
          const getFileExtension = image_file.type.split("/").slice(-1)[0];
          const randomPath = `${randomInteger}.${getFileExtension}`;

      firebase.storage().ref().child(randomPath).put(image_file)
        .then((res) => {
        result = {"name": selectedSneaker.name,
                  "closet": selectedSneaker.closet,
                  "brand": selectedSneaker.brand,
                  "release_date": selectedSneaker.release_date,
                  "purchase_date": selectedSneaker.purchase_date,
                  "retail_price": selectedSneaker.retail_price,
                  "resale_value": selectedSneaker.resale_value,
                  "images": res.downloadURL
              }
              console.log("Result!!", result);
            NewItemFactory.postNewSneaker(result)
        });
    }

    $scope.createCloset = function(selectedCloset) {
        // console.log("In submit")
        console.log("selectedCloset = ", selectedCloset)
        result = {"name": `${selectedCloset.name}`,
                  "sneakers": null,
                 }
        NewItemFactory.postNewCloset(result)
    }

    const edit = this;

    edit.root = null;

    edit.sneakerdetail = null;

    const errorHandle = (e) => console.log(e);

    RootFactory.getRoot()
      .then((root) => {
        edit.root = root;
        return $http.get(`${edit.root.sneakers}`);
      }, errorHandle)
      .then((sneakerdetail) => {
        edit.sneakerdetail = sneakerdetail.data;
        console.log(" sneaker detail", edit.sneakerdetail );
        $timeout();
      })
      .then(() => {
        return $http.get(`${edit.root.closets}`);
      }, errorHandle)
      .then((closets) => {
        console.log("closets", closets.data);
        edit.closets = closets.data;
        $timeout();
      });


    // edit.change = function () {
    //   //update selected sneaker information.
    //   return $http.put(`${edit.sneakerdetail.url}`, edit.sneakerdetail)
    //     .then(()=> {
    //       $scope.$emit("reloadPage");
    //     }, errorHandle)
    // };
  });
