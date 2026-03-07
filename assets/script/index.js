const createElements=(arr)=>{
  const htmlElements = arr.map(el => `<span class='btn'>${el}</span>`);
   return htmlElements.join(" ");
}

const manageSpinner = (status) =>{
  if(status === true){
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('spinner').classList.add('flex');
    document.getElementById('word-container').classList.add('hidden');

  }
  else{
    document.getElementById('spinner').classList.add('hidden');
    document.getElementById('word-container').classList.remove('hidden');
  }
}
const loadLessons = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all') //promise of response
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLessons(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll('.lesson-btn');
  // console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove('active'));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); //remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add('active');
      displayLevelWord(data.data);
    });
};
// {
// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
// "id": 5
// }
const loadWordDetail = async (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayWordDetail(data.data);
   manageSpinner(false);
};
const displayWordDetail = (word) => {
  console.log(word);
  const detailsBox = document.getElementById('details-container');
  detailsBox.innerHTML = `<div>
        <h2 class="font-bold">${word.word} (<i class="fa-solid fa-microphone"></i>:${word.pronunciation})</h2>
      </div>
      <div>
        <h2 class="text-2xl font-bold">Meaning</h2>
        <p>${word.meaning}</p>
      </div>
       <div>
        <h2 class="text-2xl font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>
      <div>
        <h2 class="text-2xl font-bold">Synonym</h2>
        <div class="flex flex-wrap gap-2">${createElements(word.synonyms)}</div>
      </div>
     </div>
     <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>`;
  document.getElementById('my_modal_5').showModal();
 
};

const displayLevelWord = (words) => {
  // 1. get the container & empty
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';

  if (words.length === 0) {
    wordContainer.innerHTML = `
    <div class="text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6">
    <img src="./assets/alert-error.png" alt="" class="mx-auto"/>
        <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>`;
      manageSpinner(false);
    return;
  }
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
        class="card rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-xl">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="font-bangla text-2xl font-medium">${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'} / ${word.pronunciation ? word.pronunciation : 'উচ্চারণ পাওয়া যায়নি'}</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff10] hover:bg-[#1a91ff80]">
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
  manageSpinner(false);
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
                 <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"
                  ><i class="fa-solid fa-book-open"></i>Learn - ${lesson.level_no}</button>
                
    `;

    // 4. append the div to the container
    levelContainer.appendChild(btnDiv);
  }
};

loadLessons();

document.getElementById('search-btn').addEventListener('click', function () {
  removeActive();
  const searchInput = document.getElementById('input-search');
  const searchValue = searchInput.value.trim().toLowerCase();
  // console.log(searchValue);
  fetch('https://openapi.programming-hero.com/api/words/all')
    .then(res => res.json())
    .then(data => {
      const allWords = data.data;
      // console.log(allWords);
      const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
      displayLevelWord(filterWords);
    });
});
