const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle("show", entry.isIntersecting);
            if(entry.isIntersecting){
              observer.unobserve(entry.target);
            }
        });
    },
    {
        // threshold: 1,
    }
);

cards.forEach((card) => {
    observer.observe(card);
});

const lastCardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(!entry.isIntersecting) return;

      loadCard();
      lastCardObserver.unobserve(entry.target);
      lastCardObserver.observe(getLastCard());
    });
});

lastCardObserver.observe(getLastCard());

function getLastCard(){
  return document.querySelector(".card:last-child");
}

const container = document.querySelector(".container");

function loadCard() {
  for(let i = 0; i < 10; i++){ 
    const card = document.createElement("div");
    card.innerHTML = '<p>Loading ...</p>';
    card.classList.add("card");
    observer.observe(card);
    container.appendChild(card);
    addImage(card);
  }
}

function addImage(card){
  setTimeout(() => {
    card.innerHTML = '<img src="https://picsum.photos/200/300" alt="">';
  }, 3000);
}
