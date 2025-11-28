const params = new URLSearchParams(window.location.search);
const postId = params.get('id');

const postInfo = document.getElementById('post-info');
const commentsContainer = document.getElementById('comments');
const backToUserBtn = document.getElementById('backToUserBtn');

let userId = null;

/* ================= POST ================= */

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(res => res.json())
    .then(post => {
        userId = post.userId;

        postInfo.innerHTML = `
            <div class="block post">
                <h2>Post information</h2>

                <p><b>User ID:</b> ${post.userId}</p>
                <p><b>Post ID:</b> ${post.id}</p>

                <p><b>Title:</b></p>
                <p>${post.title}</p>

                <p><b>Body:</b></p>
                <p>${post.body}</p>
            </div>
        `;
    });

/* ================= COMMENTS ================= */

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(res => res.json())
    .then(comments => {
        commentsContainer.innerHTML = '';

        comments.forEach(comment => {
            const div = document.createElement('div');
            div.className = 'block comment';

            div.innerHTML = `
                <p><b>${comment.email}</b></p>
                <p>${comment.body}</p>
            `;

            commentsContainer.appendChild(div);
        });
    });

/* ================= BACK BUTTON ================= */

backToUserBtn.addEventListener('click', () => {
    if (userId) {
        window.location.href = `user-details.html?id=${userId}`;
    } else {
        window.location.href = 'index.html';
    }
});
