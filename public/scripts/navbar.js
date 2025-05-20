const renderNavbar = async () => {
  try {
    const res = await fetch("/api/auth/online", {
      credentials: "include",
    });
    const result = await res.json();
    console.log("Respuesta de /online:", result);

    const opts = document.querySelector("#opts");
    opts.innerHTML = "";

    if (res.ok && result?.response?.email) {
      opts.innerHTML += `
        <li class="nav-item"><a class="nav-link text-white" href="/cart">Cart</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="/profile">Profile</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="#" id="signout">Sign Out</a></li>
      `;

      document
        .querySelector("#signout")
        .addEventListener("click", async (e) => {
          e.preventDefault();
          await fetch("/api/auth/signout", {
            method: "POST",
            credentials: "include",
          });
          location.replace("/login");
        });
    } else {
      opts.innerHTML += `
        <li class="nav-item"><a class="nav-link text-white" href="/login">Login</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="/register">Register</a></li>
      `;
    }
  } catch (error) {
    console.error("Error cargando navbar:", error);
    const opts = document.querySelector("#opts");
    opts.innerHTML = `
      <li class="nav-item"><a class="nav-link text-white" href="/login">Login</a></li>
      <li class="nav-item"><a class="nav-link text-white" href="/register">Register</a></li>
    `;
  }
};

renderNavbar();
