fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => {
        const container = document.getElementById('users');

        users.forEach(user => {
            const div = document.createElement('div');
            div.className = 'block user';

            div.innerHTML = `
                <p><b>ID:</b> ${user.id}</p>
                <p><b>Name:</b> ${user.name}</p>
                <a class="btn" href="user-details.html?id=${user.id}">
                    Details
                </a>
            `;

            container.appendChild(div);
        });
    });
