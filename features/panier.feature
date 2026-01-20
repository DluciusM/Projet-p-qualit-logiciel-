# language: fr
Fonctionnalité: Le panier d'achat
  En tant qu'utilisateur
  Je veux gérer mon panier
  Pour préparer ma commande

  Scénario: Ajouter un truc au panier
    Étant donné que je suis sur la page d'accueil de Label'Vie
    Quand je navigue vers la catégorie "Primeur"
    Et j'ajoute le premier produit au panier
    Et je vais sur la page du panier
    Alors le panier ne doit pas être vide

  Scénario: Vérifier le panier vide
    Étant donné que je suis sur la page d'accueil de Label'Vie
    Quand je vais sur la page du panier
    Alors le panier doit être vide

  Scénario: Ajouter plusieurs trucs
    Étant donné que je suis sur la page d'accueil de Label'Vie
    Quand je navigue vers la catégorie "Supermarché"
    Et j'ajoute le premier produit au panier
    Alors le compteur du panier doit indiquer au moins 1 article
