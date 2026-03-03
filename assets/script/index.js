const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all') //promise of response
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLessons(json.data));
};

const displayLessons = (lessons) => {
  // 1. get the container & empty
   const levelContainer = document.getElementById('level-container');
   levelContainer.innerHTML = '';
  // 2. get into every lessons
  for(let lesson of lessons){
    // 3. create a div for every lesson
    console.log(lesson);
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
                 <button class="btn btn-outline btn-primary "
                  ><i class="fa-solid fa-book-open"></i>Learn - ${lesson.level_no}</button>
                
    `
   
    // 4. append the div to the container
    levelContainer.appendChild(btnDiv);
  }
    
};

loadLessons();
