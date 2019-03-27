app.factory('Travels', ['$http', function($http) {
  let model, backup, api = 'https://mercloud.com:4136/api/travels';
  return {
    newStepIndex: -1,
    get: function(id) {
      // reset index
      this.newStepIndex = -1;
      return $http.get(`${ api }/${ id ? id : '' }`).then(function(response) {
        if (response.data.success === true) {
          // save model reference into memory
          model = angular.fromJson(response.data[id ? 'travel' : 'travels']);
          backup = angular.copy(model);
        }
        return model;
      }, function(error) {
      });
    },
    // add new empty travel into database
    // and return new db object from api
    add: function(callback) {
      return $http.post(api).then(function(response) {
        if (response.data.success === true) {
          //callback(response.data.travel.id);
          model.push(response.data.travel);
        }
      }, function(error) {
      });
    },
    remove: function(id) {
      return $http.delete(`${ api }/${ id }`).then(function(response) {
        if (response.data.success === true) {
          let index = model.findIndex(x => x.id === id);
          model.splice(index, 1);
        }
      }, function(error) {
      });
    },
    addStep: function() {
      this.newStepIndex = model.steps.push({ items: [] }) - 1;
    },
    addItem: function(stepIndex) {
      return model.steps[stepIndex].items.push([]);
    },
    removeStep: function(index) {
      model.steps.splice(index, 1);
    },
    removeItem: function(stepIndex, index) {
      model.steps[stepIndex].items.splice(index, 1);
    },
    // populate currently opened travel object with data
    save: function() {
      return $http.put(api, model).then(function(response) {
        return response.data.success;
      });
    },
    isPristine: function() {
      return angular.equals(model, backup);
    }
  };
}]);
