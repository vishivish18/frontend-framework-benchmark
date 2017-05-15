angular.module("app",["ngRoute","ui.router"]),angular.module("app").service("auth",["$http","$window","$location","$rootScope",function(e,t,o,r){function n(){return e.get("api/users")}function a(t,o){return e.post("api/sessions",{username:t,password:o})}function l(t,o,r){return e.post("api/users",{name:t,username:o,password:r})}function s(){localStorage.removeItem("user_token"),localStorage.removeItem("logged_user"),delete e.defaults.headers.common["x-auth"],r.isLogged=!1,r.currentUser=null,o.path("/login")}function u(o,r){t.sessionStorage.user_token=o,localStorage.setItem("user_token",o),e.defaults.headers.common["x-auth"]=t.sessionStorage.user_token,r&&"function"==typeof r&&r()}function c(){}function g(e,t){r.currentUser=e.name,localStorage.setItem("logged_user",r.currentUser),r.isLogged=!0,t&&"function"==typeof t&&t()}function i(){r.intendedRoute?o.path(r.intendedRoute):o.path("/home")}return{getUser:n,login:a,register:l,logout:s,storeToken:u,isLogged:c,postLoginOps:g,postLoginRouteHandler:i}}]),angular.module("app").controller("homeCtrl",["$scope","$http",function(e,t){t.get("https://randomapi.com/api/5c416965db8365e8e6e353162fdd7b38?key=QDA1-245Z-598E-LOPI&results=10").then(function(t){e.data=t.data.results})}]),angular.module("app").controller("masterCtrl",["$scope","$rootScope","$route","$http",function(e,t,o,r){console.log("masterCtrl"),localStorage.getItem("logged_user")&&(t.currentUser=localStorage.getItem("logged_user"),r.defaults.headers.common["x-auth"]=localStorage.getItem("user_token"),console.log(localStorage.getItem("user_token"))),e.$on("login",function(o,r){console.log("Logged In"),e.currentUser=r,t.currentUser=r,localStorage.setItem("logged_user",t.currentUser.username)})}]),angular.module("app").controller("navCtrl",["$scope","auth","$location",function(e,t,o){e.logout=function(){t.logout()}}]),angular.module("app").config(["$stateProvider","$urlRouterProvider","$locationProvider",function(e,t,o){t.otherwise("/"),e.state("app",{url:"/",views:{header:{templateUrl:"/nav.html",controller:"navCtrl"},content:{templateUrl:"users/home.html",controller:"homeCtrl"}}}).state("app.home",{url:"home",views:{"content@":{templateUrl:"users/home.html",controller:"homeCtrl"}}}).state("app.home.data",{url:"/data/new",views:{"content@":{templateUrl:"users/newData.html",controller:"newDataCtrl"}}}),o.html5Mode(!0)}]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsInNlcnZpY2VzL2F1dGguanMiLCJjb250cm9sbGVycy9ob21lQ3RybC5qcyIsImNvbnRyb2xsZXJzL21hc3RlckN0cmwuanMiLCJjb250cm9sbGVycy9uYXZDdHJsLmpzIiwiY29udHJvbGxlcnMvcm91dGVzLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJzZXJ2aWNlIiwiJGh0dHAiLCIkd2luZG93IiwiJGxvY2F0aW9uIiwiJHJvb3RTY29wZSIsImdldFVzZXIiLCJnZXQiLCJsb2dpbiIsInVzZXJuYW1lIiwicGFzc3dvcmQiLCJwb3N0IiwicmVnaXN0ZXIiLCJuYW1lIiwibG9nb3V0IiwibG9jYWxTdG9yYWdlIiwicmVtb3ZlSXRlbSIsImRlZmF1bHRzIiwiaGVhZGVycyIsImNvbW1vbiIsImlzTG9nZ2VkIiwiY3VycmVudFVzZXIiLCJwYXRoIiwic3RvcmVUb2tlbiIsInJlcyIsImNiIiwic2Vzc2lvblN0b3JhZ2UiLCJzZXRJdGVtIiwidXNlcl90b2tlbiIsInBvc3RMb2dpbk9wcyIsInBvc3RMb2dpblJvdXRlSGFuZGxlciIsImludGVuZGVkUm91dGUiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwidGhlbiIsInJlc3BvbnNlIiwiZGF0YSIsInJlc3VsdHMiLCIkcm91dGUiLCJjb25zb2xlIiwibG9nIiwiZ2V0SXRlbSIsIiRvbiIsIl8iLCJ1c2VyIiwiYXV0aCIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwiJGxvY2F0aW9uUHJvdmlkZXIiLCJvdGhlcndpc2UiLCJzdGF0ZSIsInVybCIsInZpZXdzIiwiaGVhZGVyIiwidGVtcGxhdGVVcmwiLCJjb250ZW50IiwiY29udGVudEAiLCJodG1sNU1vZGUiXSwibWFwcGluZ3MiOiJBQUFBQSxRQUFBQyxPQUFBLE9BQ0EsVUFBQSxjQ0RBRCxRQUFBQyxPQUFBLE9BQ0FDLFFBQUEsUUFBQSxRQUFBLFVBQUEsWUFBQSxhQUFBLFNBQUFDLEVBQUFDLEVBQUFDLEVBQUFDLEdBZUEsUUFBQUMsS0FDQSxNQUFBSixHQUFBSyxJQUFBLGFBR0EsUUFBQUMsR0FBQUMsRUFBQUMsR0FFQSxNQUFBUixHQUFBUyxLQUFBLGdCQUNBRixTQUFBQSxFQUNBQyxTQUFBQSxJQUlBLFFBQUFFLEdBQUFDLEVBQUFKLEVBQUFDLEdBRUEsTUFBQVIsR0FBQVMsS0FBQSxhQUNBRSxLQUFBQSxFQUNBSixTQUFBQSxFQUNBQyxTQUFBQSxJQUtBLFFBQUFJLEtBQ0FDLGFBQUFDLFdBQUEsY0FDQUQsYUFBQUMsV0FBQSxxQkFDQWQsR0FBQWUsU0FBQUMsUUFBQUMsT0FBQSxVQUNBZCxFQUFBZSxVQUFBLEVBQ0FmLEVBQUFnQixZQUFBLEtBQ0FqQixFQUFBa0IsS0FBQSxVQU1BLFFBQUFDLEdBQUFDLEVBQUFDLEdBQ0F0QixFQUFBdUIsZUFBQSxXQUFBRixFQUNBVCxhQUFBWSxRQUFBLGFBQUFILEdBQ0F0QixFQUFBZSxTQUFBQyxRQUFBQyxPQUFBLFVBQUFoQixFQUFBdUIsZUFBQUUsV0FDQUgsR0FBQSxrQkFBQUEsSUFDQUEsSUFJQSxRQUFBTCxNQUlBLFFBQUFTLEdBQUFMLEVBQUFDLEdBR0FwQixFQUFBZ0IsWUFBQUcsRUFBQVgsS0FDQUUsYUFBQVksUUFBQSxjQUFBdEIsRUFBQWdCLGFBQ0FoQixFQUFBZSxVQUFBLEVBQ0FLLEdBQUEsa0JBQUFBLElBQ0FBLElBS0EsUUFBQUssS0FDQXpCLEVBQUEwQixjQUNBM0IsRUFBQWtCLEtBQUFqQixFQUFBMEIsZUFFQTNCLEVBQUFrQixLQUFBLFNBM0VBLE9BQ0FoQixRQUFBQSxFQUNBRSxNQUFBQSxFQUNBSSxTQUFBQSxFQUNBRSxPQUFBQSxFQUNBUyxXQUFBQSxFQUNBSCxTQUFBQSxFQUNBUyxhQUFBQSxFQUNBQyxzQkFBQUEsTUNaQS9CLFFBQUFDLE9BQUEsT0FDQWdDLFdBQUEsWUFBQSxTQUFBLFFBQUEsU0FBQUMsRUFBQS9CLEdBRUFBLEVBQUFLLElBQUEsaUdBQ0EyQixLQUFBLFNBQUFDLEdBQ0FGLEVBQUFHLEtBQUFELEVBQUFDLEtBQUFDLGFDTEF0QyxRQUFBQyxPQUFBLE9BQ0FnQyxXQUFBLGNBQUEsU0FBQSxhQUFBLFNBQUEsUUFBQSxTQUFBQyxFQUFBNUIsRUFBQWlDLEVBQUFwQyxHQUNBcUMsUUFBQUMsSUFBQSxjQUVBekIsYUFBQTBCLFFBQUEsaUJBQ0FwQyxFQUFBZ0IsWUFBQU4sYUFBQTBCLFFBQUEsZUFDQXZDLEVBQUFlLFNBQUFDLFFBQUFDLE9BQUEsVUFBQUosYUFBQTBCLFFBQUEsY0FDQUYsUUFBQUMsSUFBQXpCLGFBQUEwQixRQUFBLGdCQUVBUixFQUFBUyxJQUFBLFFBQUEsU0FBQUMsRUFBQUMsR0FDQUwsUUFBQUMsSUFBQSxhQUNBUCxFQUFBWixZQUFBdUIsRUFDQXZDLEVBQUFnQixZQUFBdUIsRUFDQTdCLGFBQUFZLFFBQUEsY0FBQXRCLEVBQUFnQixZQUFBWixlQ2JBVixRQUFBQyxPQUFBLE9BQ0FnQyxXQUFBLFdBQUEsU0FBQSxPQUFBLFlBQUEsU0FBQUMsRUFBQVksRUFBQXpDLEdBQ0E2QixFQUFBbkIsT0FBQSxXQUNBK0IsRUFBQS9CLGFDSEFmLFFBQUFDLE9BQUEsT0FDQThDLFFBQUEsaUJBQUEscUJBQUEsb0JBQUEsU0FBQUMsRUFBQUMsRUFBQUMsR0FFQUQsRUFBQUUsVUFBQSxLQUVBSCxFQUNBSSxNQUFBLE9BQ0FDLElBQUEsSUFDQUMsT0FDQUMsUUFDQUMsWUFBQSxZQUNBdkIsV0FBQSxXQUVBd0IsU0FDQUQsWUFBQSxrQkFDQXZCLFdBQUEsZUFPQW1CLE1BQUEsWUFDQUMsSUFBQSxPQUNBQyxPQUNBSSxZQUNBRixZQUFBLGtCQUNBdkIsV0FBQSxlQU1BbUIsTUFBQSxpQkFDQUMsSUFBQSxZQUNBQyxPQUNBSSxZQUNBRixZQUFBLHFCQUNBdkIsV0FBQSxrQkFNQWlCLEVBQUFTLFdBQUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiYW5ndWxhci5tb2R1bGUoJ2FwcCcsW1xuJ25nUm91dGUnLCd1aS5yb3V0ZXInXG5dKSIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5zZXJ2aWNlKCdhdXRoJywgZnVuY3Rpb24oJGh0dHAsICR3aW5kb3csICRsb2NhdGlvbiwgJHJvb3RTY29wZSkge1xuXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldFVzZXI6IGdldFVzZXIsXG4gICAgICAgICAgICBsb2dpbjogbG9naW4sXG4gICAgICAgICAgICByZWdpc3RlcjogcmVnaXN0ZXIsXG4gICAgICAgICAgICBsb2dvdXQ6IGxvZ291dCxcbiAgICAgICAgICAgIHN0b3JlVG9rZW46IHN0b3JlVG9rZW4sXG4gICAgICAgICAgICBpc0xvZ2dlZDogaXNMb2dnZWQsXG4gICAgICAgICAgICBwb3N0TG9naW5PcHM6IHBvc3RMb2dpbk9wcyxcbiAgICAgICAgICAgIHBvc3RMb2dpblJvdXRlSGFuZGxlcjogcG9zdExvZ2luUm91dGVIYW5kbGVyXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFVzZXIoKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdhcGkvdXNlcnMnKVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdhcGkvc2Vzc2lvbnMnLCB7XG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlZ2lzdGVyKG5hbWUsIHVzZXJuYW1lLCBwYXNzd29yZCkge1xuXG4gICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJ2FwaS91c2VycycsIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuXG4gICAgICAgIGZ1bmN0aW9uIGxvZ291dCgpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCd1c2VyX3Rva2VuJyk7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnbG9nZ2VkX3VzZXInKTtcbiAgICAgICAgICAgIGRlbGV0ZSAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsneC1hdXRoJ11cbiAgICAgICAgICAgICRyb290U2NvcGUuaXNMb2dnZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICRyb290U2NvcGUuY3VycmVudFVzZXIgPSBudWxsO1xuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvbG9naW5cIilcblxuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHN0b3JlVG9rZW4ocmVzLCBjYikge1xuICAgICAgICAgICAgJHdpbmRvdy5zZXNzaW9uU3RvcmFnZVtcInVzZXJfdG9rZW5cIl0gPSByZXNcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1c2VyX3Rva2VuJywgcmVzKTtcbiAgICAgICAgICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWyd4LWF1dGgnXSA9ICR3aW5kb3cuc2Vzc2lvblN0b3JhZ2UudXNlcl90b2tlblxuICAgICAgICAgICAgaWYgKGNiICYmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGlzTG9nZ2VkKCkge1xuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwb3N0TG9naW5PcHMocmVzLCBjYikge1xuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICRyb290U2NvcGUuY3VycmVudFVzZXIgPSByZXMubmFtZVxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvZ2dlZF91c2VyJywgJHJvb3RTY29wZS5jdXJyZW50VXNlcilcbiAgICAgICAgICAgICRyb290U2NvcGUuaXNMb2dnZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKGNiICYmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcG9zdExvZ2luUm91dGVIYW5kbGVyKCkge1xuICAgICAgICAgICAgaWYgKCRyb290U2NvcGUuaW50ZW5kZWRSb3V0ZSkge1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCRyb290U2NvcGUuaW50ZW5kZWRSb3V0ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvaG9tZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdob21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHApIHtcblxuICAgICAgICAkaHR0cC5nZXQoJ2h0dHBzOi8vcmFuZG9tYXBpLmNvbS9hcGkvNWM0MTY5NjVkYjgzNjVlOGU2ZTM1MzE2MmZkZDdiMzg/a2V5PVFEQTEtMjQ1Wi01OThFLUxPUEkmcmVzdWx0cz0xMCcpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgICRzY29wZS5kYXRhID0gcmVzcG9uc2UuZGF0YS5yZXN1bHRzXG4gICAgICAgIH0pXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdtYXN0ZXJDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkcm91dGUsICRodHRwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibWFzdGVyQ3RybFwiKTtcblxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlZF91c2VyJykpIHsgICAgICAgIFx0XG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlZF91c2VyJylcbiAgICAgICAgICAgICRodHRwLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWyd4LWF1dGgnXSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyX3Rva2VuJylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd1c2VyX3Rva2VuJykpXG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLiRvbignbG9naW4nLCBmdW5jdGlvbihfLCB1c2VyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dlZCBJblwiKTtcbiAgICAgICAgICAgICRzY29wZS5jdXJyZW50VXNlciA9IHVzZXJcbiAgICAgICAgICAgICRyb290U2NvcGUuY3VycmVudFVzZXIgPSB1c2VyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9nZ2VkX3VzZXInLCAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyLnVzZXJuYW1lKVxuICAgICAgICB9KVxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbmF2Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgYXV0aCwgJGxvY2F0aW9uKSB7ICAgICAgICBcbiAgICAgICAgJHNjb3BlLmxvZ291dCA9IGZ1bmN0aW9uKCkgeyAgICAgICAgICAgIFxuICAgICAgICAgICAgYXV0aC5sb2dvdXQoKSAgICAgICAgICAgICAgICBcblxuICAgICAgICB9XG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCRsb2NhdGlvblByb3ZpZGVyKXtcbiBcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG4gXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ2FwcCcse1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICdoZWFkZXInOiB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbmF2Lmh0bWwnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICduYXZDdHJsJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdjb250ZW50Jzoge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndXNlcnMvaG9tZS5odG1sJyAsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDdHJsJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIFxuIFxuICAgIC5zdGF0ZSgnYXBwLmhvbWUnLCB7XG4gICAgICAgIHVybDogJ2hvbWUnLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndXNlcnMvaG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaG9tZUN0cmwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiBcbiAgICB9KVxuXG4gICAgIC5zdGF0ZSgnYXBwLmhvbWUuZGF0YScsIHtcbiAgICAgICAgdXJsOiAnL2RhdGEvbmV3JyxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICdjb250ZW50QCc6IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3VzZXJzL25ld0RhdGEuaHRtbCcsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ25ld0RhdGFDdHJsJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gXG4gICAgfSkgICAgXG4gXG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpXG4gXG59KTtcblxuIl19