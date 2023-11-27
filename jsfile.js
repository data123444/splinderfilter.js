const myslide = document.querySelectorAll('.myslide'),
	  dot = document.querySelectorAll('.dot');
let counter = 1;
slidefun(counter);

let timer = setInterval(autoSlide, 8000);
function autoSlide() {
	counter += 1;
	slidefun(counter);
}
function plusSlides(n) {
	counter += n;
	slidefun(counter);
	resetTimer();
}
function currentSlide(n) {
	counter = n;
	slidefun(counter);
	resetTimer();
}
function resetTimer() {
	clearInterval(timer);
	timer = setInterval(autoSlide, 8000);
}

function slidefun(n) {
	
	let i;
	for(i = 0;i<myslide.length;i++){
		myslide[i].style.display = "none";
	}
	for(i = 0;i<dot.length;i++) {
		dot[i].className = dot[i].className.replace(' active', '');
	}
	if(n > myslide.length){
	   counter = 1;
	   }
	if(n < 1){
	   counter = myslide.length;
	   }
	myslide[counter - 1].style.display = "block";
	dot[counter - 1].className += " active";
}





let inputElement = document.getElementById("filterinput");
let ulResult = document.getElementById("result");
let listUsers = [];
let noResultMessage = document.createElement("p"); 


function trimText(text) {
  return text.trim();
}

function getUsersWithImages() {
  fetch("https://reqres.in/api/users?page=1", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((responseData) => {
      responseData.data.forEach((item) => {
        let li = document.createElement("li");
        
        
        let firstName = trimText(item.first_name);
        let lastName = trimText(item.last_name);

        li.innerText = `${firstName} ${lastName}`;

        
        let img = document.createElement("img");
        img.src = item.avatar;
        img.alt = `${firstName} ${lastName} Avatar`;
        img.classList.add("user-avatar");

        li.appendChild(img);
        listUsers.push(li);

        ulResult.appendChild(li);
      });

     
      if (listUsers.length === 0) {
        noResultMessage.innerText = "შედეგები არ მოიძებნა.";
        ulResult.appendChild(noResultMessage);
      }
    })
    .catch((error) => console.log(error));
}

getUsersWithImages();

function filterDataUsers(searchItem) {
  listUsers.forEach((item) => {
    let trimmedText = trimText(item.innerText.toLowerCase());
    if (trimmedText.includes(searchItem.toLowerCase())) {
      item.classList.remove("hideList");
    } else {
      item.classList.add("hideList");
    }
  });


  if (listUsers.every((item) => item.classList.contains("hideList"))) {
    noResultMessage.innerText = "შედეგები არ მოიძებნა.";
    ulResult.appendChild(noResultMessage);
  } else {
   
    noResultMessage.innerText = "";
    ulResult.removeChild(noResultMessage);
  }
}

inputElement.addEventListener("keyup", function (event) {
  filterDataUsers(event.target.value);
});
