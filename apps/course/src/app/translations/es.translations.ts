export const es = {
  navbar: {
    home: 'Inicio',
    courses: 'Cursos',
    account: 'Cuenta',
    logout: 'Cerrar sesión',
    'logout-success': 'Sesión cerrada con éxito.',
    login: 'Iniciar sesión',
    'language-change': 'Cambiar idioma',
  },
  footer: {
    home: 'Inicio',
    courses: 'Cursos',
    account: 'Cuenta',
    legal: 'Legal',
    copyright:
      'Derechos de autor © {{ currentYear }} - Todos los derechos reservados',
    'made-with-love': 'Hecho con ❤️ por',
    chorizo: 'Chorizo',
  },
  homepage: {
    title: 'Inicio',
    markdownRenderer: {
      about: {
        title: 'Acerca de',
      },
    },
    latestCourses: {
      title: 'Últimos Cursos',
      'error-message': 'No hay cursos disponibles',
    },
  },
  courses: {
    title: 'Cursos',
    'no-courses-title': 'No se encontró nada',
    'no-courses-message':
      'No hay cursos disponibles, por favor intenta más tarde.',
    'error-title': 'Ocurrió un error',
    'error-message': 'Error al cargar los cursos',
    filter: {
      search: 'Buscar',
      sort: {
        latest: 'Más recientes',
        oldest: 'Más antiguos',
      },
    },
  },
  feedbackMessage: {
    'default-title': '¡Ups!',
    'default-message': 'Algo salió mal.',
  },
  accountProfileBanner: {
    'change-avatar': 'Cambiar avatar',
    'load-avatar-error': 'Error al cargar el avatar',
  },
  account: {
    account: 'Cuenta',
    name: 'Nombre',
    'name-placeholder': 'Por favor ingresa tu nombre',
    email: 'Correo electrónico',
    'email-placeholder': 'Por favor ingresa tu correo electrónico',
    bio: 'Biografía',
    'bio-placeholder': 'Por favor ingresa tu biografía',
    update: 'Actualizar',
    'last-updated': 'Última actualización',
    'load-user-data-error': 'Error al cargar los datos del usuario',
    'update-avatar-success': 'Avatar actualizado con éxito',
    'update-avatar-error': 'Error al actualizar el avatar',
    'update-profile-success': 'Tu perfil se ha actualizado con éxito.',
    'update-profile-error': 'Ocurrió un error al actualizar tu perfil.',
    'parse-errors': {
      required: 'Este campo es obligatorio',
      'invalid-username': 'Nombre de usuario no válido',
      'invalid-email': 'Correo electrónico no válido',
      'bio-length': 'La biografía debe tener entre 3 y 800 caracteres',
      'min-length': 'La longitud mínima es de {{min}} caracteres',
      'max-length': 'La longitud máxima es de {{max}} caracteres',
    },
  },
  login: {
    title: 'Iniciar sesión',
    'credentials-description':
      'Ingresa tus credenciales para acceder a tu cuenta.',
    'email-label': 'Correo electrónico',
    'email-placeholder': 'Correo electrónico',
    'password-label': 'Contraseña',
    'password-placeholder': 'Contraseña',
    'credentials-submit': 'Iniciar sesión',
    'no-account-message': '¿No tienes una cuenta?',
    'register-link': 'Registrarse',
    'parse-errors': {
      required: 'Este campo es obligatorio',
      'invalid-email':
        'Formato de correo electrónico no válido, por favor intenta con otro.',
      'min-length': 'La longitud mínima debe ser de {{min}} caracteres',
      'max-length': 'La longitud máxima debe ser de {{max}} caracteres',
    },
  },
  register: {
    title: 'Registrarse',
    'credentials-description': 'Regístrate para crear una cuenta.',
    'username-label': 'Nombre de usuario',
    'username-placeholder': 'Nombre de usuario',
    'email-label': 'Correo electrónico',
    'email-placeholder': 'Correo electrónico',
    'password-label': 'Contraseña',
    'password-placeholder': 'Contraseña',
    'confirm-password-label': 'Confirmar contraseña',
    'confirm-password-placeholder': 'Confirmar contraseña',
    'credentials-submit': 'Registrarse',
    'existing-account-message': '¿Ya tienes una cuenta?',
    'login-link': 'Iniciar sesión',
    'register-success': 'Registrado con éxito.',
    'parse-errors': {
      required: 'Este campo es obligatorio',
      'invalid-email': 'Formato de correo electrónico no válido',
      'username-taken':
        'El nombre de usuario ya está en uso, por favor intenta con otro.',
      'min-length': 'La longitud mínima debe ser de {{min}} caracteres',
      'max-length': 'La longitud máxima debe ser de {{max}} caracteres',
      'password-mismatch': 'Las contraseñas no coinciden',
    },
  },
  course: {
    navbar: {
      introduction: 'Introducción',
      agenda: 'Agenda',
      tasks: 'Tareas',
      documentation: 'Documentación',
      resources: 'Recursos',
    },
    tasks: {
      title: 'Tareas',
      'mark-as-done': 'Marcar como hecho',
      'reverse-status': 'Revertir estado',
      'mark-as-done-success': 'Tarea marcada como hecha',
      'reverse-status-success': 'Estado revertido con éxito',
      'mark-as-done-error': 'Error al marcar la tarea como hecha',
      'reverse-status-error': 'Error al revertir el estado',
      workPhase: {
        individual: 'Individual',
        pair: 'Pareja',
        group: 'Grupo',
        plenum: 'Pleno',
      },
    },
    documentation: {
      title: 'Documentación',
      navbar: {
        close: 'Cerrar',
      },
      next: 'Siguiente',
      previous: 'Anterior',
    },
    resources: {
      title: 'Recursos',
      'last-modified': 'Última modificación',
      name: 'Nombre',
    },
  },
  authService: {
    'login-success': 'Inicio de sesión exitoso.',
    'register-success': 'Registrado con éxito.',
    'unexpected-error':
      'Ocurrió un error inesperado, por favor intenta nuevamente.',
    'email-already-in-use':
      'Este correo electrónico ya está en uso, por favor intenta con otro.',
    'weak-password':
      'La contraseña es demasiado débil, por favor intenta con una más fuerte.',
    'user-disabled':
      'Este usuario ha sido deshabilitado. Por favor contacta al soporte para más información.',
    'incorrect-email-password':
      'Correo electrónico o contraseña incorrecta, por favor intenta nuevamente.',
    'too-many-requests': 'Demasiadas solicitudes. Por favor intenta más tarde.',
    'invalid-credential':
      'Credenciales no válidas. Por favor intenta nuevamente.',
  },
  courseStateService: {
    'course-not-found': 'Curso con ese ID no encontrado.',
  },
  fileDownloadService: {
    'error-download-file': 'Error al descargar el archivo',
  },
  languageService: {
    'language-change-success': 'Idioma cambiado con éxito',
    'language-change-error': 'Error al cambiar el idioma',
  },
  authGuard: {
    'must-be-verified-user':
      'Debes ser un usuario verificado para acceder a esta página.',
    'must-be-logged-in': 'Debes estar registrado para acceder a esta página.',
  },
  loginGuard: {
    'not-verified': 'Aún no verificado.',
  },
  relativeTimePipe: {
    'just-now': 'Justo ahora',
    'minute-ago': 'Hace 1 minuto',
    'minutes-ago': 'Hace {{ minutes }} minutos',
    'hour-ago': 'Hace 1 hora',
    'hours-ago': 'Hace {{ hours }} horas',
    'day-ago': 'Hace 1 día',
    'days-ago': 'Hace {{ days }} días',
    'month-ago': 'Hace 1 mes',
    'months-ago': 'Hace {{ months }} meses',
    'year-ago': 'Hace 1 año',
    'years-ago': 'Hace {{ years }} años',
    months: {
      January: 'Enero',
      February: 'Febrero',
      March: 'Marzo',
      April: 'Abril',
      May: 'Mayo',
      June: 'Junio',
      July: 'Julio',
      August: 'Agosto',
      September: 'Septiembre',
      October: 'Octubre',
      November: 'Noviembre',
      December: 'Diciembre',
    },
  },
};
