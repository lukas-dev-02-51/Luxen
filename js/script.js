console.log("LUXEN VERSION MOBILE TEST");

document.querySelectorAll(".project-card-link").forEach((card) => {
    card.addEventListener("click", (event) => {
        // Si le clic vient dèjà d'un lien, on le laisse fonctionner normalement.
        if (event.target.closest("a")) {
            return;
        }

        const link = card.querySelector(".project-link");
        console.log("Lien trouvé :", link);
        console.log("Destination :", link ? link.href : "Aucun lien trouvé");

        if (link) {
            window.location.href = link.href;
        }
    });
});

const revealElements = document.querySelectorAll(".reveal");
console.log("Éléments à révéler :", revealElements.length);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // La carte entre dans l'écran
            entry.target.classList.add("visible");
            console.log("Élément révélé :", entry.target);
        } else {
            // La carte sort de l'écran
            entry.target.classList.remove("visible");
            console.log("Élément masqué :", entry.target);
        }
    });
}, {
    threshold: 0
});

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

document.addEventListener("DOMContentLoaded", () => {
    const recherche = document.querySelector("#recherche-couleur");
    const cartes = document.querySelectorAll(".carte-couleur");
    const familles = document.querySelectorAll(".famille-couleurs");

    console.log("Champ de recherche :", recherche);
    console.log("Nombre de cartes :", cartes.length);
    console.log("Nombre de familles :", familles.length);

    //Rechercher une couleur par son nom ou son code
    if (recherche){
        recherche.addEventListener("input", () => {
            const terme = recherche.value.trim().toLowerCase();

            cartes.forEach((carte) => {
                const nom = carte.querySelector("h3").textContent.toLowerCase();
                const code = carte.querySelector("p").textContent.toLowerCase();

                const correspond = nom.includes(terme) || code.includes(terme);

                carte.hidden = !correspond;
            });

            // Masquer les familles qui n'ont aucun résultat
            familles.forEach((famille) => {
                const cartesVisibles = famille.querySelectorAll(".carte-couleur:not([hidden])");

                famille.hidden = cartesVisibles.length === 0;
            });
        });
    }

   // Copier le code hexadécimal
cartes.forEach((carte) => {
    const bouton = carte.querySelector("button");
    const paragraphe = carte.querySelector("p");

    if (!bouton || !paragraphe) return;

    bouton.addEventListener("click", async () => {
        const code = paragraphe.textContent.trim();

        // Récupérer la langue actuelle
        const langue = localStorage.getItem("luxen-language") || "fr";

        // Définir les textes selon la langue
        const texteCopie = langue === "fr" ? "Code copié !" : "Code copied!";
        const texteErreur = langue === "fr" ? "Copie impossible" : "Copy failed";
        const texteInitial = langue === "fr" ? "Copier le code" : "Copy code";

        try {
            await navigator.clipboard.writeText(code);

            bouton.textContent = texteCopie;

            setTimeout(() => {
                bouton.textContent = texteInitial;
            }, 1500);

        } catch (erreur) {
            bouton.textContent = texteErreur;

            setTimeout(() => {
                bouton.textContent = texteInitial;
            }, 2000);
        }
    });
});
});

document.addEventListener("DOMContentLoaded", () => {
    const languageButton = document.querySelector("#language-toggle");

    if (!languageButton) return;

    let currentLanguage = localStorage.getItem("luxen-language") || "fr";

    function updateLanguage() {
        document.documentElement.lang = currentLanguage;

        document.querySelectorAll("[data-fr][data-en]").forEach((element) => {
            const translation = element.dataset[currentLanguage];

            if (translation !== undefined) {
                const textNode = Array.from(element.childNodes).find(
                    (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ""
                );

                if (textNode) {
                    textNode.textContent = translation;
                } else {
                    element.prepend(document.createTextNode(translation));
                }
            }
        });

        languageButton.textContent = currentLanguage === "fr" ? "EN" : "FR";

        languageButton.setAttribute("aria-label", currentLanguage === "fr" ? "Switch to English" : "Passer en français");
    }

    languageButton.addEventListener("click", () => {
        console.log("Clic sur le bouton de traduction détecté");
        currentLanguage = currentLanguage === "fr" ? "en" : "fr";
        localStorage.setItem("luxen-language", currentLanguage);
        updateLanguage();
    });

    updateLanguage();
});
