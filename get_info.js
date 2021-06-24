const access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM0I4UTciLCJzdWIiOiI5R0gyRk4iLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJudXQgcnBybyByc2xlIiwiZXhwIjoxNjI0NTY0NzYzLCJpYXQiOjE2MjQ0ODM3MTJ9._jPhCG-eOXSgSQhnn4ZWzZIaTuvr0djHvF6abj1pT4s"
let cal_in = 0
let cal_out = 0
var processMainResponse = function(json) {
	console.log(json)
	cal_out = json["summary"]["caloriesBMR"]
	console.log(cal_out)


	document.getElementById('meditation').value = json["summary"]["sedentaryMinutes"].toString()
	document.getElementById('yoga').value = json["summary"]["lightlyActiveMinutes"].toString()
	document.getElementById('training').value = json["summary"]["fairlyActiveMinutes"].toString()
	document.getElementById('extreme-cardio').value = json["summary"]["veryActiveMinutes"].toString()
	document.getElementById('levitation').value = json["summary"]["elevation"].toString()


	fetch('https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1min.json', {
	  method: "GET",
	  headers: {"Authorization": "Bearer " + access_token}
	})
	.then(response => response.json()) 
	.then(json => processHeartResponse(json))
	
}

var processHeartResponse = function(json) {
	console.log(json)
	let intraday_length = json["activities-heart-intraday"]["dataset"].length 
	let value = json["activities-heart-intraday"]["dataset"][intraday_length - 1]["value"]
	let time = json["activities-heart-intraday"]["dataset"][intraday_length - 1]["time"]
	document.getElementById('resting-heart-rate').value = json["activities-heart"][0]["value"]["restingHeartRate"].toString()
	document.getElementById('current-heart-rate').value = value.toString()
    document.getElementById('minute').value = time.toString()


	fetch('https://api.fitbit.com/1/user/-/foods/log/date/today.json', {
	  method: "GET",
	  headers: {"Authorization": "Bearer " + access_token}
	})
	.then(response => response.json()) 
	.then(json => processFoodResponse(json))

}

var processFoodResponse = function(json) {
	console.log(json)	
	cal_in = json["summary"]["calories"]
	console.log(cal_in)
	
	console.log(cal_in-cal_out)
	document.getElementById('gamerfuel').value = (cal_in-cal_out).toString()
	document.getElementById('energy').value = json["summary"]["carbs"].toString()
	document.getElementById('oils').value = json["summary"]["fat"].toString()
	document.getElementById('fibre').value = json["summary"]["fiber"].toString()
	document.getElementById('strength').value = json["summary"]["protein"].toString()
	document.getElementById('intellect').value = json["summary"]["sodium"].toString()
	document.getElementById('water').value = json["summary"]["water"].toString()
	
	fetch('https://api.fitbit.com/1/user/-/body/log/weight/date/today.json', {
	  method: "GET",
	  headers: {"Authorization": "Bearer " + access_token}
	})
	.then(response => response.json()) 
	.then(json => processBMIResponse(json))

}

var processBMIResponse = function(json) {
	console.log(json)	
	document.getElementById('height').value = "6'3\""
	document.getElementById('weight').value = json["weight"][0]["weight"].toString()
	document.getElementById('bmi').value = json["weight"][0]["bmi"].toString()

}



fetch('https://api.fitbit.com/1/user/-/activities/date/today.json', {
  method: "GET",
  headers: {"Authorization": "Bearer " + access_token}
})
.then(response => response.json()) 
.then(json => processMainResponse(json))



