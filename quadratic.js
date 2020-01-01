// JavaScript Document


document.getElementById("roots").onclick = function quad(){
	

	var abox = document.getElementById("abox");
	var bbox = document.getElementById("bbox");
	var cbox = document.getElementById("cbox");

	var a = abox.value;
	var b = bbox.value;
	var c = cbox.value;

	var roots = [];

	let root1, root2, q, w;
	
	if ((b**2-4*a*c) < 0){

		q = -b/(2*a);
		w  = ((Math.sqrt(-(b**2-4*a*c)))/(2*a));
		root1 = `${q.toString()} + ${w.toString()} i`;

		root2 = `${q.toString()} - ${w.toString()} i`;
		
	}else{
		q = (-b + Math.sqrt(b**2-4*a*c))/(2*a);
		w = (-b - Math.sqrt(b**2-4*a*c))/(2*a);

		root1 = q.toString();
		root2 = w.toString();

	
	}


	
	roots.push(root1);
	roots.push(root2);

	var roots2 = roots.join(', ');


	document.getElementById("answerbox").innerHTML = roots2;
	

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