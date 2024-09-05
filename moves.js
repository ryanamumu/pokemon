// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pokemon-form');
    const pokemonNameInput = document.getElementById('pokemon-name');
    const attackList = document.getElementById('attack-list');
    const pokemonImage = document.querySelector('.pokemon__image');
    const pokemonNumber = document.querySelector('.pokemon__number');
    const pokemonName = document.querySelector('.pokemon__name');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pokemonNameValue = pokemonNameInput.value.toLowerCase();
  
      try {
        const response = await fetch(`/get_attacks?pokemon=${pokemonNameValue}`);
        const data = await response.json();
        attackList.innerHTML = '';
  
        if (data.pokemon) {
          // Update Pokémon info
          pokemonImage.src = data.pokemon.imageUrl; // Assumindo que a API fornece a URL da imagem
          pokemonNumber.textContent = data.pokemon.number; // Número do Pokémon
          pokemonName.textContent = data.pokemon.name; // Nome do Pokémon
        }
  
        if (data.attacks && Array.isArray(data.attacks)) {
          data.attacks.forEach(attack => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${attack.name}</td>
              <td>${attack.power}</td>
              <td>${attack.accuracy}</td>
            `;
            attackList.appendChild(row);
          });
        } else if (data.error) {
          attackList.innerHTML = `<tr><td colspan="3">${data.error}</td></tr>`;
        }
      } catch (error) {
        attackList.innerHTML = `<tr><td colspan="3">Erro ao buscar dados.</td></tr>`;
      }
    });
  });
  