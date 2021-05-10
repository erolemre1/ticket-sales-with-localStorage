const container = document.querySelector(".container");
const countf = document.getElementById("countf");
const amountf = document.getElementById("amountf");
const selectf = document.getElementById("moviesk");
const tickets = document.getElementById("tickets");
const seats = document.querySelectorAll(".seat:not(.reserved)");
const select= document.getElementById("movief");


getFromLocalStorage();
calculatedTotal();

container.addEventListener('click', function(e) {

  if(e.target.classList.contains('seat') && !e.target.classList.contains("reserved")){
    
          // toggle  class'ında eleman varsa siler yoksa ekler
      e.target.classList.toggle("selected");
      calculatedTotal()
      }

});

selectf.addEventListener("change", function(e){
    calculatedTotal()
});


function calculatedTotal(){

    const selectedSeats = container.querySelectorAll(".seat.selected");
    const selectedSeatArr= [];
    const seatsArr = [];

    selectedSeats.forEach(function(seat){
    selectedSeatArr.push(seat);
    })

    seats.forEach(function(seat){
      seatsArr.push(seat);
    });
   
    let selecetedSeatIndexs = selectedSeatArr.map(function(seat){
      return seatsArr.indexOf(seat);
    });

    localStorage.setItem("selectedSeats", JSON.stringify(selecetedSeatIndexs));

    let selectedSeatCount = container.querySelectorAll(".seat.selected").length;
    let pricef =selectf.value;
    let textc = selectf.options[selectf.selectedIndex].text
    
    countf.innerText = selectedSeatCount;
    amountf.innerText= selectedSeatCount * pricef;
    tickets.innerText=  textc

    localStorage.setItem("selectedMovieIndex", select.selectedIndex);
    localStorage.setItem("selectedTickets", selectf.selectedIndex);

}


function getFromLocalStorage(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if(selectedSeats != null && selectedSeats.length >0){

      seats.forEach(function(seat, index){
   if(selectedSeats.indexOf(index) > -1 ){
     seat.classList.add("selected");
   }
      });
    };
      const selectedMovieIndex= JSON.parse(localStorage.getItem("selectedMovieIndex"));
 

      if(selectedMovieIndex != null){
        select.selectedIndex = selectedMovieIndex; 
      };
     
      if (!selectedSeats) {
        localStorage.setItem("selectedSeats", 0);
      }
      
      if (!selectedMovieIndex) {
        localStorage.setItem("selectedMovieIndex", 1);
        
      }
      const selectedTickets= JSON.parse(localStorage.getItem("selectedTickets"));
      if (!selectedTickets) {
        localStorage.setItem("selectedTickets",2);
      }
     
}

function saveToLocalStorage(indexs){
  localStorage.setItem("selectedSeats", JSON.stringify(indexs));
  localStorage.setItem("selectedMovieIndex", select.selectedIndex);
  localStorage.setItem("selectedTickets", selectf.selectedIndex);
}







