document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
  });
  
  function submitPost() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
  
    if (title && content) {
      fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          loadPosts();
          // Clear form fields
          document.getElementById('title').value = '';
          document.getElementById('content').value = '';
        } else {
          alert('Error posting article');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error posting article');
      });
    }
  }
  
  function loadPosts() {
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => {
        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = '';
  
        data.posts.forEach(post => {
          const postDiv = document.createElement('div');
          postDiv.classList.add('post');
  
          const titleHeading = document.createElement('h2');
          titleHeading.textContent = post.title;
  
          const contentParagraph = document.createElement('p');
          contentParagraph.textContent = post.content;
  
          postDiv.appendChild(titleHeading);
          postDiv.appendChild(contentParagraph);
  
          postsContainer.appendChild(postDiv);
        });
      })
      .catch(error => console.error('Error:', error));
  }
  