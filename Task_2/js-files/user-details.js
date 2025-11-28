const params = new URLSearchParams(window.location.search);
const userId = params.get('id');

const userInfo = document.getElementById('user-info');
const postsContainer = document.getElementById('posts');
const postsBtn = document.getElementById('postsBtn');


const backBtn = document.getElementById('backBtn');

if (backBtn) {
    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}


/* ================= USER INFO ================= */

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(res => res.json())
    .then(user => {
        userInfo.innerHTML = `
            <div class="block user">

                <h2>User information</h2>

                <p><b>ID:</b> ${user.id}</p>
                <p><b>Name:</b> ${user.name}</p>
                <p><b>Username:</b> ${user.username}</p>
                <p><b>Email:</b> ${user.email}</p>
                <p><b>Phone:</b> ${user.phone}</p>
                <p><b>Website:</b> ${user.website}</p>

                <h3>Address</h3>
                <p>${user.address.street}, ${user.address.suite}</p>
                <p>${user.address.city}, ${user.address.zipcode}</p>
                <p>Geo: ${user.address.geo.lat}, ${user.address.geo.lng}</p>

                <h3>Company</h3>
                <p><b>Name:</b> ${user.company.name}</p>
                <p><b>Catch phrase:</b> ${user.company.catchPhrase}</p>
                <p><b>BS:</b> ${user.company.bs}</p>

            </div>
        `;
    })
    .catch(() => {
        userInfo.innerHTML = '<p>Error loading user data</p>';
    });

/* ================= POSTS ================= */

postsBtn.addEventListener('click', () => {
    postsBtn.disabled = true;

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(res => res.json())
        .then(posts => {
            postsContainer.innerHTML = '';

            posts.forEach(post => {
                const postBlock = document.createElement('div');
                postBlock.className = 'block post';

                postBlock.innerHTML = `
                    <p><b>${post.title}</b></p>
                    <a class="btn" href="post-details.html?id=${post.id}">
                        Open post
                    </a>
                `;

                postsContainer.appendChild(postBlock);
            });
        })
        .catch(() => {
            postsContainer.innerHTML = '<p>Error loading posts</p>';
        });
});
