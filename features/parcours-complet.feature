# language: fr
Fonctionnalité: Parcours complet d'achat
  En tant qu'utilisateur
  Je veux faire un parcours complet
  De la navigation jusqu'à l'ajout au panier

  Scénario: Chercher puis ajouter au panier
    Étant donné que je suis sur la page d'accueil de Label'Vie
    Quand je recherche "avocat"
    Et des résultats de recherche doivent être affichés
    Et j'ajoute le premier produit au panier
    Et je vais sur la page du panier
    Alors le panier ne doit pas être vide

  Scénario: Découvrir le bio et acheter
    Étant donné que je suis sur la page d'accueil de Label'Vie
    Quand je clique sur la catégorie "Boutique bio"
    Et je dois voir une liste de produits
    Et j'ajoute le premier produit au panier
    Alors le compteur du panier doit indiquer au moins 1 article
