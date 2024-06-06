export const fr = {
  navbar: {
    home: 'Accueil',
    courses: 'Cours',
    account: 'Compte',
    logout: 'Déconnexion',
    'logout-success': 'Déconnecté avec succès.',
    login: 'Connexion',
    'language-change': 'Changer de langue',
  },
  footer: {
    home: 'Accueil',
    courses: 'Cours',
    account: 'Compte',
    legal: 'Mentions légales',
    copyright: "Droits d'auteur © {{ currentYear }} - Tous droits réservés",
    'made-with-love': 'Fait avec ❤️ par',
    chorizo: 'Chorizo',
  },
  homepage: {
    title: 'Accueil',
    markdownRenderer: {
      about: {
        title: 'À propos',
      },
    },
    latestCourses: {
      title: 'Derniers Cours',
      'error-message': 'Aucun cours disponible',
    },
  },
  courses: {
    title: 'Cours',
    'no-courses-title': 'Rien trouvé',
    'no-courses-message':
      'Aucun cours disponible, veuillez réessayer plus tard.',
    'error-title': 'Erreur survenue',
    'error-message': 'Erreur lors du chargement des cours',
    filter: {
      search: 'Rechercher',
      sort: {
        latest: 'Les plus récents',
        oldest: 'Les plus anciens',
      },
    },
  },
  feedbackMessage: {
    'default-title': 'Oups!',
    'default-message': "Quelque chose s'est mal passé.",
  },
  accountProfileBanner: {
    'change-avatar': "Changer d'avatar",
    'load-avatar-error': "Erreur lors du chargement de l'avatar",
  },
  account: {
    account: 'Compte',
    name: 'Nom',
    'name-placeholder': 'Veuillez entrer votre nom',
    email: 'Email',
    'email-placeholder': 'Veuillez entrer votre email',
    bio: 'Biographie',
    'bio-placeholder': 'Veuillez entrer votre biographie',
    update: 'Mettre à jour',
    'last-updated': 'Dernière mise à jour',
    'load-user-data-error': 'Erreur lors du chargement des données utilisateur',
    'update-avatar-success': 'Avatar mis à jour avec succès',
    'update-avatar-error': "Erreur lors de la mise à jour de l'avatar",
    'update-profile-success': 'Votre profil a été mis à jour avec succès.',
    'update-profile-error':
      'Une erreur est survenue lors de la mise à jour de votre profil.',
    'parse-errors': {
      required: 'Ce champ est requis',
      'invalid-username': "Nom d'utilisateur invalide",
      'invalid-email': 'Email invalide',
      'bio-length': 'La biographie doit comporter entre 3 et 800 caractères',
      'min-length': 'La longueur minimale est de {{min}} caractères',
      'max-length': 'La longueur maximale est de {{max}} caractères',
    },
  },
  login: {
    title: 'Connexion',
    'credentials-description':
      'Entrez vos identifiants pour accéder à votre compte.',
    'email-label': 'Email',
    'email-placeholder': 'Email',
    'password-label': 'Mot de passe',
    'password-placeholder': 'Mot de passe',
    'credentials-submit': 'Connexion',
    'no-account-message': "Vous n'avez pas de compte?",
    'register-link': 'Inscription',
    'parse-errors': {
      required: 'Ce champ est requis',
      'invalid-email': "Format de l'email invalide, veuillez essayer un autre.",
      'min-length': 'La longueur minimale doit être de {{min}} caractères',
      'max-length': 'La longueur maximale doit être de {{max}} caractères',
    },
  },
  register: {
    title: 'Inscription',
    'credentials-description': 'Inscrivez-vous pour créer un compte.',
    'username-label': "Nom d'utilisateur",
    'username-placeholder': "Nom d'utilisateur",
    'email-label': 'Email',
    'email-placeholder': 'Email',
    'password-label': 'Mot de passe',
    'password-placeholder': 'Mot de passe',
    'confirm-password-label': 'Confirmer le mot de passe',
    'confirm-password-placeholder': 'Confirmer le mot de passe',
    'credentials-submit': 'Inscription',
    'existing-account-message': 'Vous avez déjà un compte?',
    'login-link': 'Connexion',
    'register-success': 'Inscription réussie.',
    'parse-errors': {
      required: 'Ce champ est requis',
      'invalid-email': "Format de l'email invalide",
      'username-taken':
        "Nom d'utilisateur déjà pris, veuillez en essayer un autre.",
      'min-length': 'La longueur minimale doit être de {{min}} caractères',
      'max-length': 'La longueur maximale doit être de {{max}} caractères',
      'password-mismatch': 'Les mots de passe ne correspondent pas',
    },
  },
  course: {
    navbar: {
      introduction: 'Introduction',
      agenda: 'Agenda',
      tasks: 'Tâches',
      documentation: 'Documentation',
      resources: 'Ressources',
    },
    tasks: {
      title: 'Tâches',
      'mark-as-done': 'Marquer comme fait',
      'reverse-status': 'Inverser le statut',
      'mark-as-done-success': 'Tâche marquée comme faite',
      'reverse-status-success': 'Statut inversé avec succès',
      'mark-as-done-error': 'Erreur lors du marquage de la tâche comme faite',
      'reverse-status-error': "Erreur lors de l'inversion du statut",
      workPhase: {
        individual: 'Individuel',
        pair: 'Paire',
        group: 'Groupe',
        plenum: 'Plénum',
      },
    },
    documentation: {
      title: 'Documentation',
      navbar: {
        close: 'Fermer',
      },
      next: 'Suivant',
      previous: 'Précédent',
    },
    resources: {
      title: 'Ressources',
      'last-modified': 'Dernière modification',
      name: 'Nom',
    },
  },
  authService: {
    'login-success': 'Connecté avec succès.',
    'register-success': 'Inscription réussie.',
    'unexpected-error':
      "Une erreur inattendue s'est produite, veuillez réessayer.",
    'email-already-in-use':
      'Cet email est déjà utilisé, veuillez en essayer un autre.',
    'weak-password':
      'Le mot de passe est trop faible, veuillez en essayer un plus fort.',
    'user-disabled':
      "Cet utilisateur a été désactivé. Veuillez contacter le support pour plus d'informations.",
    'incorrect-email-password':
      'Email ou mot de passe incorrect, veuillez réessayer.',
    'too-many-requests': 'Trop de demandes. Veuillez réessayer plus tard.',
    'invalid-credential': 'Identifiants invalides. Veuillez réessayer.',
  },
  courseStateService: {
    'course-not-found': 'Cours avec cet ID introuvable.',
  },
  fileDownloadService: {
    'error-download-file': 'Erreur lors du téléchargement du fichier',
  },
  languageService: {
    'language-change-success': 'Langue changée avec succès',
    'language-change-error': 'Erreur lors du changement de langue',
  },
  authGuard: {
    'must-be-verified-user':
      'Vous devez être un utilisateur vérifié pour accéder à cette page.',
    'must-be-logged-in': 'Vous devez être connecté pour accéder à cette page.',
  },
  loginGuard: {
    'not-verified': 'Pas encore vérifié.',
  },
  relativeTimePipe: {
    'just-now': 'Juste maintenant',
    'minute-ago': 'Il y a 1 minute',
    'minutes-ago': 'Il y a {{ minutes }} minutes',
    'hour-ago': 'Il y a 1 heure',
    'hours-ago': 'Il y a {{ hours }} heures',
    'day-ago': 'Il y a 1 jour',
    'days-ago': 'Il y a {{ days }} jours',
    'month-ago': 'Il y a 1 mois',
    'months-ago': 'Il y a {{ months }} mois',
    'year-ago': 'Il y a 1 an',
    'years-ago': 'Il y a {{ years }} ans',
    months: {
      January: 'Janvier',
      February: 'Février',
      March: 'Mars',
      April: 'Avril',
      May: 'Mai',
      June: 'Juin',
      July: 'Juillet',
      August: 'Août',
      September: 'Septembre',
      October: 'Octobre',
      November: 'Novembre',
      December: 'Décembre',
    },
  },
};
