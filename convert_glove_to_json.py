import json

# Path to your downloaded GloVe file
GLOVE_FILE = "glove.6B.50d.txt"  # Make sure this is in the same folder
OUTPUT_JSON = "word_vectors.json"

word_vectors = {}

print("Converting GloVe to JSON...")

with open(GLOVE_FILE, "r", encoding="utf-8") as f:
    for line in f:
        values = line.split()
        word = values[0]  # First item is the word
        vector = [float(val) for val in values[1:]]  # Rest are vector values
        word_vectors[word] = vector

with open(OUTPUT_JSON, "w", encoding="utf-8") as json_file:
    json.dump(word_vectors, json_file)

print(f"Saved {len(word_vectors)} words to {OUTPUT_JSON}")
