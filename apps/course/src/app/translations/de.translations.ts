export const de = {
  navbar: {
    home: 'Startseite',
    courses: 'Kurse',
    account: 'Konto',
    logout: 'Abmelden',
    'logout-success': 'Erfolgreich abgemeldet.',
    login: 'Anmelden',
    'language-change': 'Sprache ändern',
  },
  footer: {
    home: 'Startseite',
    courses: 'Kurse',
    account: 'Konto',
    legal: 'Rechtliches',
    copyright: 'Urheberrecht © {{ currentYear }} - Alle Rechte vorbehalten',
    'made-with-love': 'Hergestellt mit ❤️ von',
    chorizo: 'Chorizo',
  },
  homepage: {
    title: 'Startseite',
    markdownRenderer: {
      about: {
        title: 'Über',
      },
    },
    latestCourses: {
      title: 'Neueste Kurse',
      'error-message': 'Keine Kurse verfügbar',
    },
  },
  courses: {
    title: 'Kurse',
    'no-courses-title': 'Nichts gefunden',
    'no-courses-message':
      'Keine Kurse verfügbar, bitte versuche es später erneut.',
    'error-title': 'Fehler aufgetreten',
    'error-message': 'Fehler beim Laden der Kurse',
    filter: {
      search: 'Suche',
      sort: {
        latest: 'Neueste',
        oldest: 'Älteste',
      },
    },
  },
  feedbackMessage: {
    'default-title': 'Oops!',
    'default-message': 'Etwas ist schief gelaufen.',
  },
  accountProfileBanner: {
    'change-avatar': 'Avatar ändern',
    'load-avatar-error': 'Fehler beim Laden des Avatars',
  },
  account: {
    account: 'Konto',
    name: 'Name',
    'name-placeholder': 'Bitte geben Sie Ihren Namen ein',
    email: 'E-Mail',
    'email-placeholder': 'Bitte geben Sie Ihre E-Mail-Adresse ein',
    bio: 'Biografie',
    'bio-placeholder': 'Bitte geben Sie Ihre Biografie ein',
    update: 'Aktualisieren',
    'last-updated': 'Zuletzt aktualisiert',
    'load-user-data-error': 'Fehler beim Laden der Benutzerdaten',
    'update-avatar-success': 'Avatar erfolgreich aktualisiert',
    'update-avatar-error': 'Fehler beim Aktualisieren des Avatars',
    'update-profile-success': 'Ihr Profil wurde erfolgreich aktualisiert.',
    'update-profile-error':
      'Beim Aktualisieren Ihres Profils ist ein Fehler aufgetreten.',
    'parse-errors': {
      required: 'Dieses Feld ist erforderlich',
      'invalid-username': 'Ungültiger Benutzername',
      'invalid-email': 'Ungültige E-Mail-Adresse',
      'bio-length': 'Die Biografie muss zwischen 3 und 800 Zeichen lang sein',
      'min-length': 'Die Mindestlänge beträgt {{min}} Zeichen',
      'max-length': 'Die Maximallänge beträgt {{max}} Zeichen',
    },
  },
  login: {
    title: 'Anmelden',
    'credentials-description':
      'Geben Sie Ihre Anmeldeinformationen ein, um auf Ihr Konto zuzugreifen.',
    'email-label': 'E-Mail',
    'email-placeholder': 'E-Mail',
    'password-label': 'Passwort',
    'password-placeholder': 'Passwort',
    'credentials-submit': 'Anmelden',
    'no-account-message': 'Sie haben kein Konto?',
    'register-link': 'Registrieren',
    'parse-errors': {
      required: 'Dieses Feld ist erforderlich',
      'invalid-email':
        'Ungültiges E-Mail-Format, bitte versuchen Sie es erneut.',
      'min-length': 'Die Mindestlänge sollte {{min}} Zeichen betragen',
      'max-length': 'Die Maximallänge sollte {{max}} Zeichen betragen',
    },
  },
  register: {
    title: 'Registrieren',
    'credentials-description':
      'Registrieren Sie sich, um ein Konto zu erstellen.',
    'username-label': 'Benutzername',
    'username-placeholder': 'Benutzername',
    'email-label': 'E-Mail',
    'email-placeholder': 'E-Mail',
    'password-label': 'Passwort',
    'password-placeholder': 'Passwort',
    'confirm-password-label': 'Passwort bestätigen',
    'confirm-password-placeholder': 'Passwort bestätigen',
    'credentials-submit': 'Registrieren',
    'existing-account-message': 'Sie haben bereits ein Konto?',
    'login-link': 'Anmelden',
    'register-success': 'Erfolgreich registriert',
    'parse-errors': {
      required: 'Dieses Feld ist erforderlich',
      'invalid-email': 'Ungültiges E-Mail-Format',
      'username-taken':
        'Benutzername ist bereits vergeben, bitte versuchen Sie es mit einem anderen',
      'min-length': 'Die Mindestlänge sollte {{min}} Zeichen betragen',
      'max-length': 'Die Maximallänge sollte {{max}} Zeichen betragen',
      'password-mismatch': 'Passwörter stimmen nicht überein',
    },
  },
  course: {
    navbar: {
      introduction: 'Einführung',
      agenda: 'Agenda',
      tasks: 'Aufgaben',
      documentation: 'Dokumentation',
      resources: 'Ressourcen',
    },
    tasks: {
      title: 'Aufgaben',
      'mark-as-done': 'Als erledigt markieren',
      'reverse-status': 'Erledigung umkehren',
      'mark-as-done-success': 'Aufgabe als erledigt markiert',
      'reverse-status-success': 'Status erfolgreich umgekehrt',
      'mark-as-done-error': 'Fehler beim Markieren der Aufgabe als erledigt',
      'reverse-status-error': 'Fehler beim Umkehren des Status',
      workPhase: {
        individual: 'Individuell',
        pair: 'Paar',
        group: 'Gruppe',
        plenum: 'Plenum',
      },
    },
    documentation: {
      title: 'Dokumentation',
      navbar: {
        close: 'Schliessen',
      },
      next: 'Weiter',
      previous: 'Zurück',
    },
    resources: {
      title: 'Ressourcen',
      'last-modified': 'Zuletzt geändert',
      name: 'Name',
    },
  },
  authService: {
    'login-success': 'Erfolgreich eingeloggt.',
    'register-success': 'Erfolgreich registriert.',
    'unexpected-error':
      'Ein unerwarteter Fehler ist aufgetreten, bitte versuche es erneut.',
    'email-already-in-use':
      'Diese E-Mail wird bereits verwendet, bitte versuche es mit einer anderen.',
    'weak-password':
      'Das Passwort ist zu schwach, bitte versuche ein stärkeres Passwort.',
    'user-disabled':
      'Dieser Benutzer wurde deaktiviert. Bitte kontaktiere den Support für weitere Informationen.',
    'incorrect-email-password':
      'Falsche E-Mail oder Passwort, bitte versuche es erneut.',
    'too-many-requests': 'Zu viele Anfragen. Bitte versuche es später erneut.',
    'invalid-credential':
      'Ungültige Anmeldeinformationen. Bitte versuche es erneut.',
  },
  courseStateService: {
    'course-not-found': 'Kurs mit dieser ID wurde nicht gefunden.',
  },
  fileDownloadService: {
    'error-download-file': 'Fehler beim Herunterladen der Datei',
  },
  languageService: {
    'language-change-success': 'Sprache erfolgreich geändert',
    'language-change-error': 'Fehler beim Ändern der Sprache',
  },
  authGuard: {
    'must-be-verified-user':
      'Sie müssen ein verifizierter Benutzer sein, um auf diese Seite zuzugreifen.',
    'must-be-logged-in':
      'Sie müssen eingeloggt sein, um auf diese Seite zuzugreifen.',
  },
  loginGuard: {
    'not-verified': 'Noch nicht verifiziert.',
  },
  relativeTimePipe: {
    'just-now': 'Gerade eben',
    'minute-ago': 'Vor 1 Minute',
    'minutes-ago': 'Vor {{ minutes }} Minuten',
    'hour-ago': 'Vor 1 Stunde',
    'hours-ago': 'Vor {{ hours }} Stunden',
    'day-ago': 'Vor 1 Tag',
    'days-ago': 'Vor {{ days }} Tagen',
    'month-ago': 'Vor 1 Monat',
    'months-ago': 'Vor {{ months }} Monaten',
    'year-ago': 'Vor 1 Jahr',
    'years-ago': 'Vor {{ years }} Jahren',
    months: {
      January: 'Januar',
      February: 'Februar',
      March: 'März',
      April: 'April',
      May: 'Mai',
      June: 'Juni',
      July: 'Juli',
      August: 'August',
      September: 'September',
      October: 'Oktober',
      November: 'November',
      December: 'Dezember',
    },
  },
};
