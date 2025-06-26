fetch("answers_extracted.csv")
  .then(res => res.text())
  .then(text => {
    Papa.parse(text, {
      header: false,
      skipEmptyLines: false,
      complete: function(results) {
        renderQuiz(results.data);
      }
    });
  });

function renderQuiz(data) {
  const container = document.getElementById('quizContainer');
  container.innerHTML = '';

  let questionCounter = 1;
  let sectionCounter = 1;

  data.forEach((row, index) => {
    if (row.every(cell => !cell?.trim())) {
      const sectionHeader = document.createElement('h2');
      sectionHeader.textContent = `Section ${sectionCounter++}`;
      container.appendChild(sectionHeader);
      questionCounter = 1;
      return;
    }

    const [question, A, B, C, D, correct] = row.map(cell => cell?.trim() || "");

    if (!question || !correct) return; // skip only if missing entirely

    const block = document.createElement('div');
    block.className = 'question-block';

    block.innerHTML = `
      <div><strong>Q${questionCounter++}:</strong> ${question}</div>
      <div class="options">
        <div><input type="radio" name="q${index}"> A. ${A}</div>
        <div><input type="radio" name="q${index}"> B. ${B}</div>
        <div><input type="radio" name="q${index}"> C. ${C}</div>
        <div><input type="radio" name="q${index}"> D. ${D}</div>
      </div>
      <button onclick="this.nextElementSibling.style.display='block'">View Answer</button>
      <div class="answer">Correct Answer: <strong>${correct}</strong></div>
    `;

    container.appendChild(block);
  });
}
