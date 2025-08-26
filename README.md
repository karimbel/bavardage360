# Bavardage360

**Bavardage360** est une application de chat interactive développée avec Articulate Storyline 360, permettant à jusqu'à 4 utilisateurs de discuter en temps réel dans un salon, avec une file d'attente pour les utilisateurs supplémentaires.

## URL de test
Testez l'application en ligne :  
[https://karimbel.github.io/bavardage360/frontend/story.html](https://karimbel.github.io/bavardage360/frontend/story.html)

## Fonctionnalités
- **Chat en temps réel** : Jusqu'à 4 utilisateurs peuvent échanger des messages simultanément.
- **File d'attente (FIFO)** : Les utilisateurs excédentaires sont placés dans une file d'attente et rejoignent le salon dès qu'une place se libère.
- **Messages de délai** : Des notifications s'affichent pendant 5 secondes lors de la connexion, de l'envoi de messages, et (optionnellement) de la déconnexion.
- **Interface intuitive** : Développée avec Articulate Storyline 360 pour une expérience utilisateur fluide.

## Instructions d'utilisation
1. **Slide 1 (Accueil)** :
   - Entrez un pseudo unique dans le champ prévu.
   - Cliquez sur "Rejoindre" pour entrer dans le salon ou la file d'attente.
   - Une notification "Connexion au serveur, cela peut prendre quelques secondes..." s'affiche pendant 5 secondes.
2. **Slide 2 (Salon)** :
   - Entrez un message dans le champ texte et cliquez sur "Envoyer".
   - Une notification "Envoi du message, veuillez patienter..." s'affiche pendant 5 secondes.
   - Les messages des autres utilisateurs s'affichent en temps réel.
3. **Slide 3 (File d'attente)** :
   - Si le salon est plein (4 utilisateurs), vous êtes redirigé vers la file d'attente.
   - Affichez votre position dans la liste d'attente.
   - Rejoignez automatiquement le salon dès qu'une place se libère.
4. **Slide 4 (Déconnexion)** :
   - Cliquez sur le bouton de déconnexion pour quitter le salon.
   - Une notification "Déconnexion en cours..." peut s'afficher pendant 5 secondes.

## Prérequis
- Un navigateur moderne (Chrome, Firefox, Edge).
- Une connexion Internet stable pour le chat en temps réel.

## Remarques
- Assurez-vous d'utiliser un pseudo unique pour éviter les conflits.
- L'application peut présenter une légère latence lors de la connexion initiale en raison de la nature des services en ligne gratuits.