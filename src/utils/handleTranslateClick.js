const createTranslateUrl = (text, targetLang) => {
  const encodedText = encodeURIComponent(text);
  return `https://translate.google.com/?sl=auto&tl=${targetLang}&text=${encodedText}&op=translate`;
};

const isMobile = () => {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

  return mobileRegex.test(navigator.userAgent);
};

export const handleTranslateClick = (text, targetLang) => {
  try {
    if (!text || !targetLang) {
      throw new Error('Відсутні обов\'язкові параметри');
    }

    const encodedText = encodeURIComponent(text);
    if (encodedText.length > 2000) { // Google має обмеження на довжину URL
      throw new Error('Текст занадто довгий');
    }

    if (isMobile()) {
      const mobileUrl = `googleTranslate://translate?sl=auto&tl=${targetLang}&phrase=${encodedText}`;
      const webUrl = createTranslateUrl(text, targetLang);

      const fallbackTimeout = setTimeout(() => {
        window.open(webUrl, '_blank', 'noopener,noreferrer');
      }, 1200);

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          clearTimeout(fallbackTimeout);
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        }
      };

      if (document.addEventListener) {
        document.addEventListener('visibilitychange', handleVisibilityChange, { once: true });
      }

      window.location.href = mobileUrl;
    } else {
      window.open(createTranslateUrl(text, targetLang), '_blank', 'noopener,noreferrer');
    }
  } catch (error) {
    console.error('Помилка під час перекладу:', error);
    // Додати відповідну обробку помилок для користувача
  }
};