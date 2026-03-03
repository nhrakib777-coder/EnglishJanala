const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all') //promise of response
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLessons(json.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  // 1. get the container & empty
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';
  // 2. get into every word
  words.forEach((word) => {
    //     {
    // "id": 66,
    // "level": 5,
    // "word": "Pristine",
    // "meaning": "অকৃত্রিম / সম্পূর্ণ বিশুদ্ধ",
    // "pronunciation": "প্রিস্টিন"
    // },
    // 3. create a div
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = `<div
        class="card bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-xl">${word.word}</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="font-bangla text-2xl font-medium">${word.meaning} / ${word.pronunciation}</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>`;
    // 4. append the div
    wordContainer.appendChild(cardDiv);
  });
};

const displayLessons = (lessons) => {
  // 1. get the container & empty
  const levelContainer = document.getElementById('level-container');
  levelContainer.innerHTML = '';
  // 2. get into every lessons
  for (let lesson of lessons) {
    // 3. create a div for every lesson
    console.log(lesson);
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
                 <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary "
                  ><i class="fa-solid fa-book-open"></i>Learn - ${lesson.level_no}</button>
                
    `;

    // 4. append the div to the container
    levelContainer.appendChild(btnDiv);
  }
};

loadLessons();
