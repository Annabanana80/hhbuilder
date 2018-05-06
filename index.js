// your code goes here ...
window.onload = function(){
	console.log("starting");
	
	var household=[];
	//creates the household list
	var hList = document.createElement('ul');
           

	//with the click of the button, adds the information to the page
		var buttonAdd=document.getElementsByClassName('add');
		for(var i=0;i<buttonAdd.length; i++){
			buttonAdd[i].addEventListener('click',function(event){
			event.preventDefault();
			
			//grabbing the entered values for each of the inputs
			var age = document.getElementsByTagName('input')[0].value;
			var relationship = document.getElementsByTagName('select')[0].options[document.getElementsByTagName('select')[0].selectedIndex].value;
			var smoker=document.getElementsByTagName('input')[1].checked;
			//vaildate the age and relationship--if not valid, info won't append
			if((age<1|| isNaN(age)) && relationship ===""){
				alert('Please enter an age greater than 1 and relationship is required')
			}else if(relationship ===""){
				alert('Relationship is required');
			}else if(age<1|| isNaN(age)){
				alert('Please enter an age greater than 1');
			}else{
			//all of the info is there, go on and add
			//Creating a constructor object for the demographic information for the hh member
			var demographics = new Object();
			//the next three lines dynamically add the age, relationship, and smoker status
			demographics.age = age;
			demographics.relationship=relationship;
			demographics.smoker = smoker;
			
			household.push(demographics);
			console.log(household);
			//this line creates the div in which the items will go. I created a class as there might be multiple lines
			//I named it hDiv--short for household div
			var hMember = document.createElement('li');
			hMember.className = "hMember";
			//creates the delete button that goes with each line
			var deleteBtn = document.createElement('button');
			//creates the button label
			var t=document.createTextNode('Delete');
			//appends the label to the button
			deleteBtn.appendChild(t);
			//gives the delete button a class
			deleteBtn.className="delBtn";
			//appends the delete button and the hh information to the page while getting rid
			//of the curly braces that go with objects
			hMember.innerHTML=JSON.stringify(demographics).replace(/[{'"}]/g, '');
			document.body.appendChild(hMember);
			hMember.appendChild(deleteBtn);

			//Delete Button functionality
			//Since the delete button is dynamically rendered, the standard direct event listener would not work.
			//So I added an event listener to the parent then targeted the button and the class. 
			hMember.addEventListener('click',function(event){
				if(event.target && event.target.matches('button.delBtn')){
					hMember.parentNode.removeChild(hMember);
				}
			  })
			}

			
			//clicking the submit button will submit a fake call to server
			
			var btnSubmit = document.getElementsByTagName('button')[1];
			btnSubmit.addEventListener('click',function(event){
				event.preventDefault();
				var debug=document.querySelector('.debug');
					debug.innerHTML=JSON.stringify(household);
					debug.style.display="block";
					debug.style.overflow="auto";
				
				
				//removing list items on submit
				hMember.parentNode.removeChild(hMember);
				
				//mock request to server
				// var request = new XMLHttpRequest();
				// var household = JSON.stringify(household);
				// request.open('POST', '/', true);
  		// 		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  		// 		request.send(household);


			})
		});
				
	}

};

		