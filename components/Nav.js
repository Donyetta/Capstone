export default links => `
<nav>
<i class"fas fa-bars"></i>
<div class="navbar">
  <a class="active" href="#">Home</a>
  <a href="#visitors">Visitors</a>
  <a href="#contractors">Contractors</a>
  <a href="#events">Events</a>
</div>
  <ul class ="hidden-mobile nav-links">
  ${links
    .map(
      link => `<li><a href="/${link.title}" data-navigo>${link.text}</a></li>`
    )
    .join("")}
  </ul>
</nav>`;
