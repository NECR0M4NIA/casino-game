const slotItems = ["🍒", "🍋", "🍊", "🍇", "🍉", "⭐", "Didier"];
let money = 100; // Montant initial d'argent
const spinCost = 10; // Coût pour chaque tour
const winAmount = 500; // Montant gagné si on obtient 3 symboles identiques

// Récupère les éléments HTML
const message = document.getElementById("message");
const spinButton = document.getElementById("spin-button");
const moneyDisplay = document.getElementById("money");

// Met à jour l'affichage de l'argent
function updateMoneyDisplay() {
    moneyDisplay.innerText = money + "€";
}

// Fonction pour lancer les slots
function spinSlots() {
    // Vérifie si le joueur a assez d'argent
    if (money < spinCost) {
        message.innerText = "T'as plus d'argent sale pauvre.";
        return;
    }

    // Déduit le coût du tour
    money -= spinCost;
    updateMoneyDisplay();
    message.innerText = "Bonne chance!";

    const slot1 = document.getElementById("slot1");
    const slot2 = document.getElementById("slot2");
    const slot3 = document.getElementById("slot3");

    // Désactive le bouton pendant le tour
    spinButton.disabled = true;

    // Animation de rotation
    let interval = setInterval(() => {
        slot1.innerText = slotItems[Math.floor(Math.random() * slotItems.length)];
        slot2.innerText = slotItems[Math.floor(Math.random() * slotItems.length)];
        slot3.innerText = slotItems[Math.floor(Math.random() * slotItems.length)];
    }, 100);

    // Arrête l'animation après un délai
    setTimeout(() => {
        clearInterval(interval);

        // Choisit les symboles finaux
        const result1 = slotItems[Math.floor(Math.random() * slotItems.length)];
        const result2 = slotItems[Math.floor(Math.random() * slotItems.length)];
        const result3 = slotItems[Math.floor(Math.random() * slotItems.length)];

        slot1.innerText = result1;
        slot2.innerText = result2;
        slot3.innerText = result3;

        // Vérifie si le joueur a gagné
        if (result1 === result2 && result2 === result3) {
            money += winAmount;
            message.innerText = "T'as gagné espèce d'abruti va 🎉 +" + winAmount + "€";
        } else {
            message.innerText = "Réessaye espèce de fils de...";
        }

        updateMoneyDisplay();
        spinButton.disabled = false;
    }, 2000);
}

// Initialise le jeu
updateMoneyDisplay();
spinButton.addEventListener("click", spinSlots);
