const postsUrl = "https://jsonplaceholder.typicode.com/posts";

const loadButton = document.querySelector("#load-posts");
const statusMessage = document.querySelector("#posts-status");
const postList = document.querySelector("#posts-list");

function isValidPost(post) {
  return (
    post !== null &&
    typeof post === "object" &&
    Number.isInteger(post.id) &&
    Number.isInteger(post.userId) &&
    typeof post.title === "string" &&
    typeof post.body === "string"
  );
}

function renderPosts(posts) {
  const fragment = document.createDocumentFragment();

  for (const post of posts) {
    const item = document.createElement("li");
    const title = document.createElement("h3");
    const details = document.createElement("p");
    const body = document.createElement("p");

    title.textContent = post.title;
    details.textContent = `Post ID ${post.id} · User ID ${post.userId}`;
    body.textContent = post.body;

    item.append(title, details, body);
    fragment.append(item);
  }

  postList.replaceChildren(fragment);
}

async function loadPosts() {
  if (loadButton.disabled) {
    return;
  }

  loadButton.disabled = true;
  statusMessage.textContent = "Loading posts…";

  try {
    const response = await fetch(postsUrl, {
      method: "GET",
      cache: "no-store",
    });

    if (response.status === 404) {
      throw new Error("The posts endpoint was not found (HTTP 404).");
    }

    if (!response.ok) {
      throw new Error(`The server returned HTTP ${response.status}.`);
    }

    const posts = await response.json();

    if (!Array.isArray(posts) || !posts.every(isValidPost)) {
      throw new Error("The server returned posts in an unexpected format.");
    }

    renderPosts(posts);

    statusMessage.textContent = posts.length === 0
      ? "No posts were returned."
      : `Loaded ${posts.length} posts (HTTP ${response.status}).`;
  } catch (error) {
    const reason = error instanceof TypeError
      ? "Could not reach the posts server. Check your connection."
      : error.message;

    const listStatus = postList.children.length > 0
      ? "Showing posts from the last successful load."
      : "No posts are currently displayed.";

    statusMessage.textContent = `${reason} ${listStatus} You can try again.`;
  } finally {
    loadButton.disabled = false;
  }
}

loadButton.addEventListener("click", loadPosts);