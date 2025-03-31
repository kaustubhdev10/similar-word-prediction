let wordVectors = {};

// Load word vectors
fetch("word_vectors.json")
    .then(response => response.json())
    .then(data => {
        wordVectors = data;
        console.log("✅ Word vectors loaded:", Object.keys(wordVectors).length);
    })
    .catch(error => console.log("❌ Error loading word vectors:", error));

function getSimilarWords() {
    let word = document.getElementById("wordInput").value.toLowerCase();

    if (!wordVectors[word]) {
        document.getElementById("result").innerHTML = `<p style="color:red">Word not found in vocabulary.</p>`;
        return;
    }

    let inputVector = wordVectors[word];
    let similarWords = [];

    for (let w in wordVectors) {
        if (w !== word) {
            let otherVector = wordVectors[w];
            let similarity = cosineSimilarity(inputVector, otherVector);
            similarWords.push({ word: w, score: similarity });
        }
    }

    similarWords.sort((a, b) => b.score - a.score);

    let resultHTML = "<h3>Top 5 Similar Words:</h3><ul>";
    for (let i = 0; i < 5; i++) {
        resultHTML += `<li>${similarWords[i].word} (Similarity: ${similarWords[i].score.toFixed(3)})</li>`;
    }
    resultHTML += "</ul>";

    document.getElementById("result").innerHTML = resultHTML;
}

function cosineSimilarity(vec1, vec2) {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    
    for (let i = 0; i < vec1.length; i++) {
        dotProduct += vec1[i] * vec2[i];
        normA += vec1[i] ** 2;
        normB += vec2[i] ** 2;
    }
    
    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);
    
    return dotProduct / (normA * normB);
}
