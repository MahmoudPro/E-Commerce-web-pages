export async function getComments(productId) {
  const res = await fetch("data/comments.json");
  const comments = await res.json();
  return comments[productId] || [];
}

export async function saveComment(productId, comment) {
  try {
    const response = await fetch("../../../data/comments.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, comment }),
    });
    return response.ok;
  } catch (error) {
    console.error("Error saving comment:", error);
    return false;
  }
}
