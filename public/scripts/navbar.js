
/* la barra de navegacion tiene que mostrar */
  /* si no hay usuario activo: home/login/register */
  /* si hay usuario activo: home/cart/profile/signout */

  console.log("navbar");

const renderNavbar = async () => {
  try {
    const res = await fetch("/api/auth/online"); // asumimos que devuelve el usuario logueado
    const result = await res.json();
    const opts = document.querySelector("#opts");
    opts.innerHTML = "";

    if (res.status === 200 && result.email) {
      // Usuario logueado
      opts.innerHTML += `
        <li class="nav-item"><a class="nav-link text-white" href="/">Home</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="/cart">Cart</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="/profile">Profile</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="#" id="signout">Sign Out</a></li>
      `;

      document.querySelector("#signout").addEventListener("click", async (e) => {
        e.preventDefault();
        await fetch("/api/auth/signout");
        location.replace("/login");
      });

    } else {
      // Usuario no logueado
      opts.innerHTML += `
        <li class="nav-item"><a class="nav-link text-white" href="/">Home</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="/login">Login</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="/register">Register</a></li>
      `;
    }

  } catch (error) {
    console.error("Error cargando navbar:", error);
  }
};

renderNavbar();
