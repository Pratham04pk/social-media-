let posts = [];
let followers = 120;
let following = 150;

function followUser() {
  followers++;
  document.getElementById('followerCount').textContent = followers;
  alert('You followed John Doe!');
}

function addPost() {
  const content = document.getElementById('postContent').value;
  if (content.trim() === '') return;
  const post = {
    id: Date.now(),
    content,
    likes: 0,
    comments: []
  };
  posts.unshift(post);
  document.getElementById('postContent').value = '';
  renderPosts();
}

function renderPosts() {
  const feed = document.getElementById('feed');
  feed.innerHTML = '';
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.className = 'post';
    postEl.innerHTML = `
      <p>${post.content}</p>
      <div class="like-comment">
        <button onclick="likePost(${post.id})">❤️ ${post.likes}</button>
        <button onclick="promptComment(${post.id})">💬 Comment</button>
      </div>
      <div id="comments-${post.id}">
        ${post.comments.map(c => `<p>💬 ${c}</p>`).join('')}
      </div>
    `;
    feed.appendChild(postEl);
  });
}

function likePost(id) {
  const post = posts.find(p => p.id === id);
  if (post) {
    post.likes++;
    renderPosts();
  }
}

function promptComment(id) {
  const comment = prompt('Enter your comment:');
  if (comment) {
    const post = posts.find(p => p.id === id);
    post.comments.push(comment);
    renderPosts();
  }
}
