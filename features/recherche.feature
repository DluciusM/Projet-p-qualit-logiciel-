# language: fr
Fonctionnalité: Recherche de produits
  En tant qu'utilisateur
  Je veux chercher des produits
  Pour trouver rapidement ce que je veux

  Scénario: Chercher un produit
    Étant donné que je suis sur la page d'accueil de Label'Vie
    Quand je recherche "pomme"
    Alors des résultats de recherche doivent être affichés

  Scénario: Chercher avec un mot précis
    Étant donné que je suis sur la page d'accueil de Label'Vie
    Quand je recherche "banane"
    Alors des résultats de recherche doivent être affichés
    Et l'URL doit contenir le terme recherché

  Scénario: Chercher des produits bio
    Étant donné que je suis sur la page d'accueil de Label'Vie
    Quand je recherche "bio"
    Alors des résultats de recherche doivent être affichés
