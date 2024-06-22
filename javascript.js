document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const form = document.getElementById('recipeForm');
    form.addEventListener('submit', function(event) {
        let isValid = true;

        // Validate recipe title
        const title = document.getElementById('recipeTitle');
        if (title.value.trim() === '') {
            title.classList.add('is-invalid');
            isValid = false;
        } else {
            title.classList.remove('is-invalid');
        }

        // Validate description
        const description = document.getElementById('recipeDescription');
        if (description.value.trim() === '') {
            description.classList.add('is-invalid');
            isValid = false;
        } else {
            description.classList.remove('is-invalid');
        }

        if (!isValid) {
            event.preventDefault();
            event.stopPropagation();
        }
    });

    // Fetch data from an external API
    const recipeContainer = document.querySelector('.col-lg-8 .row');
    fetch('https://api.spoonacular.com/recipes/random?number=2&apiKey=YOUR_API_KEY')
        .then(response => response.json())
        .then(data => {
            data.recipes.forEach(recipe => {
                const card = document.createElement('div');
                card.className = 'col-md-6 mb-4';
                card.innerHTML = `
                    <div class="card">
                        <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.title}</h5>
                            <p class="card-text">${recipe.summary}</p>
                            <a href="${recipe.sourceUrl}" class="btn btn-primary" target="_blank">View Recipe</a>
                        </div>
                    </div>
                `;
                recipeContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching recipes:', error));
});