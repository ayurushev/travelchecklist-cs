app.factory('Travels', ['$http', 'API_URL', function($http, API_URL) {
  let model, originalModel, api = `${ API_URL }/travels`;
  return {
    newStepIndex: -1,
    editMode: false,
    get: function(id) {
      // reset index
      this.newStepIndex = -1;
      return $http.get(`${ api }/${ id ? id : '' }`).then(function(response) {
        if (response.data.success === true) {
          // save model reference into memory
          model = angular.fromJson(response.data[id ? 'travel' : 'travels']);
          originalModel = angular.copy(model);
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
          model.push(response.data.travel);
          if (angular.isFunction(callback)) {
            callback(response.data.travel.id);
          }
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
      this.editMode = true;
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
    toggleDone: function(id, sid, done) {
      done = done || false;
      return $http.put(`${ api }/${ id }/step/${ sid }`, { done: done }).then(function(response) {
        return response.data;
      }, function(error) {
      });
    },
    // populate currently opened travel object with data
    save: function() {
      let t = this;
      return $http.put(api, model).then(function(response) {
        originalModel = angular.copy(model);
        t.editMode = false;
        return response.data;
      }, function(error) {
      });
    },
    isPristine: function() {
      return angular.equals(model, originalModel);
    },
    toggleEdit: function() {
      this.editMode = !this.editMode;
    }
  };
}]);
