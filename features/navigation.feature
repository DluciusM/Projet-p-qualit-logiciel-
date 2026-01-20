# language: fr
Fonctionnalité: Navigation sur Label'Vie
  En tant qu'utilisateur
  Je veux naviguer facilement sur le site
  Pour découvrir les produits

  Scénario: Aller sur la page d'accueil
    Étant donné que je suis sur la page d'accueil de Label'Vie
    Alors la page d'accueil doit être affichée correctement

  Scénario: Aller dans une catégorie
    Étant donné que je suis sur la page d'accueil de Label'Vie
    Quand je clique sur la catégorie "Primeur"
    Alors je dois voir une liste de produits

  Scénario: Voir les produits bio
    Étant donné que je suis sur la page d'accueil de Label'Vie
    Quand je clique sur la catégorie "Boutique bio"
    Alors je dois voir une liste de produits
