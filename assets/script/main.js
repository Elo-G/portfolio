
/* ici c'est mon fichier js pour faire les fonction qui vont animer mon front ( c'est un fichier js spécifique au front
  donc il va falloir le linker à mon twig sur main.twig, comme qd on lin le js au  html
  ON A PAS EU BESOIN DE LINKER LES AUTRE FICHER JS du portfolio Au TWIG, car ce sont des fichers js spécifiques au back, 
  donc pas visibles par le clients donc on a pas besoin de les rendre visible en les liant aux fichiers main.twig */

slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  console.log(slides);
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2500); // Change image every 2.5 seconds
}
