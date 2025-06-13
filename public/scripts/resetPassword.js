document.getElementById("sendResetEmail").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const res = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  alert(data.message || "Check your email for reset link.");
});
