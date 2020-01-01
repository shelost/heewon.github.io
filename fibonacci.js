// JavaScript Document


document.getElementById("button").onclick = function fib(){
	

	var numberbox = document.getElementById("numberbox");

	var domain = numberbox.value;
	
	var seq = [1, 1];

for (let i = 0; i < domain-2; i++){
		var a = seq[i]+seq[i+1];
		
		seq.push(a);
	};

	var seq2 = seq.join(', ')

	document.getElementById("fibbox").innerHTML = seq2.toString();
	

};

document.getElementById("button2").onclick = function index(){

	var numberbox = document.getElementById("numberbox");

	var index = numberbox.value;
	
	var seq = [1, 1];

for (let i = 0; i < index-2; i++){
		var a = seq[i]+seq[i+1];
		
		seq.push(a);
	};

	var indexvalue = seq[(index-1)];

	document.getElementById("fibbox").innerHTML = indexvalue;
}