const POSTS_KEY = "mtaaconnect_posts";

function _loadPosts() {
  try {
    const raw = localStorage.getItem(POSTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function _savePosts(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

function _newId() {
  return "post_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
}

// GET all posts - newest first
function getPosts() {
  return _loadPosts().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

// GET one post
function getPostById(id) {
  return _loadPosts().find(p => p.id === id) || null;
}

// POST - create a new post
function createPost({ title, content, neighborhood, authorId, authorName }) {
  if (!title || !content) throw new Error("Title and content are required");
  const posts = _loadPosts();
  const now = new Date().toISOString();
  const post = {
    id: _newId(),
    title: title.trim(),
    content: content.trim(),
    neighborhood: neighborhood || "General",
    authorId: authorId || "guest",
    authorName: authorName || "Anonymous",
    likes: 0,
    createdAt: now,
    updatedAt: now
  };
  posts.push(post);
  _savePosts(posts);
  return post;
}

// PUT - update a post
function updatePost(id, updates, currentUserId) {
  const posts = _loadPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) throw new Error("Post not found");
  if (currentUserId && posts[index].authorId !== currentUserId) {
    throw new Error("You can only edit your own post");
  }
  posts[index] = { ...posts[index], ...updates, updatedAt: new Date().toISOString() };
  _savePosts(posts);
  return posts[index];
}

// DELETE - delete a post
function deletePost(id, currentUserId) {
  const posts = _loadPosts();
  const post = posts.find(p => p.id === id);
  if (!post) return false;
  if (currentUserId && post.authorId !== currentUserId) {
    throw new Error("You can only delete your own post");
  }
  _savePosts(posts.filter(p => p.id !== id));
  return true;
}

// Seed 3 sample posts if empty
function seedPostsIfEmpty() {
  if (_loadPosts().length === 0) {
    createPost({ title: "Welcome to MtaaConnect!", content: "Share news, referrals and questions with your neighbours.", neighborhood: "Ruiru", authorId: "admin", authorName: "MtaaConnect Team" });
    createPost({ title: "Reliable plumber in Ruiru?", content: "Anyone know a good plumber near Bypass? Please share contacts.", neighborhood: "Ruiru", authorId: "user1", authorName: "Kevin" });
    createPost({ title: "Lost dog found", content: "Found a brown dog near the market. DM me if it's yours.", neighborhood: "Juja", authorId: "user2", authorName: "Mary" });
  }
}

window.PostsAPI = { getPosts, getPostById, createPost, updatePost, deletePost, seedPostsIfEmpty };
