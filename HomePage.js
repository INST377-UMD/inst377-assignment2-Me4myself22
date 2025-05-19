// home.js

// Wait for DOM content to load before running scripts
document.addEventListener('DOMContentLoaded', () => {
    const quoteEl = document.getElementById('quote');
    const btnStocks = document.getElementById('btn-stocks');
    const btnDogs = document.getElementById('btn-dogs');
    const audioOnBtn = document.getElementById('audio-on');
    const audioOffBtn = document.getElementById('audio-off');
  
    // Fetch and display a quote from the Quotable API
    async function fetchQuote() {
      try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        quoteEl.textContent = `"${data.content}" — ${data.author}`;
      } catch (error) {
        quoteEl.textContent = 'Could not load quote at this time.';
        console.error('Quote fetch error:', error);
      }
    }
  
    // Navigate buttons
    btnStocks.addEventListener('click', () => {
      window.location.href = 'stocks.html';
    });
  
    btnDogs.addEventListener('click', () => {
      window.location.href = 'dogs.html';
    });
  
    // Initialize Annyang voice commands if available
    if (window.annyang) {
      const commands = {
        'hello': () => alert('Hello World!'),
        'alerts with hello world': () => alert('Hello World!'),
        'change the color to *color': (color) => {
          document.body.style.backgroundColor = color;
        },
        'navigate to *page': (page) => {
          page = page.toLowerCase();
          if (['home', 'stocks', 'dogs'].includes(page)) {
            window.location.href = `${page}.html`;
          } else {
            alert(`Sorry, page "${page}" not found.`);
          }
        }
      };
  
      annyang.addCommands(commands);
      annyang.start();
  
      // Buttons to control audio
      audioOnBtn.addEventListener('click', () => {
        annyang.start();
      });
  
      audioOffBtn.addEventListener('click', () => {
        annyang.abort();
      });
    } else {
      console.warn('Annyang not supported in this browser.');
      // Optionally hide audio buttons or notify user
      audioOnBtn.disabled = true;
      audioOffBtn.disabled = true;
    }
  
    // Fetch quote on page load
    fetchQuote();
  });
  