document.getElementById("submitNewPassword").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("newPassword").value;
  const res = await fetch(`/api/auth/reset-password/${email}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const data = await res.json();
  alert(data.message || "Password updated!");
});
