export const isValidWordList = (list) => {
  return (
    typeof list === 'object' &&
    list !== null &&
    typeof list.id === 'string' &&
    typeof list.listName === 'string' &&
    Array.isArray(list.words) &&
    // Перевіряємо, чи кожен елемент в `words` також є валідним
    list.words.every(isValidWord)
  );
};

export const isValidWord = (word) => {
  return (
    typeof word === 'object' &&
    word !== null &&
    typeof word.id === 'string' &&
    typeof word.word === 'string' &&
    typeof word.translation === 'string' &&
    typeof word.isLearned === 'boolean'
  );
};